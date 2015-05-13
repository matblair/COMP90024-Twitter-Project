# tweetStreamer.py
# ~Jun Min (542339)
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream

import json
from config import Config
from tagger.tweetTagger import tweetTagger
from data.categoryParser import CategoryParser
from utils.argParser import ArgParser
from utils.geoTool import BoundingBox

from utils.apiClient import APIClient

class TweetAnalysisListener(StreamListener):
    """ Listener handler that passes tweets for analysis"""

    def __init__(self, f, ip, port):
        '''Initializes write to file and api args'''
        self.f = f
        self.ip = ip
        self.port = port

        self.count = 0

        # Categories Object
        self.categories = CategoryParser()

        # API Client
        self.apiclient = APIClient(self.ip, self.port)

    def on_data(self, data):
        # Load raw JSON into dict
        tagged_tweet = tweetTagger(json.loads(data), self.categories) 
        json_tagged_tweet = tagged_tweet.getJSONTaggedTweet()
        dict_tagged_tweet = tagged_tweet.getTaggedTweet()

        # Decide what to do with the tweet
        if f:
            #self.f.write(data) # Temporarily, dumps raw JSON
            self.f.write(json_tagged_tweet + '\n') 

        if self.ip:
            tweet_array = [dict_tagged_tweet]
            self.apiclient.postApiTweetsSubmit(tweet_array)

        self.count += 1
        print(self.count)

        return True

    def on_error(self, status):
        # Crap, rate limit reached
        if status_code == 420:
            print("ERROR: Rate limit reached")
            #returning False in on_data disconnects the stream
        print(status)
        return True


    def on_timeout(self):
        print("ERROR: Timeout...")
        return True # Don't kill the stream

# Main Entry
if __name__ == '__main__':

    # Arg Parsing
    ap = ArgParser()
    args = ap.getArgs()
    #print(args)

    if (args.dump):
        f = open(args.dump,'a+')
        #f.close()
    else:
        f = None

    # Bounding Box
    bounding_box = BoundingBox(Config.longitude,
            Config.latitude, Config.search_radius)
    print("Boundary:",bounding_box)


    tal = TweetAnalysisListener(f, args.ip, args.port)
    auth = OAuthHandler(Config.consumer_key, Config.consumer_secret)
    auth.set_access_token(Config.access_token, Config.access_token_secret)

    stream = Stream(auth, tal)
    stream.filter(locations=bounding_box)

