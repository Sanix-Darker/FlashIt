# coding: utf-8
# main.py the api core
# Created by S4n1x-d4rk3r

from bs4 import BeautifulSoup
from flask import Flask, jsonify, request
import requests, sqlite3
from hashlib import md5
from datetime import datetime

conn = sqlite3.connect('./flashit.db')
c = conn.cursor()
c.execute('create table if not exists ping (code string, percent string, price string, search string, _date string)')
conn.commit()
c.close()

app = Flask(__name__)
app.config['Secret'] = "Secret"

def getElts(html):
    #r  = requests.get("http://" +url)
    data = html.text
    soup = BeautifulSoup(data, features="lxml")
    list_results = soup.find_all("a", {"class": "link"})
    return list_results

def only_numbers(string_):
    if string_ == None:
        return "0"
    else:
        return ''.join([i for i in string_ if i.isdigit()])

def MD5(block_string):
    return md5(block_string.encode()).hexdigest()

@app.route('/', methods=['GET']) # To prevent Cors issues
def index1():
    # Sent in GET requests
    # Build the response
    response = jsonify({ 'status':'success', 'message': 'Welcome to Flash API.' })
    # Let's allow all Origin requests
    response.headers.add('Access-Control-Allow-Origin', '*') # To prevent Cors issues
    return response

@app.route('/flash', methods=['GET']) # To prevent Cors issues
def index2():
    # Let's protect the main api from crashing
    try:
        print("[+] Fetching results...")
        # Sent in GET requests
        host = request.args.get('host')
        find = str(request.args.get('find')).replace(" ", "+")

        try: percent = request.args.get('percent')
        except Exception as es: percent = "0"

        try: level = int(request.args.get('level'))
        except Exception as es: level = 5

        try: category = request.args.get('category')
        except Exception as es: category = "0"

        try: price = request.args.get('price')
        except Exception as es: price = "0"

        try: job = request.args.get('job')
        except Exception as es: job = None

        not_contain = request.args.get('not_contain').split(",")

        print("not_contain: ", not_contain)

        code = ""
        results_size = 0
        json_results = []
        percent_classes = ["sale-flag-percent"]
        price_classes = ["price"]
        for i in range(1, level):

            search = host+"/catalog/?q="+find+"&page="+str(i)
            if category != "0": search = category.replace("https://www.jumia.cm", host+"/")+"&page="+str(i)

            print("[+] search: ", search)
            results = getElts(requests.get(search))
            results_size += len(results)
            for result in results:
                children = result.findChildren("span" , recursive=True)
                for child in children:
                    try:
                        print("[+] ---------------------------------- ")
                        print("[+] - Href: "+result["href"])
                        # print("[+] result.text: ", result.text)
                        # print("[+] price: ", price)
                        # print("[+] percent: ", percent)
                        # print("[+] child['class'][0]: ", child['class'][0])
                        # print("[+] percent_classes: ", percent_classes)
                        # print("[+] child['class'][0] in percent_classes: ", (child["class"][0] in percent_classes))
                        # print("[+] float(percent): ", float(percent))
                        # print("[+] child.text: ", child.text)
                        # print("[+] (only_numbers(child.text)): ", (only_numbers(child.text)))
                        # print("[+] float(only_numbers(child.text)): ", float(only_numbers(child.text)))
                        # print("[+] any(ext.lower() in result.text.lower() for ext in not_contain): ", any(ext.lower() in result.text.lower() for ext in not_contain))

                        if (
                            price == "0" and
                            percent != "0" and
                            child["class"][0] in percent_classes and
                            float(percent) <= float(only_numbers(child.text)) and
                            not any(ext.lower() in result.text.lower() for ext in not_contain)):

                            json_results.append({
                                "title": str(result.text),
                                "href": str(result["href"]),
                                "percent": float(only_numbers(child.text)),
                                "price": 0
                            })

                        elif(
                            price != "0" and
                            percent == "0" and
                            child["class"][0] == "price" and
                            "-old" not in child["class"] and
                            not any(ext.lower() in result.text.lower() for ext in not_contain)):

                            product_price = int(child.findChildren("span" , recursive=True)[0]["data-price"])

                            if (
                                child["class"][0] in price_classes and
                                float(price.split("-")[1]) > float(product_price)):

                                json_results.append({
                                    "title": str(result.text),
                                    "href": str(result["href"]),
                                    "percent": 0,
                                    "price": product_price
                                })

                        elif(price == "0" and percent == "0" and not any(ext.lower() in result.text.lower() for ext in not_contain)):

                            json_results.append({
                                "title": str(result.text),
                                "href": str(result["href"]),
                                "percent": 0,
                                "price": int(child.findChildren("span" , recursive=True)[0]["data-price"])
                            })
                    except Exception as es: pass
            i = i + 1

        json_results = sorted(json_results, key=lambda k: k['price'])[::-1]
        if price == "0": json_results = sorted(json_results, key=lambda k: k['percent'])[::-1]

        if (len(json_results) == 0 and job == None):
            code = str(MD5(search))[:10]
            _date = (str(datetime.now())).split('.')[0]
            print("[+] > code:{}, percent:{}, search:{}, date:{}".format(code, percent, search.split("&")[0], _date))
            conn = sqlite3.connect('./flashit.db')
            c = conn.cursor()
            c.execute('INSERT INTO ping VALUES (?,?,?,?,?)', (code, percent, price, search.split("&")[0], _date))
            conn.commit()
            c.close()
        # Build the response
        response = jsonify({'status':'success', 'code':code,  'fetched': str(results_size)+' fetched', 'filtered': str(len(json_results))+' filtered', "results": json_results })
    except Exception as es:
        print("[+] Oups, some error occurs!", str(es))
        response = jsonify({'status':'error', 'message':"Your request cause an unexcepted error on the server"})

    # Let's allow all Origin requests
    response.headers.add('Access-Control-Allow-Origin', '*') # To prevent Cors issues
    return response

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=7777)