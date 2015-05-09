# tweetAnalyzer.py

from textblob import TextBlob
#from textblob.sentiments import NaiveBayesAnalyzer  # Sentiment
from .categoryParser import CategoryParser

positive_emoji = []
negative_emoji = []

immigration_words = ['visa']
immigration_topics = []

gun_control_words = []
gun_control_topics = []

unemployment_words = []
unemployment_topics = ['unemployed', 'fired', 'laidoff']

democratic_words = []
democratic_topics = ['obama']

republican_words = []
republican_topics = []

class tweetAnalyzer:
    '''Tweet analysis functions.'''

    def __init__(self, raw_tweet):
        '''Initialization. textblob analysis done here'''
        self.raw_tweet = raw_tweet
        self.blob = TextBlob(raw_tweet['text']) # PatternAnalyzer default

        # Store normalized hashtags since we're gonna search this alot
        hashtags_list = []
        for topic in self.raw_tweet['entities']['hashtags']:
            hashtags_list.append(topic['text'].lower())
        self.hashtags = set(hashtags_list)

        # Store normalized words
        words_list = []
        self.words = set(words_list)

        # Store emoji
        self.emojis = []

        # Get 
        cp = CategoryParser()

    def analyzeFeatureSentimentPolarity(self):
        '''sentiment polarity is the "mood" of the tweet'''
        return self.blob.sentiment.polarity

    def analyzeFeatureSentimentSubjectivity(self):
        '''sentiment subjectivity'''
        return self.blob.sentiment.subjectivity

    def analyzeFeatureDetectedLanguage(self):
        '''detected language. Just grabbed from raw tweet since
         Twitter already does MT on it...'''
        if 'lang' in self.raw_tweet:
            return self.raw_tweet['lang']
        else:
            return None

    def analyzeFeatureEnglishTranslation(self):
        '''Translate to English if not English'''
        language = self.analyzeFeatureDetectedLanguage()

        if language != 'en': 
            # Translate if not English
            translation = "N/A"
        else:
            translation = ""
        return translation

    def analyzeFeatureIrony(self):
        '''Polarity is an indication of conflicting emoji and sentiment'''
        emoji_sentiment = self.analyzeEmojiSentiment()
        polarity = self.analyzeFeatureSentimentPolarity()

        # if conflicting sentiment and emoji sentiment
        if (emoji_sentiment == "happy" and polarity < 0)\
                or (emoji_sentiment == "sad" and polarity > 0):
            is_ironic = True
        else:
            is_ironic = False

        return is_ironic

    def analyzeEmojiText(self):
        '''Emoji's used in tweet'''

        # emoji analysis
        # Tokenize, identify emoji
        #'/[\x{1F600}-\x{1F64F}]/u'
        # Add positive, subtract negative emoji
        text = ":):("
        return text

    def analyzeEmojiSentiment(self):
        '''Emoji Sentiment: happy, neutral, sad'''
        positive_emoji_count = 0
        negative_emoji_count = 0

        # Tally pos/neg emojis
        for emoji in self.emojis:
            if emoji in positive_emoji:
                positive_emoji_count += 1
            if emoji in negative_emoji:
                negative_emoji_count += 1

        # Calculate pos/neg surplus/deficit
        emoji_rating = positive_emoji_count - negative_emoji_count

        if emoji_rating > 0:
            return "happy"
        elif emoji_rating < 0:
            return "negative"
        else:
            return "neutral"

    def analyzeTopicImmigration(self):
        '''Check if immegration mentioned'''
        return self.hasWords(immigration_words) or \
                self.hasTopics(immigration_topics)

    def analyzeTopicGunControl(self):
        '''Check if gun control mentioned'''
        return self.hasWords(gun_control_words) or \
                self.hasTopics(gun_control_topics)

    def analyzeTopicUnemployment(self):
        '''Unemployment is calculated from topics/sentiments and keywords'''
        return self.hasWords(unemployment_words) or \
                self.hasTopics(unemployment_topics)

    def analyzeTopicDemocrat(self):
        '''Analyze if tweet mentions democratic party'''
        return self.hasWords(democratic_words) or \
                self.hasTopics(democratic_topics)

    def analyzeTopicRepublican(self):
        '''Analyze if tweet mentions republican party'''
        return self.hasWords(republican_words) or \
                self.hasTopics(republican_topics)

    # Private methods
    def hasTopics(self, topics):
        '''Checks if tweet has any hashtags in the given list''' 
        return bool(self.hashtags & set(topics))

    def hasWords(self, words):
        '''Checks if tweet has any words in the given list'''
        return bool(self.words & set(words))

