import time
import random
import json
import sqlite3
import requests
from main import message_user
print("--------------------------------------")
print("Flashit Job started...")
print("--------------------------------------")
while (1):
    rand = random.randint(3, 13)
    print ("rand: ", rand)
    time.sleep(rand)
    conn = sqlite3.connect('./flashit.db')
    cur = conn.cursor()
    cur.execute("SELECT * FROM flash")
    rows3 = cur.fetchall()
    
    for row in rows3:
        code = row[1]
        chatid = row[0]
        cur = conn.cursor()
        cur.execute("SELECT * FROM ping WHERE code = ?", (row[1],))
        rowsy = cur.fetchall()
        r_json = {}
        #print("rows: ", rows)
        if (len(rowsy) > 0):
            r_json["status"] = "success"
            for rowy in rowsy:
                r_json["code"] = code
                r_json["chatid"] = chatid
                r_json["percent"] = rowy[1]
                r_json["price"] = rowy[2]
                r_json["search"] = rowy[2]
                
            r = requests.get("http://127.0.0.1:7777/flash?job=yes&find="+r_json["search"].split("?q=")[1]+"&percent="+str(r_json["percent"])+"&price="+str(r_json["price"])+"&host="+r_json["search"].split("/catalog/?q=")[0])
            ri = r.json()
            
            print("ri: ", ri)
            
            if len(ri["results"]) > 0:
                message = "Results for "+code+": \n"
                valuee = ""
                for res in ri["results"]:
                    if res["percent"] == 0:
                        valuee = "-"+str(res["price"])+"%"
                    else:
                        valuee = str(res["percent"])
                        
                    message += "> [ "+valuee+" ] "+ res["title"] + "\n"+ res["href"]+"\n\n"
                print("message: ", message)
                message_user(r_json["chatid"], message)
            else:
                pass
        else:
            r_json["status"] = "error"          
            pass
        
        print("r_json: ", r_json)
        
