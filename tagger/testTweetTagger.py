from tweetTagger import tweetTagger

# Test tweet
raw_tweet = {
    'geo': {
        'coordinates': [29.7747249, -98.7348346],
        'type': 'Point'
    },
    'id_str': '595850246434988032',
    'text': '@mayhemmiller Fuck you man. I fucking hate you!',
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
        'hashtags': [{'indices': [0, 7], 'text': 'Retail'}, {'indices': [8, 12], 'text': 'Job'}, {'indices': [16, 27], 'text': 'SanAntonio'}, {'indices': [115, 120], 'text': 'LEGO'}, {'indices': [121, 126], 'text': 'Jobs'}, {'indices': [127, 134], 'text': 'Hiring'}]
    },
    'lang': 'en'
}

# Initialize tweetTagger
tweet_tag = tweetTagger(raw_tweet)

# Grab tagged JSON tweet
tagged_json_tweet = tweet_tag.getJSONTaggedTweet()

# Print tagged JSON tweet
print(tagged_json_tweet)
