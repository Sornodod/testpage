import telebot
from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo

# Ваш токен
TOKEN = 'TOKEN_SUDA_BLEAT'

bot = telebot.TeleBot(TOKEN)

@bot.message_handler(commands=['start'])
def start(message):
    web_app_url = "https://sornodod.github.io/testpage/"  

 
    keyboard = InlineKeyboardMarkup()
    web_app_button = InlineKeyboardButton("Open Web App", web_app=WebAppInfo(url=web_app_url))
    keyboard.add(web_app_button)

    bot.send_message(
        message.chat.id,
        "ТЕСТОВОЕ WEB-ПРИЛОЖЕНИЕ",
        reply_markup=keyboard
    )


bot.polling()
