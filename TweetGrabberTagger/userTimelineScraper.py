from multiprocessing import Pool
import multiprocessing

import tweepy
import json
import time
import math
import sys

from utils.geoTool import BoundingBox
from utils.geoTool import isInBox
from utils.argParser import ArgParser
from utils.configParser import ConfigParser
from utils.apiClient import APIClient

class UserTimelineScraper:
    def __init__(self, auth, f, ip, port, user_id, bounding_box, categories):

        self.min_id = -1
        self.valid_tweets = 0
        self.count = 0

        self.auth = auth
        self.f = f
        self.ip = ip
        self.port = port
        self.user_id = user_id
        self.categories = categories
        self.bb = bounding_box

        self.api = tweepy.API(auth)
        self.apiclient = APIClient(self.ip, self.port)

    def scrape_timeline(self):

        if self.min_id == -1:
            tweets = self.api.user_timeline(self.user_id, count=200)
        else:
            tweets = self.api.user_timeline(self.user_id,\
                    max_id=self.min_id, count=200)

        # Count
        current_search_count = len(tweets)
        self.count = self.count + current_search_count

        # tweet_array for bulk API send
        tweet_array = []

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
                    self.f.write(json.dumps(json_dict) + '\n')

                # Send to API
                if self.ip:
                    tweet_array.append(json_dict)

        # Send to API
        if self.ip:
            try:
                status = self.apiclient.postApiTweetsSubmit(tweet_array)
                print("Status",status)
            except:
                print("ERROR: API Error")

        if current_search_count == 0:
            # No more to search, return False
            return False
        else:
            # Still more tweets to scrape, return True
            return True

    def update_min_id(self, tweet_id):
        if (self.min_id == -1) or (tweet_id < self.min_id):
            self.min_id = tweet_id - 1 # Reduce redundancy
 
def scrape_timeline(input_file, output_file, api_token, ip, port,\
        longitude, latitude, search_radius):
    """worker function"""
    print('Args', input_file, output_file, api_token)

    # Dump File
    if output_file != None:
        f = open(output_file, 'a+')
    else:
        f = None
    
    # Open Input split file
    i = open(input_file, 'r')

    # Authentication
    auth = tweepy.auth.AppAuthHandler(api_token['key'], api_token['secret'])

    # Analysis stuff
    categories = None

    break_loop = False

    bounding_box = BoundingBox(longitude,\
            latitude, search_radius)

    for user_id in i:

        print("Scraping User (",input_file ,")" ,user_id)
        uts = UserTimelineScraper(auth, f, ip, port,\
                user_id, bounding_box, categories)
        
        # Keep looping until timeline scraped
        while True:
            try:
                status = uts.scrape_timeline()
                print("Dumped (",output_file ,")",\
                        uts.valid_tweets,"/",uts.count)

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

def split_file_name(num, name):
    return str(name) + '.split.' + format(num, '03d')

def split_output_file_name(num, name):
    return str(name) + '.output.' + format(num, '03d')

def split_file(split_count, input_file, output_file):
    '''Splits input file into multiple output files'''

    len_input = sum(1 for line in open(input_file))
    num_lines = math.ceil(len_input / split_count)

    # Input file to be split
    f = open(input_file, 'r')

    count = 0   # Line Count
    at = 0      # Current split file count
    split_output_file = None

    for line in f:
        # Close current file
        if count % num_lines == 0:
            if split_output_file:
                split_output_file.close()
            split_output_file = open(split_file_name(at, input_file), 'w')
            at += 1
        split_output_file.write(line)
        count += 1

    # Split done, close input file
    f.close()

if __name__ == '__main__':

    ap = ArgParser()
    args = ap.getArgs()

    # Main Input File
    if (args.input):
        pass
    else:
        sys.exit("No input file given")

    # Config Parsing
    Config = ConfigParser(args.config).getConfig()

    # Count tokens in Config
    num_keys = len(Config['api_tokens'])

    # Split input_file
    split_file(num_keys, args.input, args.dump)

    for i in range(num_keys):
        # Assign a different token to each process
        input_file = split_file_name(i, args.input)

        # Check if have dumpfile
        if (args.dump):
            output_file = split_output_file_name(i, args.dump)
        else:
            output_file = None

        process = multiprocessing\
                .Process(target=scrape_timeline,\
                args=(input_file,\
                output_file,\
                Config['api_tokens'][i],\
                args.ip, args.port,\
                Config['longitude'], Config['latitude'],\
                Config['search_radius'],))
        process.start()
