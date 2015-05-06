# tweetTagger.py

import json

from tweetAnalyzer import tweetAnalyzer

class tweetTagger:
    '''Tweet tagger. Adds tags on a tweet-by-tweet basis.
    Returned JSON Object conforms to Graph REST API.'''

    tagged_tweet = {} # Empty Dict
    
    # Constructor takes in a raw tweet and begins generating tags
    def __init__(self, raw_tweet):
        '''Initialization. Grabs attributes from tweet and performs analysis'''
        self.grabAttributes(raw_tweet)
        self.analyzeTweet(raw_tweet)

    def grabAttributes(self, raw_tweet):
        '''Grabs attributes from raw tweet'''
        self.tagged_tweet['id'] = raw_tweet['id']
        self.tagged_tweet['text'] = raw_tweet['text']

    def analyzeTweet(self, raw_tweet):
        '''Analyzes and adds tags to tagged_tweet'''
        
        # Initialize tweet analysis
        tweet_analyzer = tweetAnalyzer(raw_tweet)

        # Translation here?
        tweet_analysis = {} # Build analysis dictionary

        # Language Feature Analysis
        language_features = {}
        language_features['polarity'] = \
                tweet_analyzer.analyzeFeatureSentimentPolarity()
        language_features['subjectivity'] = \
                tweet_analyzer.analyzeFeatureSentimentSubjectivity()
        language_features['detected_language'] = \
                tweet_analyzer.analyzeFeatureDetectedLanguage()
        language_features['english'] = \
                tweet_analyzer.analyzeFeatureEnglishTranslation()
        language_features['ironic'] = \
                tweet_analyzer.analyzeFeatureIrony()

        # Emoji Analysis
        emojis = {}
        emojis['text'] = tweet_analyzer.analyzeEmojiText()
        emojis['emoji_sentiment'] = tweet_analyzer.analyzeEmojiSentiment()

        # Topic Analysis
        topics = {}
        topics['mention_immigration'] = tweet_analyzer.analyzeTopicImmigration()
        topics['mention_gun_control'] = tweet_analyzer.analyzeTopicGunControl()
        topics['unemployment'] = tweet_analyzer.analyzeTopicUnemployment()
        topics['democratic_indicator'] = tweet_analyzer.analyzeTopicDemocrat()
        topics['repulican_indicator'] = tweet_analyzer.analyzeTopicRepublican()

        tweet_analysis = {}
        tweet_analysis['language_features'] = language_features
        tweet_analysis['emojis'] = emojis
        tweet_analysis['topics'] = topics

        self.tagged_tweet['analysis'] = tweet_analysis

    def getJSONTaggedTweet(self):
        '''Returns Graph API Compatible JSON Object'''
        return json.dumps(self.tagged_tweet)

