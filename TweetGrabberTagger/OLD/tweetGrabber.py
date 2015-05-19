# tweetGrabber.py
# ~Jun Min (542339)

import tweepy

import json
import time
from config import Config
from utils.argParser import ArgParser
from tagger.tweetTagger import tweetTagger
from data.categoryParser import CategoryParser

class TweetGrabber:

    min_id = -1
    count = 0

    def __init__(self, auth, f, lng, lat, search_radius, categories):

        self.auth = auth
        self.f = f
        self.longitude = lng
        self.latitude = lat
        self.search_radius = search_radius
        self.categories = categories

    def search_api(self):
        '''Searches API'''
        api = tweepy.API(self.auth)

        geocode_str = str(self.latitude) + "," + str(self.longitude) + "," + str(self.search_radius) + "km"

        # Unknown max_id, start with by date search
        if self.min_id == -1:
            tweets = api.search("", geocode=geocode_str, count=100)
        else:
            tweets = api.search("", max_id=self.min_id, geocode=geocode_str, count=100)
        
        # Count total tweets
        self.count = self.count + len(tweets)
        print(self.count, self.min_id)

        # Parse each tweet
        for tweet in tweets:
            json_dict = tweet._json
            self.update_min_id(json_dict['id'])
            tagged_tweet = tweetTagger(json_dict, self.categories)
            json_tagged_tweet = tagged_tweet.getJSONTaggedTweet()
            if f:
                #f.write(json.dumps(tweet._json) + '\n') # Temporarily. Dump raw json
                f.write(json_tagged_tweet + '\n') # Added new line sepeartor which isn't currently there.
                pass

    def update_min_id(self, tweet_id):
        if (self.min_id == -1) or (tweet_id < self.min_id):
            self.min_id = tweet_id - 1 # Reduce redundancy

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

    # Initialize TweetGrabber
    tg = TweetGrabber(auth, f, lng, lat, search_radius, categories)
            
    # Just infinite loop
    while True:
        try:
            tg.search_api()
        except tweepy.TweepError:
            print("TweepError, probably rate limit reached. Wait 15 mins.")
            time.sleep(60 * 15)
        except:
            print("Unhandled Error")
            break
