# tweetDumpParser.py
# ~Jun Min (542339)

# tweetDumpParser takes a JSON Dump file of tweets
# Extracted JSON Tweets are then processed using tweetTagger
import sys
import json
import re

file_name = sys.argv[1]
dest_name = sys.argv[2]

f = open(dest_name,"a+")

with open(file_name) as fp:
    for line in fp:
        new_json = json.loads(line)
        regex = r"\d+"
        m = re.search(regex, new_json['text'])
        print(m.group())
        #if (u"\U0001F494" in new_json['text']): # Broken Heart
        #    print(new_json['text'])
        f.write(new_json['text'])
        f.write("\n")

f.close()
