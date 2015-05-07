from tweetTagger import tweetTagger

# Test tweet
raw_tweet = {
    'in_reply_to_user_id_str':None,
    'user':{
        'location':'Yuma,Az',
        'profile_use_background_image':True,
        'description':'Not for the money , not for the fame \nbut for the love oғ тнe gaмe ❤️',
        'default_profile':False,
        'protected':False,
        'following':None,
        'utc_offset':None,
        'profile_link_color':'FBF9F9',
        'created_at':'Sat Jan 19 07:03:53 +0000 2013',
        'statuses_count':5925,
        'profile_image_url':'http://pbs.twimg.com/profile_images/470613132772012032/x2mkj2jC_normal.jpeg',
        'profile_sidebar_border_color':'F1F2E8',
        'lang':'en',
        'profile_background_tile':False,
        'geo_enabled':True,
        'name':'Sally Gastelo',
        'friends_count':340,
        'listed_count':1,
        'default_profile_image':False,
        'verified':False,
        'profile_background_color':'569FD2',
        'follow_request_sent':None,
        'id':1103026982,
        'favourites_count':2656,
        'profile_text_color':'96B949',
        'followers_count':384,
        'profile_banner_url':'https://pbs.twimg.com/profile_banners/1103026982/1398918676',
        'is_translator':False,
        'url':None,
        'id_str':'1103026982',
        'profile_background_image_url_https':'https://pbs.twimg.com/profile_background_images/792019976/eba09e98f73bee2416dd260402178416.jpeg',
        'contributors_enabled':False,
        'screen_name':'Sally_girl1',
        'profile_sidebar_fill_color':'F1F2E8',
        'notifications':None,
        'profile_background_image_url':'http://pbs.twimg.com/profile_background_images/792019976/eba09e98f73bee2416dd260402178416.jpeg',
        'time_zone':None,
        'profile_image_url_https':'https://pbs.twimg.com/profile_images/470613132772012032/x2mkj2jC_normal.jpeg'
    },
    'id_str':'596192627998863360',
    'created_at':'Thu May 07 05:59:33 +0000 2015',
    'lang':'en',
    'timestamp_ms':'1430978373895',
    'in_reply_to_status_id':None,
    'in_reply_to_user_id':None,
    'possibly_sensitive':False,
    'place':None,
    'retweet_count':0,
    'geo':None,
    'id':596192627998863360,
    'entities':{
        'symbols':[

        ],
        'urls':[

        ],
        'user_mentions':[

        ],
        'trends':[

        ],
        'hashtags':[

        ]
    },
    'retweeted':False,
    'text':'What I miss most about basketball is handling the ball.Scoring through traffic,getting through the press,or getting the assist! Ah, miss it',
    'source':'<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
    'truncated':False,
    'coordinates':None,
    'contributors':None,
    'filter_level':'low',
    'in_reply_to_screen_name':None,
    'in_reply_to_status_id_str':None,
    'favorite_count':0,
    'favorited':False
}

# Initialize tweetTagger
tweet_tag = tweetTagger(raw_tweet)

# Grab tagged JSON tweet
tagged_json_tweet = tweet_tag.getJSONTaggedTweet()

# Print tagged JSON tweet
print(tagged_json_tweet)
