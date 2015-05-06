from tweetTagger import tweetTagger

# Test tweet
raw_tweet = {
    'geo': {
        'coordinates': [29.7747249, -98.7348346],
        'type': 'Point'
    },
    'id_str': '595850246434988032',
    'text': '@mayhemmiller Why in the hell are You Soo Beautiful!!!???? Love you Always!!',
    'metadata': {
        'iso_language_code': 'en',
        'result_type': 'recent'
    },
    'id': 595850246434988032,
    'entities': {
        'urls': [],
        'symbols': [],
        'user_mentions': 
            [{
                'screen_name': 'mayhemmiller',
                'id_str': '16553826',
                'name': 'MAYHEM',
                'indices': [0, 13],
                'id': 16553826
            }],
        'hashtags': []
    },
    'lang': 'en'
}

# Initialize tweetTagger
tweet_tag = tweetTagger(raw_tweet)

# Grab tagged JSON tweet
tagged_json_tweet = tweet_tag.getJSONTaggedTweet()

# Print tagged JSON tweet
print(tagged_json_tweet)
