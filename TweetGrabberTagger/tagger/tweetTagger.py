# tweetTagger.py

import json
import collections

from .tweetAnalyzer import tweetAnalyzer

nested_dict = lambda: collections.defaultdict(nested_dict)

class tweetTagger:
    '''Tweet tagger. Adds tags on a tweet-by-tweet basis.
    Returned JSON Object conforms to Graph REST API.'''

    # Tweet with analysis tags
    tagged_tweet = nested_dict()

    def __init__(self, raw_tweet, categories):
        '''Initialization. Grabs attributes from tweet and performs analysis'''
        self.grabAttributes(raw_tweet)              # Parse Tweet Attribs
        self.analyzeTweet(raw_tweet, categories)    # Tag Analysis

    def grabAttributes(self, raw_tweet):
        '''Grabs attributes from raw tweet'''
        # Created at
        self.addField('created_at', raw_tweet)

        # Id
        self.addField('id', raw_tweet)

        # Text
        self.addField('text', raw_tweet)

        # Truncated
        self.addField('truncated', raw_tweet)

        # In Reply
        self.addField('in_reply_to_status_id', raw_tweet)
        self.addField('in_reply_to_user_id', raw_tweet)
        self.addField('in_reply_to_screen_name', raw_tweet)
        
        # Add user
        user_fields = ['id', 'name', 'screen_name', 'location', 'url',\
                'description', 'protected', 'verified', 'followers_count',\
                'friends_count', 'listed_count', 'favourites_count',\
                'statuses_count', 'created_at', 'utc_offset',\
                'time_zone', 'geo_enabled', 'lang', 'is_translator']
        self.addSubField('user', user_fields, raw_tweet)

        # Geo
        self.addField('geo', raw_tweet)

        # Coordinates
        self.addField('coordinates', raw_tweet)
    
        # Retweet Count
        self.addField('retweet_count', raw_tweet)

        # Favourite Count
        self.addField('favourite_count', raw_tweet)

        # Entities, hashtags
        self.addEntityField('hashtags', ['text'], raw_tweet)

        # Entites, trends
        self.addEntityField('trends', True, raw_tweet)

        # Entities, urls
        self.addEntityField('urls', ['url', 'expanded_url'], raw_tweet)

        # Entities, user_mentions
        self.addEntityField('user_mentions',\
                ['id','name','screen_name'], raw_tweet)

        # Entities, symbols
        self.addEntityField('symbols', ['text'], raw_tweet)
        
        # Favourited
        self.addField('favourited', raw_tweet)

        # Retweeted
        self.addField('retweeted', raw_tweet)

        # Possibly Sensitive
        self.addField('possibly_sensitive', raw_tweet)

        # Filter Level
        self.addField('filter_level', raw_tweet)

        # Lang
        self.addField('lang', raw_tweet)

    def analyzeTweet(self, raw_tweet, categories):
        '''Analyzes and adds tags to tagged_tweet'''
        
        # Initialize tweet analysis
        tweet_analyzer = tweetAnalyzer(raw_tweet, categories)

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

    def getTaggedTweet(self):
        '''Return Dict of Tagged Tweet'''
        return self.tagged_tweet

    # Private Methods
    def addField(self, field, raw_tweet):
        '''Adds field if exists in raw_tweet'''
        if field in raw_tweet:
            self.tagged_tweet[field] = raw_tweet[field]
        else:
            self.tagged_tweet[field] = None

    def addSubField(self, field_category, fields, raw_tweet):
        for field in fields:
            if field in raw_tweet.get(field_category, {}):
                self.tagged_tweet[field_category][field] = \
                        raw_tweet[field_category][field]
            else:
                print("Missing Sub Field")
                self.tagged_tweet[field_category][field] = None

    def addEntityField(self, field_category, fields, raw_tweet):
        '''Adds entity field if exists'''
        new_array = []

        if field_category in raw_tweet.get('entities', {}):
            for item in raw_tweet['entities'][field_category]:
                new_dict = {}

                # Just take everything
                if fields == True:
                    new_dict = item
                else:
                    for field in fields:
                        if field in item:
                            new_dict[field] = item[field] 
                        else:
                            new_dict[field] = None

                new_array.append(new_dict)

            self.tagged_tweet['entities'][field_category] = new_array
        
        else:
            self.tagged_tweet['entities'][field_category] = None
                    
                
