# tweetGrabber.py
# ~Jun Min (542339)

import tweepy
import json

from tweetTagger import tweetTagger

# API Key, Secret
api_key="esfbRz6gUhGyckd2t7K7BLQeW"
api_secret="A7GyPaNmpJsKgXXgR2qIgNCRhPN1KCvb0qJ3YfImPqHNevhTwx"

# Longitude, Latitude
lat = "29.424122"
lng = "-98.493629"

auth = tweepy.auth.AppAuthHandler(api_key, api_secret)

def search_api(auth):

    api = tweepy.API(auth)

    radius = "50km"
    geocode_str = lat + "," + lng + "," + radius
    tweets = api.search("", geocode=geocode_str, count=1)
    for tweet in tweets:
        tagged_tweet = tweetTagger(tweet._json)
        print(tagged_tweet.getJSONTaggedTweet())

search_api(auth)
