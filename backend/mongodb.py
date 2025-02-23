from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://wheegor:cLyfJJwubnF53OPR@cluster0.h0xrx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
db = client['sample_mflix']
collection = db['movies']
print(collection.find_one())

db = client['BoilerPoops']
collection = db['reviews']
data_single = {"name": "John Doe", "review": "super duper clean"}
result_single = collection.insert_one(data_single)

client.close()

"""try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)"""