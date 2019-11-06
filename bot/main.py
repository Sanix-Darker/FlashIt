#!/usr/bin/env python
# coding=utf-8

# FlashIt Bot
# main.py
# Made by S@n1X-d4rk3r
# This is the core where anything is done

from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackQueryHandler, RegexHandler, ConversationHandler
from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from telegram import KeyboardButton, ReplyKeyboardMarkup, ReplyKeyboardRemove

import logging
from datetime import datetime
import sqlite3
import configparser as ConfigParser
import json
import os
import requests

conn = sqlite3.connect('./flashit.db')
c = conn.cursor()
c.execute('create table if not exists flash (chatid string, code string, username string, _date string)')
conn.commit()
c.close()

with open('logs.log', 'w') as fill:
    fill.write(".")

# Let's instantiate the database if it's not exist
# if

# Create a custom logger
logger = logging.getLogger(__file__)
logger.setLevel(logging.INFO)
# Create handlers
f_handler = logging.FileHandler('logs.log')
# Create formatters and add it to handlers
f_format = logging.Formatter(' %(asctime)s > %(process)d-%(levelname)s-%(message)s')
f_handler.setFormatter(f_format)
# Add handlers to the logger
logger.addHandler(f_handler)

separator = "# -------------------------------------------------------------"

# Configs parameters configParser.get('your-config', 'path1')
configParser = ConfigParser.RawConfigParser()
configFilePath = r'config.txt'
configParser.read(configFilePath)
# Configs parameters
TOKEN = configParser.get('flashitbot-config', 'token')


thebot = None

# Lang management
def get_lang_string_by_code(lang_code, code):
    with open('lang/'+lang_code+'.json', 'r+', encoding='utf-8') as f:
        lang_string = json.load(f)
        return lang_string[code]

def presentation():
    #os.system("clear")
    print(separator)
    print("[+] # ----------------- Flashitbot Started! -------------------------")
    print(separator)
    print("[+] #                                      By 🐼Sanix darker")
    print(separator)

# To print a log and save it in logs.log
def printLog(command, Telegram_user):
    tolog = command + " by: first_name: {}, last_name: {}, username: {}, language_code: {}, is_bot: {}".format(str(Telegram_user.first_name), str(Telegram_user.last_name), str(Telegram_user.username), str(Telegram_user.language_code), str(Telegram_user.is_bot))
    #logger.info(tolog)
    print(tolog)

# To rejects other bots that wanted to querry JeveuBot
def reject_bots(bot, update):
    #global thebot
    #thebot = bot
    if(update.message.from_user.is_bot == True):
        logger.info(("OUPS BOT, not authorized here!"))
        bot.send_message(chat_id=update.message.chat_id,
                            text="NOT AUTHORIZED")
        return False

    return True

# ---------------------------------------------
# -----------COMMAND CALLBACK -----------------
# ---------------------------------------------
# message = telegram.Message(
#     message_id=0,
#     from_user=telegram.User(0, 'greenkey'),
#     date=datetime.now(),
#     chat=telegram.Chat(0, ''),
#     text=message_text
# )
# define a command callback function : /start
def start_callback(bot, update):
    #global thebot
    #thebot = bot
    lang_code = update.message.from_user.language_code
    print(separator)
    printLog("command: /start ",update.message.from_user)
    bot.send_message(chat_id=update.message.chat_id,
                        text="Hello " + str(update.message.from_user.first_name) + " " + str(update.message.from_user.last_name))
    # profil, options, help, add, revoke, news, complex search
    if(reject_bots(bot, update) == True):
        bot.send_message(chat_id=update.message.chat_id,
                            text=get_lang_string_by_code(lang_code, "WELCOME_MESSAGE"))

# Handler
start_handler = CommandHandler("start", start_callback)


# The Help function
def help_callback(bot, update):
    #global thebot
    #thebot = bot
    lang_code = update.message.from_user.language_code

    print(separator)
    printLog("command: /help ",update.message.from_user)
    if(reject_bots(bot, update) == True):
        bot.send_message(chat_id=update.message.chat_id,
                        text=get_lang_string_by_code(lang_code, "HELP_MESSAGE"))
# Handler
help_handler = CommandHandler("help", help_callback)


# def handle_message(bot, update):
#     text = update.message.text
#     if text == 'hello':
#         update.message.reply_text('Hello {}'.format(update.message.from_user.first_name))

# dispatcher.add_handler(MessageHandler(filters=Filters.text, callback=handle_message))


# To send messageto some one init's Telegram
def message_user(chatid, message):
        # global thebot
        # thebot.send_message(chat_id=chatid,
        #                 text=message)
        payload = {
            'chat_id': chatid,
            'text': message
        }
        return requests.post("https://api.telegram.org/bot{token}/sendMessage".format(token=TOKEN),
                             data=payload).content

# ---------------------------------------------
# -----------TEXT CALLBACK -----------------
# ---------------------------------------------
# define a command callback function : avion noir
# Rake is for cleaning unnusual words
# import rake

def echo_callback(bot, update):
    #global thebot
    #thebot = bot
    lang_code = str(update.message.from_user.language_code)

    print(separator)
    print("[+] Request: ",update.message.from_user)
    code = str(update.message.text)
    chatid = str(update.message.chat_id)

    if(reject_bots(bot, update) == True):
        if (len(code) > 15):
            bot.send_message(chat_id=update.message.chat_id,
                                text=get_lang_string_by_code(lang_code, "REQUEST_TOO_LONG"))
        else:
            # correct_sentence = CorrectSentence(lang_code, to_find)
            # print("[+] Message: " , correct_sentence)
            # print ("keywords: ", rake.clean(to_find, "./data/erase_word_list_"+lang_code+".txt"))

            # bot.send_message(chat_id=update.message.chat_id,
            #                     disable_notification = True,
            #                         text="🤖# {}".format(get_lang_string_by_code(lang_code, "WAIT_MESSAGE")))

            # On peut enchainer les lien avec des ','
            r_json = {}

            conn = sqlite3.connect('./flashit.db')
            cur = conn.cursor()

            cur.execute("SELECT * FROM flash WHERE code = ?", (code,))
            rows2 = cur.fetchall()

            if (len(rows2) > 0):
                r_json["status"] = "error"
            else:
                cur = conn.cursor()
                cur.execute("SELECT * FROM ping WHERE code = ?", (code,))
                rows = cur.fetchall()
                #print("[+] rows: ", rows)
                if (len(rows) > 0):
                    for row in rows:
                        r_json = {
                            "status": "success",
                            "code": row[0],
                            "href": row[2],
                            "percent": row[1],
                            "price": row[2]
                        }
                else:
                    r_json["status"] = "error"

            #print("[+] r_json: ", r_json)
            if r_json["status"] == "success":
                _date, c = (str(datetime.now())).split('.')[0], conn.cursor()

                c.execute('INSERT INTO flash VALUES (?,?,?,?)', (chatid, code, update.message.from_user.username, _date))
                conn.commit()
                c.close()

                #print("[+] ------------------\nCode: "+r_json["code"]+"!\nLink: "+r_json["href"] + " \n-" + str(r_json["percent"]) + "%\n\n"+get_lang_string_by_code(lang_code, "CODE_SAVED_MESSAGE")+"\n------------------")
                bot.send_message(chat_id=update.message.chat_id,
                                        text = "-----------------------------------------\nCode: "+r_json["code"]+"!\nLink: "+r_json["href"] + "\n\n"+get_lang_string_by_code(lang_code, "CODE_SAVED_MESSAGE")+"\n-----------------------------------------")
            else:

                bot.send_message(chat_id=update.message.chat_id,
                                    text="🤖# {} {}".format(get_lang_string_by_code(lang_code, "OUPS_URL_MESSAGE"), code))

            print("[+] Response sent successfully!")

# Create a command handler
echo_handler = MessageHandler(Filters.text, echo_callback)
# ---------------------------------------------
# ------- BUTTON / MENU CALLBACK ------------
# ---------------------------------------------
# Managing Buttons Menu
def menu_callback(bot, update):
    #global thebot
    #thebot = bot
    lang_code = update.message.from_user.language_code
    button = [
        [
            InlineKeyboardButton("Profil", callback_data="profil"),
            InlineKeyboardButton("Options", callback_data="options"),
            InlineKeyboardButton("help", callback_data="help")
        ],
        [
            InlineKeyboardButton("add", callback_data="add"),
            InlineKeyboardButton("revoke", callback_data="revoke")
        ],
        [InlineKeyboardButton("news", callback_data="news")]
    ]
    reply_markup = InlineKeyboardMarkup(button)
    if(reject_bots(bot, update) == True):
        bot.send_message(chat_id=update.message.chat_id,
                            text="Welcome to jeveu menu, please Choose something...",
                                reply_markup=reply_markup)
menu_handler = CommandHandler("menu", menu_callback)

def error(bot, update, error):
    #global thebot
    #thebot = bot
    """Log Errors caused by Updates."""
    logger.warning('Update "%s" caused error "%s"', update, error)


def main():
    # Starting with the presentation
    presentation()

    # Cheker for new messages from elegram API -> polling
    updater = Updater(token=TOKEN)
    # Allow us to register handlers -> command, text, video, audio, etc
    dispatcher = updater.dispatcher

    # Add a command handler for dispatcher
    dispatcher.add_handler(start_handler)

    # Add a command handler for dispatcher
    dispatcher.add_handler(help_handler)

    # Add a command handler for dispatcher
    #dispatcher.add_handler(image_handler)

    # Add a text handler for dispatcher
    dispatcher.add_handler(echo_handler)

    # Options handler on dispatcher
    dispatcher.add_handler(menu_handler)
    # Button handler After clikc on a menu
    #dispatcher.add_handler(button_handler)

    # log all errors
    dispatcher.add_error_handler(error)

    # Start the Bot
    updater.start_polling()

    # Run the bot until you press Ctrl-C or the process receives SIGINT,
    # SIGTERM or SIGABRT. This should be used most of the time, since
    # start_polling() is non-blocking and will stop the bot gracefully.
    updater.idle()

if __name__ == '__main__':
    main()