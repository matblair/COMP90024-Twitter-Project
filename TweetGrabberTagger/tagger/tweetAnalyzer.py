# tweetAnalyzer.py

from textblob import TextBlob
#from textblob.sentiments import NaiveBayesAnalyzer  # Sentiment
#from .categoryParser import CategoryParser

class tweetAnalyzer:
    '''Tweet analysis functions.'''

    def __init__(self, raw_tweet, categories):
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
        for word in self.blob.words:
            words_list.append(word.lower())
        self.words = set(words_list)

        # Get Data Categories 
        # categories = CategoryParser()

        # Emoji Categories
        self.emoji_categories = categories.getEmojiCategories()

        # Immigration Terms
        self.immigration_terms = \
                list(categories.getImmigrationCategories().keys())

        # Gun Control Terms
        self.gun_control_terms = \
                list(categories.getGunControlCategories().keys())

        # Unemployment Terms
        self.unemployment_terms = \
                list(categories.getUnemploymentCategories().keys())

        # Democratic Terms
        self.democratic_terms = \
                list(categories.getDemocraticCategories().keys())

        # Republican Terms
        self.republican_terms = \
                list(categories.getRepublicanCategories().keys())

        # Emoji Parsing
        self.emoji_text = ""
        self.emoji_rating = 0

        # Tally pos/neg emojis
        for character in self.raw_tweet['text']:
            if character in self.emoji_categories:
                self.emoji_text += character # Append to emoji text
                if self.emoji_categories[character]['mood'] == 'happy':
                    self.emoji_rating += 1
                elif self.emoji_categories[character]['mood'] == 'sad':
                    self.emoji_rating -= 1

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
            # translation = self.blob.translate(to='en') # Translate to en
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
            return True
        else:
            return False

    def analyzeEmojiText(self):
        '''Emoji's used in tweet'''
        return self.emoji_text

    def analyzeEmojiSentiment(self):
        '''Emoji Sentiment: happy, neutral, sad'''
        # Return result based on rating
        if self.emoji_rating > 0:
            return "happy"
        elif self.emoji_rating < 0:
            return "sad"
        else:
            return "neutral"

    def analyzeTopicImmigration(self):
        '''Check if immegration mentioned'''
        return self.containsTerms(self.immigration_terms)

    def analyzeTopicGunControl(self):
        '''Check if gun control mentioned'''
        return self.containsTerms(self.gun_control_terms)

    def analyzeTopicUnemployment(self):
        '''Unemployment is calculated from topics/sentiments and keywords'''
        return self.containsTerms(self.unemployment_terms)

    def analyzeTopicDemocrat(self):
        '''Analyze if tweet mentions democratic party'''
        return self.containsTerms(self.democratic_terms)

    def analyzeTopicRepublican(self):
        '''Analyze if tweet mentions republican party'''
        return self.containsTerms(self.republican_terms)

    # Private methods
    def hasTopics(self, topics):
        '''Checks if tweet has any hashtags in the given list''' 
        return bool(self.hashtags & set(topics))

    def hasWords(self, words):
        '''Checks if tweet has any words in the given list'''
        return bool(self.words & set(words))

    def containsTerms(self, terms):
        '''Checks if terms are in either topics or words'''
        return bool(self.hasTopics(terms) or self.hasWords(terms))

