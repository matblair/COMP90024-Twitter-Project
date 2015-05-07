# tweetStreamer.py
# ~Jun Min (542339)
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream

import json

from geoTool import boundingBox
from tweetTagger import tweetTagger

# Consumer Key/Secret
consumer_key="esfbRz6gUhGyckd2t7K7BLQeW"
consumer_secret="A7GyPaNmpJsKgXXgR2qIgNCRhPN1KCvb0qJ3YfImPqHNevhTwx"

# Access Token/Secret
access_token="2362162429-GYwJY4gknR5Gj6JHs9aSlP7hax8k3Z0fXK8PVwE"
access_token_secret="4kWkv1Yqpst0o7V7QaYMiusFZppAyCtOXg06AJ693o1WZ"

# Lat / Long
lon = -98.493629
lat = 29.424122

# Bounding Box
bounding_box = boundingBox(lon, lat, 100)
# Round to 2 places
for i in range(0,len(bounding_box)):
    bounding_box[i] = float("{0:.1f}".format(bounding_box[i]))
print(bounding_box)

class TweetAnalysisListener(StreamListener):
    """ Listener handler that passes tweets for analysis"""
    def on_data(self, data):
        data_dict = json.loads(data)
        tagged_tweet = tweetTagger(json.loads(data)) # Load raw JSON into dict
        print(tagged_tweet.getJSONTaggedTweet())
        return True

    def on_error(self, status):
        # Crap, rate limit reached
        if status_code == 420:
            #returning False in on_data disconnects the stream
            return False
        print(status)

# Main Entry
if __name__ == '__main__':
    tal = TweetAnalysisListener()
    auth = OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)

    stream = Stream(auth, tal)
    stream.filter(track=['basketball'])
    #stream.filter(locations=bounding_box)
    #stream.filter(locations=[-122.75,36.8,-121.75,37.8])
    stream.filter(locations=[-98.75,29.8,-97.75,30.8])
    '''
Latitude 	29.424122
Longitude 	-98.493629
'''
