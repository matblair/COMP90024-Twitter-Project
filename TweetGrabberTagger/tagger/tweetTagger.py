# tweetTagger.py

import json

from .tweetAnalyzer import tweetAnalyzer

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
        self.addField('id', raw_tweet)

        # Created at
        self.addField('created_at', raw_tweet)

        # Add metadata
        if 'metadata' in raw_tweet:
            metadata = {}
            metadata['result_type'] = raw_tweet['metadata']['result_type']
            metadata['iso_language_code'] = \
                    raw_tweet['metadata']['iso_language_code']
            self.tagged_tweet['metadata'] = metadata
        else:
            self.tagged_tweet['metadata'] = None

        # Add mentioned users
        if 'user_mentions' in raw_tweet:
            user_mentions = []
            for mentioned_user in raw_tweet['entities']['user_mentions']:
                user = {}
                user['id'] = mentioned_user['id_str']
                user['name'] = mentioned_user['name']
                user['screen_name'] = mentioned_user['screen_name']
                user_mentions.append(user)
            self.tagged_tweet['user_mentions'] = user_mentions
        else:
            self.tagged_tweet['user_mentions'] = None
            
        # Symbols
        self.addField('symbols', raw_tweet)

        # Hashtags
        if 'entities' in raw_tweet:
            hashtags = []
            for hashtag in raw_tweet['entities']['hashtags']:
                hashtags.append({'text': hashtag['text']})
            self.tagged_tweet['hashtags'] = hashtags
        else:
            self.tagged_tweet['hashtags'] = None

        # URLs
        self.addField('urls', raw_tweet)

        # Text
        self.addField('text', raw_tweet)

        # Lang
        self.addField('lang', raw_tweet)

        # Geo
        self.addField('geo', raw_tweet)

        # Retweeted
        self.addField('retweeted', raw_tweet)

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

    # Private Methods
    def addField(self, field, raw_tweet):
        '''Adds field if exists in raw_tweet'''
        if field in raw_tweet:
            self.tagged_tweet[field] = raw_tweet[field]
        else:
            self.tagged_tweet[field] = None
