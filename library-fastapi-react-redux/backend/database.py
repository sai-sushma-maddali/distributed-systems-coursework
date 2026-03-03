## Connecting to database

import mysql.connector
import configparser

# Getting credentials from config file

config = configparser.ConfigParser()
config.read("config.ini")

def get_connection():
    return mysql.connector.connect(
        host=config["mysql"]["host"],
        user=config["mysql"]["user"],
        password=config["mysql"]["password"],
        database=config["mysql"]["database"]
    )
