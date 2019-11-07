import time
import random
import json
import sqlite3
import requests
from main import message_user


print("[+] --------------------------------------")
print("[+] Flashit Job started...")
print("[+] --------------------------------------")

while True:
    rand = random.randint(100, 500)
    print ("[+] rand: ", rand)
    time.sleep(rand)
    conn = sqlite3.connect('./flashit.db')
    cur = conn.cursor()
    cur.execute("SELECT * FROM flash")
    rows3 = cur.fetchall()

    for row in rows3:
        code, chatid, cur = row[1], row[0], conn.cursor()
        cur.execute("SELECT * FROM ping WHERE code = ?", (row[1],))
        rowsy = cur.fetchall()
        r_json = {}
        #print("[+] rowsy: ", rowsy)
        if (len(rowsy) > 0):
            for rowy in rowsy:
                #print("rowy: ", rowy)
                r_json = {
                    "status": "success",
                    "code": code,
                    "chatid": chatid,
                    "percent": rowy[1],
                    "price": rowy[2],
                    "search": rowy[3],
                    "not_contain": rowy[5],
                    "must_contain": rowy[6],
                    "category": rowy[7]
                }
            #print('r_json["search"].split("?q=")[1]: ', r_json["search"].split("?q=")[1])
            r = requests.get(
                "http://127.0.0.1:7777/flash?job=yes&find="+
                r_json["search"].split("?q=")[1]+
                "&percent="+str(r_json["percent"])+
                "&level=20"+
                "&price="+str(r_json["price"])+
                "&not_contain="+str(r_json["not_contain"])+
                "&must_contain="+str(r_json["must_contain"])+
                "&category="+str(r_json["category"])+
                "&host="+r_json["search"].split("/catalog/?q=")[0]
            )
            ri = r.json()

            #print("[+] ri: ", ri)

            if (len(ri["results"]) > 0):
                message = ""
                not_contain = str(r_json["not_contain"]).split(",")
                must_contain = str(r_json["must_contain"]).split(",")
                for res in ri["results"]:


                    if( not any(ext.lower() in res["title"].lower() for ext in not_contain) and
                        any(ext.lower() in res["title"].lower() for ext in must_contain)):

                        value = "< "+str(res['price'])+" F"
                        if res['price'] == 0:
                            value = "- "+str(res['percent'])+" %"

                        message += "> [ "+value+" ] "+ res["title"] + "\n"+ res["href"]+"\n\n"
                    else:
                        print("[+] must_contain: {} and not_contain: {} rejections: ".format(must_contain, not_contain))

                if (len(message) > 5 and
                    not any(ext.lower() in message.lower() for ext in not_contain) and
                            any(ext.lower() in message.lower() for ext in must_contain)):
                    print("[+] message: ", message)
                    print(message_user(r_json["chatid"], str("Results for "+code+": \n"+str(message))))
                    cur.execute("DELETE FROM ping WHERE code = ?", (row[1],))
                    cur.execute("DELETE FROM flash WHERE code = ?", (row[1],))
                    conn.commit()
                    cur.close()

        else:
            r_json["status"] = "error"

        print("[+] r_json: ", r_json)