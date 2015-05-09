DEBUG = False

import math, tweepy, time, csv, json, os

# Renlord's Twitter App Key
api_key = #Key
api_secret = #Secret

# EACH App API key should be deployed in 2 Instances. 

auth = tweepy.auth.AppAuthHandler(api_key, api_secret)

#auth.set_access_token(token, token_secret)

api = tweepy.API(auth)

lat = "29.424122"
lng = "-98.493629"
radius = "100km"
geocode_str = lat + "," + lng + "," + radius

csv_header = ["id", "id_str", "metadata", "entities", "text", "lang", "geo", 
                "coordinates"]

def status2csv(t):
    csv_tweet = {}

    csv_tweet["id"] = t.id
    csv_tweet["id_str"] = t.id_str
    csv_tweet["metadata"] = t.metadata
    csv_tweet["entities"] = t.entities
    csv_tweet["text"] = t.text
    csv_tweet["lang"] = t.lang
    csv_tweet["geo"] = t.geo
    return csv_tweet

filesize = os.stat("tweets.csv").st_size

while(filesize < 8000000000):
    tweets_file = open("tweets.csv", "a")
    writer = csv.DictWriter(tweets_file, delimiter=',', fieldnames=csv_header)
    rate_limit = api.rate_limit_status()['resources']['search']\
                    ['/search/tweets']
    if (DEBUG):
        print("Iteration Limit: {:d}".format(rate_limit['remaining']))
        print("TimeDiff: {:d}".format(int(rate_limit['reset'] - time.time())))
    for i in range(0, math.floor(int(rate_limit['remaining'] / 2))):
        if (DEBUG):
            print("Iteration Count: {:d}".format(i))
        try:
            tweets = api.search("", geocode=geocode_str,count=100)
        except tweepy.TweepError as e:
            continue
        for tweet in tweets:
            csv_tweet = status2csv(tweet)
            writer.writerow(csv_tweet)
    timediff = int(math.ceil(rate_limit['reset'] - time.time()))
    if (DEBUG):
        print("Going to sleep for: {:d}".format(timediff))

    if (timediff > 0):
        time.sleep(timediff)
    filesize = os.stat("tweets.csv").st_size
