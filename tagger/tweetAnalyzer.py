# tweetAnalyzer.py

from textblob import TextBlob
#from textblob.sentiments import NaiveBayesAnalyzer  # Sentiment

positive_emoji = []
negative_emoji = []

immigration_words = []
immigration_topics = []

gun_control_words = []
gun_control_topics = []

unemployment_words = []
unemployment_topics = ['unemployed', 'fired']

democratic_words = []
democratic_topics = []

republican_words = []
republican_topics = []

class tweetAnalyzer:
    '''Tweet analysis functions.'''

    def __init__(self, raw_tweet):
        '''Initialization. textblob analysis done here'''
        #blob = TextBlob(tweet_text,
        #        analyzer=NaiveBayesAnalyzer())
        self.raw_tweet = raw_tweet
        self.blob = TextBlob(raw_tweet['text']) # PatternAnalyzer default


        # emoji analysis
        # Tokenize, identify emoji
        #'/[\x{1F600}-\x{1F64F}]/u'
        # Add positive, subtract negative emoji
        

    def analyzeFeatureSentimentPolarity(self):
        '''sentiment polarity is the "mood" of the tweet'''
        return self.blob.sentiment.polarity

    def analyzeFeatureSentimentSubjectivity(self):
        '''sentiment subjectivity'''
        return self.blob.sentiment.subjectivity

    def analyzeFeatureDetectedLanguage(self):
        '''detected language. Just grabbed from raw tweet since
         Twitter already does MT on it...'''
        return self.raw_tweet['lang']

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
        text = ":):("
        return text

    def analyzeEmojiSentiment(self):
        '''Emoji Sentiment: happy, neutral, sad'''
        return "happy"

    def analyzeTopicImmigration(self):
        '''Check if immegration mentioned'''
        has_immigration = True
        return has_immigration

    def analyzeTopicGunControl(self):
        '''Check if gun control mentioned'''
        has_gun_control = True
        return has_gun_control 

    def analyzeTopicUnemployment(self):
        '''Unemployment is calculated from topics/sentiments and keywords'''
        # employment, work and unhappy, jobs. fired, laid off
        # Check if topic
        is_unemployed = True
        return is_unemployed

    def analyzeTopicDemocrat(self):
        '''Analyze if tweet mentions democratic party'''
        has_democratic = True
        return has_democratic

    def analyzeTopicRepublican(self):
        '''Analyze if tweet mentions republican party'''
        has_republican = True
        return has_republican

    # Private methods
    def getTopics(self):
        '''Gets Topics in raw tweet'''
        topic_list = []
        for topic in self.raw_tweet['entities']['hashtags']:
            topic_list.append(topic.text)
        return topic_list

    def hasTopics(self, topics):
        '''Checks if tweet has any hashtags in the topics list''' 
        return bool(set(self.getTopics()) & set(topics))

