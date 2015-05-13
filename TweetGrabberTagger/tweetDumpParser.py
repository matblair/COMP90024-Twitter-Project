# tweetDumpParser.py
# ~Jun Min (542339)

# tweetDumpParser takes a JSON Dump file of tweets
# Extracted JSON Tweets are then processed using tweetTagger
import sys
import json
import re

from tagger.tweetTagger import tweetTagger
from data.categoryParser import CategoryParser

from utils.apiClient import APIClient

file_name = sys.argv[1]
dest_name = sys.argv[2]

f = open(dest_name,"a+")

with open(file_name) as fp:

    # Categories Object
    categories = CategoryParser()

    ac = APIClient('144.6.227.66', 4500)

    for line in fp:
        new_json = json.loads(line)

        tagged_tweet = tweetTagger(new_json, categories)
        json_tagged_tweet = tagged_tweet.getJSONTaggedTweet()
        dict_tagged_tweet = tagged_tweet.getTaggedTweet()
        
        tweet_array = [dict_tagged_tweet]
        r = ac.postApiTweetsSubmit(tweet_array)   

        f.write(json_tagged_tweet)
        f.write("\n")

f.close()
