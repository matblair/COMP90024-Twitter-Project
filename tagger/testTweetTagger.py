from tweetTagger import tweetTagger

# Test tweet
raw_tweet = {
    'id': 11432254,
    'text': 'Yay I am happy about Hello world'
}

# Initialize tweetTagger
tweet_tag = tweetTagger(raw_tweet)

# Grab tagged JSON tweet
tagged_json_tweet = tweet_tag.getJSONTaggedTweet()

# Print tagged JSON tweet
print(tagged_json_tweet)
