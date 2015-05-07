# tweetCSVParser.py
# ~Jun Min (542339)
'''
import sys

import csv
import json

from tweetTagger import tweetTagger

# Main Entry
if __name__ == '__main__':
    # CLI Arguments
    argc = len(sys.argv)
    if 2 <= argc <= 3:
        input_csv = sys.argv[1] 
        if argc == 3:
            output_csv = sys.argv[2]
        else:
            output_csv = input_csv+".OUTPUT.CSV"
    else:
        exit("Usage: python tweetCSVParser.py INPUT.CSV [OUTPUT.CSV]")
        
    # Read input csv
    with open(input_csv, 'r') as csvfile:
        tweetreader = csv.DictReader(csvfile, delimiter=',', quotechar='"')
        for row in tweetreader:
            pass
            #tagged_tweet = tweetTagger(row)
            #a = json.loads(str(row))
            
            #print(tagged_tweet.getJSONTaggedTweet())
            
            
    # Write output
    print("Will write to",output_csv)
'''


''' 

THIS IS CURRENTLY ON HOLD.
THE OLD PREDOWNLOADED TWEETS ARE MISSING A LOT OF FIELDS

'''
