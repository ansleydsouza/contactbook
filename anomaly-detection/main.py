import pymongo
from pymongo import MongoClient
import json



def connect_to_mongo():

    with open('default.json') as config:
        data = json.load(config)

    connection_string = data['CONNECTION_STRING']

    client = MongoClient(connection_string)

    return client['Contacts']


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    db = connect_to_mongo()
    print(db)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
