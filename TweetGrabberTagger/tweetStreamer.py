# tweetStreamer.py
# ~Jun Min (542339)
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream

consumer_key="esfbRz6gUhGyckd2t7K7BLQeW"
consumer_secret="A7GyPaNmpJsKgXXgR2qIgNCRhPN1KCvb0qJ3YfImPqHNevhTwx"

access_token="2362162429-GYwJY4gknR5Gj6JHs9aSlP7hax8k3Z0fXK8PVwE"
access_token_secret="4kWkv1Yqpst0o7V7QaYMiusFZppAyCtOXg06AJ693o1WZ"

class TweetAnalysisListener(StreamListener):
    """ Listener handler that passes tweets for analysis"""
    def on_data(self, data):
        print(data)
        return True

    def on_error(self, status):
        print(status)

if __name__ == '__main__':
    tal = TweetAnalysisListener()
    auth = OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)

    stream = Stream(auth, tal)
    stream.filter(track=['basketball'])
