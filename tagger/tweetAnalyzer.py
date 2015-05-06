# tweetAnalyzer.py

from textblob import TextBlob
#from textblob.sentiments import NaiveBayesAnalyzer  # Sentiment

class tweetAnalyzer:
    '''Tweet analysis functions.'''

    def __init__(self, raw_tweet):
        '''Initialization. textblob analysis done here'''
        #blob = TextBlob(tweet_text,
        #        analyzer=NaiveBayesAnalyzer())
        tweet_text = raw_tweet['text']
        blob = TextBlob(tweet_text) # PatternAnalyzer default

        self.sentiment = blob.sentiment
        self.language = blob.detect_language()

    def analyzeFeatureSentimentPolarity(self):
        '''sentiment polarity is the "mood" of the tweet'''
        return self.sentiment.polarity

    def analyzeFeatureSentimentSubjectivity(self):
        '''sentiment subjectivity'''
        return self.sentiment.subjectivity

    def analyzeFeatureDetectedLanguage(self):
        '''Google Translate detected language'''
        return self.language

    def analyzeFeatureEnglishTranslation(self):
        '''Translate to English if not English'''
        translation = "This is in English"
        return translation

    def analyzeFeatureIrony(self):
        '''Polarity is an indication of conflicting emoji and sentiment'''
        emoji_sentiment = "positive"
        sentiment = self.sentiment

        # if conflicting sentiment and emoji sentiment
        if (emoji_sentiment == "happy" and sentiment[0] == "sad")\
                or (emoji_sentiment == "sad" and sentiment[0] == "happy"):
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
        # Regex shit
        # emoji sentiment add/minus
        emoji_sentiment = "positive"
        return emoji_sentiment

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
        # Regex shit
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
