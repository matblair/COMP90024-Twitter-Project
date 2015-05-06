# tweetTagger.py

import json

from tweetAnalyzer import tweetAnalyzer

class tweetTagger:
    'Tweet tagger. Adds tags on a tweet-by-tweet basis.'
    'Returned JSON Object conforms to Graph REST API.'

    tagged_tweet = {} # Empty Dict
    
    # Constructor takes in a raw tweet and begins generating tags
    def __init__(self, raw_tweet):

        self.grabAttributes(raw_tweet)

        # Analyze tweets
        self.analyzeText(raw_tweet['text'])

    # Grabs attributes from raw tweet
    def grabAttributes(self, raw_tweet):

        self.tagged_tweet['id'] = raw_tweet['id']
        self.tagged_tweet['text'] = raw_tweet['text']

    # Analyzes and adds tags to tagged_tweet.
    def analyzeText(self, tweet_text):

        tweet_analysis = {}
        
        # Initialize tweet analysis
        tweet_analyzer = tweetAnalyzer(tweet_text)

        # Translation
        tweet_analysis['sentiment'] = tweet_analyzer.analyzeSentiment()
        #tweet_analysis['pos_tag'] = tweet_analyzer.analyzePOS()
        tweet_analysis['language'] = tweet_analyzer.analyzeLanguage()

        tweet_analysis['emoji_sentiment'] = tweet_analyzer.analyzeEmoji()
        tweet_analysis['ironic'] = tweet_analyzer.analyzeIrony()
        tweet_analysis['unemployment'] = tweet_analyzer.analyzeUnemployment()
        tweet_analysis['political_alignment'] \
                = tweet_analyzer.analyzePoliticalAlignment()

        self.tagged_tweet['analysis'] = tweet_analysis

    # Returns Graph API Compatible JSON Object
    def getJSONTaggedTweet(self):
        return json.dumps(self.tagged_tweet)

