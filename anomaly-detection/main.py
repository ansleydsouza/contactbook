import pymongo
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError, OperationFailure
import json


def connect_to_mongo_and_get_stats():
    with open('default.json') as config:
        data = json.load(config)

    connection_string = data['CONNECTION_STRING']

    try:
        client = MongoClient(connection_string)
    except ConnectionFailure:
        print("Could not connect to the database")
        exit(1)

    # Get MongoDB Server Information
    try:
        server_info = client.server_info()
    except ServerSelectionTimeoutError:
        print("Timeout Error when getting server information")


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    stats = connect_to_mongo_and_get_stats()
    print(stats)

