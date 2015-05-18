# userTimelineScraper.py
# ~Jun Min (542339)
import sys
import tweepy
import json
import time

from config import Config
from utils.geoTool import BoundingBox
from utils.geoTool import isInBox
from utils.argParser import ArgParser

class UserTimelineScraper:

    min_id = -1
    valid_tweets = 0
    count = 0

    def __init__(self, auth, f, user_id, bounding_box, categories):
        self.auth = auth
        self.f = f
        self.user_id = user_id
        self.categories = categories
        self.bb = bounding_box

    def scrape_timeline(self):

        if self.min_id == -1:
            tweets = api.user_timeline(self.user_id, count=200)
        else:
            tweets = api.user_timeline(self.user_id,\
                    max_id=self.min_id, count=200)

        # Count
        current_search_count = len(tweets)
        self.count = self.count + current_search_count

        for tweet in tweets:
            json_dict = tweet._json

            self.update_min_id(json_dict['id'])

            # Make sure tweet in relevant location

            if json_dict["coordinates"] != None and\
                isInBox(json_dict["coordinates"]["coordinates"][0],
                            json_dict["coordinates"]["coordinates"][1],
                            self.bb[0], self.bb[1], self.bb[2], self.bb[3]):
                self.valid_tweets = self.valid_tweets + 1
                
                # Write to file
                if self.f:
                    f.write(json.dumps(json_dict) + '\n')

        if current_search_count == 0:
            # No more to search, return False
            return False
        else:
            # Still more tweets to scrape, return True
            return True

    def update_min_id(self, tweet_id):
        if (self.min_id == -1) or (tweet_id < self.min_id):
            self.min_id = tweet_id - 1 # Reduce redundancy

# Main
if __name__ == '__main__':

    # Arg Parsing
    ap = ArgParser()
    args = ap.getArgs()

    # Dump File
    if (args.dump):
        f = open(args.dump, 'a+')
    else:
        f = None

    # Input File (for user_ids)
    if (args.input):
        i = open(args.input, 'r')
    else:
        sys.exit("No input file given")

    # Tweepy
    auth = tweepy.auth.AppAuthHandler(Config.consumer_key,\
            Config.consumer_secret)
    api = tweepy.API(auth)

    # Analysis stuff
    categories = None

    #user_ids = ["BarackObama", "Pheo"] 

    break_loop = False

    bounding_box = BoundingBox(Config.longitude,\
            Config.latitude, Config.search_radius)

    for user_id in i:

        print("Scraping User",user_id)
        uts = UserTimelineScraper(auth, f, user_id, bounding_box, categories)
        
        # Keep looping until timeline scraped
        while True:
            try:
                status = uts.scrape_timeline()
                print(uts.valid_tweets,"/",uts.count)

                if status == False:
                   # No new tweets found, break
                   break

            except tweepy.TweepError:
                print("ERROR: TweepError, rate limit reached. Wait 15 mins.")
                time.sleep(60*15)
            except:
                print("ERROR: Unhandled Error. Terminating.")
                break_loop = True
                break

        if break_loop:
            break
