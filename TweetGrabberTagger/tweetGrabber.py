# tweetGrabber.py
# ~Jun Min (542339)

import tweepy

import json
from config import Config
from utils.argParser import ArgParser
from tagger.tweetTagger import tweetTagger
from data.categoryParser import CategoryParser

def search_api(auth, f, lng, lat, search_radius, categories):
    api = tweepy.API(auth)

    geocode_str = str(lat) + "," + str(lng) + "," + str(search_radius) + "km"
    tweets = api.search("", geocode=geocode_str, count=5)
    for tweet in tweets:
        tagged_tweet = tweetTagger(tweet._json, categories)
        json_tagged_tweet = tagged_tweet.getJSONTaggedTweet()
        #print(json_tagged_tweet)
        if f:
            f.write(json.dumps(tweet._json)) # Temporarily

if __name__ == '__main__':

    # Arg Parsing
    ap = ArgParser()
    args = ap.getArgs()

    if (args.dump):
        f = open(args.dump, 'a+')
        #f.close()
    else:
        f = None

    auth = tweepy.auth.AppAuthHandler(Config.consumer_key,
            Config.consumer_secret)

    # Longitude, Latitude
    lat = Config.latitude
    lng = Config.longitude
    search_radius = Config.search_radius

    # Categories object
    categories = CategoryParser()

    search_api(auth, f, lng, lat, search_radius, categories)

