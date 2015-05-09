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

    def on_data(self, data):
        # Load raw JSON into dict
        tagged_tweet = tweetTagger(json.loads(data), self.categories) 
        json_tagged_tweet = tagged_tweet.getJSONTaggedTweet()
        print(json_tagged_tweet)

        # Decide what to do with the tweet
        if f:
            self.f.write(data) # Temporarily

        self.count += 1
        print(self.count)

        return True

    def on_error(self, status):
        # Crap, rate limit reached
        if status_code == 420:
            #returning False in on_data disconnects the stream
            return False
        print(status)

# Main Entry
if __name__ == '__main__':

    # Arg Parsing
    ap = ArgParser()
    args = ap.getArgs()

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

