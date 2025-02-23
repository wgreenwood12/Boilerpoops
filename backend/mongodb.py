from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://wheegor:cLyfJJwubnF53OPR@cluster0.h0xrx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))


def addReview(building, bathroom, cleanliness, ambiance, occupancy, image = None, brcomments = None):
    db = client['BoilerPoops']
    collection = db['reviews']
    data_single = {"Building": building, "Bathroom": bathroom, "Cleanliness": cleanliness, "Ambiance": ambiance, "Occupancy": occupancy,
                   "Image": image, "BRComments": brcomments}
    collection.insert_one(data_single)
    updateBuldings(building) #updates buildings db, recalculates everything

#addReview('WALC', 'BR-131', 3.3, 4.4, 5.5)

def calculate_mean(numbers):
    if len(numbers) == 0:
        numbers.append(0)
    return round(sum(numbers) / len(numbers), 1)
def calcBuildingSubAverages(building, bathroom = None):
    db = client['BoilerPoops']
    collection = db['reviews']
    cleanlinessAVG = []
    ambianceAVG = []
    occupancyAVG = []
    if bathroom == None:
        buildingReviews = collection.find({"Building": f'{building}'})
        for review in buildingReviews:
            cleanlinessAVG.append(review['Cleanliness'])
            ambianceAVG.append(review['Ambiance'])
            occupancyAVG.append(review['Occupancy'])
        return calculate_mean(cleanlinessAVG), calculate_mean(ambianceAVG), calculate_mean(occupancyAVG)
    else:
        buildingReviews = collection.find({"Building": f'{building}', "Bathroom": f'{bathroom}'})
        for review in buildingReviews:
            cleanlinessAVG.append(review['Cleanliness'])
            ambianceAVG.append(review['Ambiance'])
            occupancyAVG.append(review['Occupancy'])
        return calculate_mean(cleanlinessAVG), calculate_mean(ambianceAVG), calculate_mean(occupancyAVG)


def calcBuildingAverage(building):
    averages = calcBuildingSubAverages(building)
    mean = calculate_mean(averages)
    return mean

def updateBuldings(building):
    db = client['BoilerPoops']
    collection = db['buildings']
    #update ovr average
    mean = calcBuildingAverage(building)
    #update sub averages
    clean, amb, occ = calcBuildingSubAverages(building)
    updated_values = {
        "Rating": mean,
        "Cleanliness AVG": clean,
        "Ambiance AVG": amb,
        "Occupancy AVG": occ
    }
    collection.update_one(
        {"Building": building},  # Filter by building name
        {"$set": updated_values},  # Update multiple fields
        upsert=True  # Create document if it doesn’t exist
    )


def leaderboard():
    db = client['BoilerPoops']
    collection = db['buildings']
    buildings = collection.find({}, {"Building": 1, "Rating": 1})
    rankings = {}
    for building in buildings:
        if "Building" in building and "Rating" in building:
            rankings[building["Building"]] = building["Rating"]
    sorted_data = dict(sorted(rankings.items(), key=lambda item: item[1], reverse=True))
    return sorted_data



client.close()

"""try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)"""
