# tweetAnalyzer.py

from textblob import TextBlob
#from textblob.sentiments import NaiveBayesAnalyzer  # Sentiment
from textblob.taggers import NLTKTagger
nltk_tagger = NLTKTagger()                          # POS Tagging

class tweetAnalyzer:
    'Tweet analysis functions.'

    def __init__(self, tweet_text):

        #blob = TextBlob(tweet_text,
        #        analyzer=NaiveBayesAnalyzer(),
        #        pos_tagger=nltk_tagger)
        blob = TextBlob(tweet_text) # PatternAnalyzer default
        # employment, work and unhappy, jobs. fired, laid off

        self.sentiment = blob.sentiment
        self.pos_tags = blob.pos_tags
        self.language = blob.detect_language()

    def analyzeSentiment(self):
        '''sentiment is the "mood" of the tweet'''
        sentiment_dict = {}

        sentiment_dict["polarity"] = self.sentiment.polarity
        sentiment_dict["subjectivity"] = self.sentiment.subjectivity

        return sentiment_dict

    def analyzePOS(self):
        '''NLTK POS Tagging'''
        return self.pos_tags

    def analyzeLanguage(self):
        '''Google Translate detected language'''
        return self.language

    def analyzeEmoji(self):
        '''Polarity is an indication of conflicting emoji and sentiment'''
        # Regex shit
        # emoji sentiment add/minus

        emoji_sentiment = "positive"

        return emoji_sentiment

    def analyzeIrony(self):
        '''Polarity is an indication of conflicting emoji and sentiment'''

        emoji_sentiment = self.analyzeEmoji()
        sentiment = self.sentiment

        # if conflicting sentiment and emoji sentiment
        if (emoji_sentiment == "positive" and sentiment[0] == "negative")\
                or (emoji_sentiment == "negative" and sentiment[0] == "positive"):
            is_ironic = True
        else:
            is_ironic = False

        return is_ironic

    def analyzeUnemployment(self):
        '''Unemployment is calculated from topics/sentiments and keywords'''
        # Regex shit
        is_unemployed = True

        return is_unemployed

    def analyzePoliticalAlignment(self):
        '''Political alignment is either democratic or republican'''
        
        political_alignment = "democratic"

        return political_alignment

