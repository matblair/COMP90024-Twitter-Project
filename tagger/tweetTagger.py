# tweetTagger.py

import json

from tweetAnalyzer import tweetAnalyzer

class tweetTagger:
    '''Tweet tagger. Adds tags on a tweet-by-tweet basis.
    Returned JSON Object conforms to Graph REST API.'''

    tagged_tweet = {} # Tweet with analysis tags
    
    def __init__(self, raw_tweet):
        '''Initialization. Grabs attributes from tweet and performs analysis'''
        self.grabAttributes(raw_tweet)      # Parse Tweet Attribs
        self.analyzeTweet(raw_tweet)        # Tag Analysis

    def grabAttributes(self, raw_tweet):
        '''Grabs attributes from raw tweet'''
        # Id
        self.tagged_tweet['id'] = raw_tweet['id_str']

        # Add metadata
        metadata = {}
        metadata['result_type'] = raw_tweet['metadata']['result_type']
        metadata['iso_language_code'] = \
                raw_tweet['metadata']['iso_language_code']
        self.tagged_tweet['metadata'] = metadata

        # Add mentioned users
        user_mentions = []
        for mentioned_user in raw_tweet['entities']['user_mentions']:
            user = {}
            user['id'] = mentioned_user['id_str']
            user['name'] = mentioned_user['name']
            user['screen_name'] = mentioned_user['screen_name']
            user_mentions.append(user)
        self.tagged_tweet['user_mentions'] = user_mentions

        # Symbols
        self.tagged_tweet['symbols'] = raw_tweet['entities']['symbols']

        # Hashtags
        self.tagged_tweet['hashtags'] = raw_tweet['entities']['hashtags']

        # URLs
        self.tagged_tweet['urls'] = raw_tweet['entities']['urls']

        # Text
        self.tagged_tweet['text'] = raw_tweet['text']

        # Lang
        self.tagged_tweet['lang'] = raw_tweet['lang']

        # Geo
        self.tagged_tweet['geo'] = raw_tweet['geo']

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

