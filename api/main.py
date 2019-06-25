# coding: utf-8
# Created by S4n1x-d4rk3r
#
# End point qui recoit la recherche et le pourcentage de reduction.
# Un id est creer pour chaque recherche(n'ayant pas de resultat), on copies et on donnes au bot, il sauvegarde le chat ID et la clee
# Toutes les rand(1, 2) mins il parcours les recherches en question, lorsqu'il obtiens un resultat il notifies directement les concernees via le chat ID 

from bs4 import BeautifulSoup
from flask import Flask, jsonify, request
import requests, sqlite3
from hashlib import md5
from datetime import datetime

conn = sqlite3.connect('./flashit.db')
c = conn.cursor()
c.execute('create table if not exists ping (code string, percent string, search string, _date string)')
conn.commit()
c.close()

app = Flask(__name__)
app.config['Secret'] = "Secret"

def getElts(html):
    #r  = requests.get("http://" +url)

    data = html.text
    soup = BeautifulSoup(data, features="lxml")

    list_results = soup.find_all("a", {"class": "link"})
    # first = inpu.select('input')[0].get('value')
    # for link in soup.find_all('a'):
    #     print(link.get('href'))
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
    print("Fetching results...")
    # Sent in GET requests
    host = request.args.get('host')    
    find = str(request.args.get('find')).replace(" ", "+")
    percent = request.args.get('percent')
    
    try:
        job = request.args.get('job')
    except:
        job = None
    
    code = ""
    results_size = 0
    json_results = []
    for i in range(1, 15):
        search = host+"/catalog/?q="+find+"&page="+str(i)
        results = getElts(requests.get(search))
        results_size += len(results)
        for result in results:
            children = result.findChildren("span" , recursive=True)
            for child in children:
                try:
                    if (child["class"][0] == "sale-flag-percent" and float(percent) < float(only_numbers(child.text)) ):
                        print("- Href: "+result["href"])
                        print(">>>> ", child.text)
                        json_results.append({"title": str(result.text), "href": str(result["href"]), "percent": float(only_numbers(child.text))})
                except:
                    pass
        i = i +1
    
    json_results = sorted(json_results, key=lambda k: k['percent'])[::-1]
    
    if (len(json_results) == 0 and job == None):
        code = str(MD5(search))[:10]
        _date = (str(datetime.now())).split('.')[0]
        print("> code:{}, percent:{}, search:{}, date:{}".format(code, percent, search.split("&")[0], _date))
        conn = sqlite3.connect('./flashit.db')
        c = conn.cursor()
        c.execute('INSERT INTO ping VALUES (?,?,?,?)', (code, percent, search.split("&")[0], _date))
        conn.commit()
        c.close()
        
    # Build the response
    response = jsonify({ 'status':'success', 'code':code,  'fetched': str(results_size)+' fetched', 'filtered': str(len(json_results))+' filtered', "results": json_results })
    # Let's allow all Origin requests
    response.headers.add('Access-Control-Allow-Origin', '*') # To prevent Cors issues
    return response

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=7777)