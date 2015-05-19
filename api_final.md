## Analysis API For San Antonio Texas
This API provides an interface through which users can query certain attributes about the people of San Antonio Texas to discover changing feelings on certain topics. 

###TABLE OF CONTENT
-------------------
1. [Topic](#topic)
  1. [Get General Information About A Topic](#topic-general)
  2. [Get Information About Topic Trends](#topic-trends)
  3. [Get Information About Extreme Topic Backers](#topic-extremes)
  4. [Get Information About Topic Locations](#topic-locations)
  5. [Get Information About Topic Affluence](#topic-affluence)
2. [Location](#location)
  1. [Get General Information about Locations' Sentiment](#location-general)
  2. [Get information about a particular area](#location-sentiment)
  3. [Get location of Twitter Users within San Antonio](#location-users)
3. [Hashtag](#hashtag)
  1. [Return information about a particular hashtag](#hashtag-single)
  2. [Return the ten most popular hashtags](#hashtag-popular)
  3. [Return hashtags associated to a topic](#hashtag-topic)
  4. [Return sentiment of a hashtag](#hashtag-sentiment) 
4. [Social Network](#social)
  1. [Provide general information about the social graph](#social-users)
  2. [Ask about a user](#social-user)
  3. [Get Twitter Users for various demographic attributes](#social-demographics)
  4. [Ask about the users particular friends](#social-friends)
  5. [Ask about the top 10 affluent twitter users in the region](#social-affluence)
  6. [Ask about outward connectivity of twitter users](#social-outward)
  7. [Ask about Top 10 Retweeted Tweets](#social-retweet)
5. [Emoji](#emoji)
  1. [Get general information about emoji usage](#emoji-summary)
  2. [Get emoji heatmap](#emoji-heatmap)
  3. [Get emoji affluence](#emoji-affluence)
6. [Tweet Data Structure](#tweet)

### <a name="topic"></a>Topic Queries
This api endpoint provides information about one of the three chosen topics we are investigating in San Antonio

#### Topics
- Gun Control
- Immigration
- Unemployment

#### <a name="topic-general"></a>Get General Information About A Topic 
```http
GET /topics/:topic
```
###### Input Params
```json
{
    "demographic_markers":{
        "politcal_leaning":"",
        "language":"",
        "visitor":true
    },
    "date_range":{
      "start_date":"21/01/2015",
      "end_date":"02/03/2015"
    }
}
```

#### Demographic Markers - (Optional)
Political Leaning is one of:
- "democratic"
- "republican"

Language is a two character language code, i.e. "en","ch","gb"

#### Output
```json
{
    "topic": "ALSKDJASL",
    "polarity":"0.9",
    "subjectivity":"0.4",
    "most_popular_language":"gb",
    "least_popular_language":"en",
    "count": 1921
}
```


### <a name="topic-trends"></a> Get Information About Topic Trends 
```http
GET /topics/:topic/trend
```

###### Input Params
```json
{
    "demographic_markers":{
        "politcal_leaning":"",
        "language":"",
        "visitor":true
    },
   "date_range":{
      "start_date":"21/01/2015",
      "end_date":"02/03/2015"
    },
    "granularity":"level"
}
```

###### Granularity
One of:
- hourly 
- daily
- weekly
- monthly
- yearly

#### Demographic Markers - (Optional)
Political Leaning is one of:
- "democratic"
- "republican"

Language is a two character language code, i.e. "en","ch","gb"

#### Output
```json
{
    "topic": "ALSKDJASL",
    "trend":"stable",
    "time_periods":[
      {
        "start":"21/01/2015",
        "end":"21/02/2015",
        "count":"100",
        "polarity": 0.9,
        "subjectivity": 0.2
      }
    ]
}
```

#### Trend
One of:
- "increasing"
- "decreasing"
- "stable"

### <a name="topic-extremes"></a>Get Information About Extreme Topic Backers 
```http
GET /topics/:topic/extremes
```
###### Input Params
```json
{
    "date_range":{
      "start_date":"21/01/2015",
      "end_date":"02/03/2015"
    }
}
```

#### Output
```json
{
    "topic": "ALSKDJASL",
    "greatest_supporter":{
        "name":"mat",
        "username":"matthefantastic",
        "id":"aslkdjaslkdj",
        "basic_stats":{
          "number_of_tweets":"3",
          "num_followers":"2",
          "talker":true,
          "degree_of_connectivity":"12"
        },
        "sentiment":{
          "average_sentiment":"2",
          "average_subjectivity":"3",
        },
        "demographic":{
            "politcal_leaning":"",
            "languages":["",""],
            "prefered_languge":"en",
            "visitor":true
        }
      },
    "greatest_detract":{
          //As above
      }
    },
    "maximum_distance":"9",
    "shortest_distance":"3",
    "shortest_path":{
      "0":{
          "user_id":"Name",
          "name":"mat"
        },
        "1":{
          "user_id":"ASLKD",
          "name":"john"
        }
    }
}
```

### <a name="topic-location"></a>Get Information About Topic Locations
```http
GET /topics/:topic/locations
```

#### Output
List of Points with Sentiment Informations
```json
[{"geo": {"lat": 12.12321, 
          "lng": 13.12312},
  "polarity": 0.5,
  "subjectivity": 0.2,
  "mood": "happy"
}]
```

### <a name="topic-affluence"></a>Get Information About Topic Affluence
```http
GET /topics/:topic/affluence
```

#### Output
```json
{
  "insider": {
    "count": 1283, //counts how many tweets were mentioned within the search radius. 
    "avg_polarity": 0.5, 
    "avg_subjectivity": 0.2,
    "mood": "happy" 
  },
  "outsider": {
    "count": 1000000000,
    "avg_polarity": -0.2,
    "avg_subjectivity": 0,
    "mood": "sad"
  },
  "outreach_nodes": {
    "count": 29, //counts how many insider tweets were retweeted.
    "avg_spread": 10000, //counts on average how many people retweeted the insider tweet. 
    "avg_polarity": 1,
    "avg_subjectivity": 0
  }
}
```

NOTE: Insider refers to users within the search radius, while outsiders refer to users that have been connected via tweets outside the search radius. 

---------

### <a name="location"></a>Location Queries
##### <a name="location-general"></a>Get General Information about Locations' Sentiment
```http
GET /locations
```

#### Input
```json
{
    "date":"21/01/2015",
    "demographic_markers":{
        "politcal_leaning":"",
        "language":"",
        "mood": "sad",
        "visitor":true
    },
    "period":"1:00pm - 2:00pm" //(optional)
}
```

#### Mood (Optional)
One of:
- "happy"
- "sad"

#### Demographic Markers - (Optional)
Political Leaning is one of:

- "democratic"
- "republican"

Language is a two character language code, i.e. "en","ch","gb"

#### Output
```json
{
    "date":"21/01/2015",
    "period":"1:00pm - 2:00pm", //(optional)
    "locations":[{
        "point":{
            "lat": 27.10230129, 
            "lng": 82.12039120        
        },
        "sentiment":{
            "polarity":"0.1",
            "subjectivity":"0.2"
        }
    }]
}
```

##### <a name="location-sentiment"></a>Get information about a particular area

```http
GET /location/sentiment
```
#### Input
```json
{
    "range":{ //(optional)
      "start_date":"21/01/2015",
      "end_date":"03/02/2015"
    },

    "period":"1:00pm - 2:00pm", //(optional)

    "deomographic_markers":{
        "politcal_leaning":"",
        "language":"",
        "visitor":true
    }
    "location"[{"lat":"123","long":"123"},{"lat":"23","long":"123"}]
}
```

#### Demographic Markers - (Optional)
Political Leaning is one of:
- "democratic"
- "republican"

Language is a two character language code, i.e. "en","ch","gb"

#### Output
```json
{
    "start_date":"21/01/2015",
    "end_date":"03/02/2015",
    "location":[{"lat":"123","lng":"123"},
                {"lat":"123","lng":"123"}],
    "period":"1:00pm - 2:00pm", //(optional)
    "sentiment":{
        "polarities":{
            "0.1":"10",
            "0.2":"20"
        },
        "subjectivity":{
            "0.1":"10",
            "0.2":"20"
        }
    }
}
```

##### <a name="location-users"></a> Get location of Twitter Users within San Antonio
```http
GET /location/users
```

#### Output
```json
{[
  {"lat": 12.12312,
   "lng": 21.29123},
  {"lat": 92.12312,
   "lng": 82.12312}
]}
```

### <a name="hashtag"></a>Hashtag Queries
#####<a name="hashtag-single"></a>Return information about a particular hashtag

```http
GET /hashtags/stats/:tag
```

#### Input
```json
{
    "deomographic_markers":{
        "politcal_leaning":"",
        "language":"",
        "visitor":true
    }
}
```

#### Demographic Markers - (Optional)
Political Leaning is one of:
- "democratic"
- "republican"

Language is a two character language code, i.e. "en","ch","gb"

#### Output
```json
{
    "text":"yolo",
    "polarity":"0.9",
    "subjectivity":"0.1",
    "popularity":"10%",
    "most_popular_language":"gb",
    "least_popular_language":"en"
}
```

#### Trending Hashtags
#####<a name="hashtag-popular"></a>Returns the ten most popular hash tags.
Note: Popularity is simply determined by number of hashtag mentions.
```http
GET /hashtags/trending
```

#### Input
```json
{
    "demographic_markers":{
        "politcal_leaning":"",
        "language":"",
        "visitor":true
    },
    "mood": "happy",
    "time_range": {
      "since": "15/4/2015",
      "until": "20/4/2015"
    },
    "granularity": "hourly"
}
```

#### Demographic Markers - (Optional)
Political Leaning is one of:
- "democratic"
- "republican"

Language is a two character language code, i.e. "en","ch","gb"

#### Mood (Optional)
One of:
- "happy"
- "sad"

###### Granularity (Optional)
One of:
- hourly  
- daily (DEFAULT) 
- weekly
- monthly
- yearly

#### Output
```json
{
  "0": {"datetime": "UTCTime",
          "trending":{
              "0":{
                  "text":"ILoveHaskell",
                  "polarity":"0.9",
                  "subjectivity":"0.1"
              },
              "1":{
                  "text":"HaskellSucksMonkeyBalls",
                  "polarity":"0.9",
                  "subjectivity":"0.1"
              } //10 of these for each period.
          }
      },
  "1": {"datetime": "UTCTime",
          "trending":{
              "0":{
                  "text":"TechiesBOOM",
                  "polarity":"0.9",
                  "subjectivity":"0.1"
              },
              "1":{
                  "text":"PudgeHook",
                  "polarity":"-1",
                  "subjectivity":"1"
              } //10 of these for each period.
          }

      }
}
```

#####<a name="hashtag-topic"></a> Return Top 10 Hashtags mentioned for topics 
```http
GET /hashtag/topics
```

#### Output
```json
{
  "gun_control": {
    "hashtags": [
      "#donkeys",
      "#obamasux",
      "#iloveguns" //Maximum Limit of 10
    ]
  },
  "immigration": {
    "hashtags": [
      "#MoreAsiansPlox"
    ]
  },
  "unemployment": {
    "hashtags": [
      "#foodstamps",
      "#LifeSux"
    ]
  }
}
```


#####<a name="hashtag-sentiment"></a> Return sentiment of a hashtag
```http
GET /hashtag/:hashtag/sentiment
```

#### Output
```json
{
  "hashtag":"pikachurox",
  "avg_polarity":"0.9",
  "avg_subjectivity":"0.1",
  "count": 12312, //tag instances
}
```

----------------------------------
### <a name="social"></a>Social Network Queries
#####<a name="social-users"></a>Provide general information about the social graph
```http
GET /users
```

#### Output
```json
{
    "date":"21/01/2015",
    "time":"12:39PM",
    "activity":"12",
    "connectivity":"12"
}
```

#####<a name="social-user"></a> Ask about a user
Provide general information about the social graph
```http
GET /users/:user_id
```

#### Output
```json
{
    "name":"mat",
    "username":"matthefantastic",
    "basic_stats":{
      "number_of_tweets":"3",
      "num_followers":"2",
      "talker":true,
      "degree_of_connectivity":"12"
    },
    "sentiment":{
      "average_polarity":"2",
      "average_subjectivity":"3",
    },
    "demographic":{
        "politcal_leaning":"",
        "languages":["",""],
        "prefered_languge":"en",
        "visitor":true
    }
}
```

#####<a name="social-demographics"></a> Get Number of Twitter Users for various demographic attributes.
```http
GET /users/demographics
```
##### Input Params
```json
{
    "politcal_leaning":"democratic", //OPTIONAL
    "language":"zh", //OPTIONAL
    "visitor": true, //OPTIONAL
    "mood": "sad" //OPTIONAL
}
```
Note: If all attributes are empty, simply return the total number of twitter users. 

##### Output Params
```json
{
    "number_of_matching_users": 1278,
    "time": "UTCTime"
}
```

##### <a name="social-friends"></a> Ask about the users particular friends
Provide general information about the social graph
```http
GET /users/:user_id/connections?degree=1
```
#### Output
```json
{
    "date":"21/01/2015",
    "time":"12:39PM",
    "user":"user_id",
    "connections":{
      "1":[{
          "user":{
            "name":"asdkljalskdja",
            "user_id":"1",
            "num_connections":"1"
          },
          "demographic":{

            },
          "subjectivty":"0.9",
          "sentiment":"0.1"
      }],
      "2":[{
          "user":{
            "name":"asdkljalskdja",
            "user_id":"1",
            "num_connections":"1"
          },
          "demographic":{

          },
          "subjectivty":"0.9",
          "sentiment":"0.1"
      }]
    },
    "num_connections":"1",
    "degree_of_connectivity":"12"
}
```

##### <a name="social-affluence"></a> Ask about the top 10 affluent twitter users in the region (ie. highest follower count)
```http
GET /users/affluent
```

##### Input
```json
{
    "politcal_leaning":"democratic", //OPTIONAL
    "language":"zh", //OPTIONAL
    "visitor": true, //OPTIONAL
}
```

##### Output
``` json
{
  "0": {//DEFAULT Twitter User Object
  },
  "1": {//DEFAULT Twitter User Object
  }
}
```

#####<a name="social-retweet"></a> Ask about outward engagement summary of twitter users in San Antonio
We want to figure out how engaging are tweets tweeted by SA residents and their perception by Twitter Users that do not reside in San Antonio. 
```http
GET /social/outward
```

#### Output
```json
{
  "avg_engagement_count": 12, //of the origin tweet
  "engagement_sentiment": { //of all responding tweets to the origin tweet
    "avg_polarity": 0.212312,
    "avg_subjectivity": 0.501021
  },
  "origin_sentiment": { //of all origin tweets that gained engagement
    "avg_polarity": -0.912312,
    "avg_subjectivity": 1
  },
  "origin_user_stat": {
    "followers_count": {
      "lq": 21,
      "median": 30,
      "uq": 40,
      "mean": 34
    },
    "locations": [
      {"lat": 12.1231232, "lng": 13.1231221}
    ] // list of all engaged tweets from SA. 
  },
  "outward_user_stat": {
    "followers_count": {
      "lq": 100,
      "median": 150,
      "uq": 200,
      "mean": 101
    }
  }
}
```

#####<a name="social-retweet"></a> Ask about highest retweets
```http
GET /social/retweets
```

```json
{
  "0": { // 0 ~ 10 Retweets
    "tweet": {
      "hashtags": [
        "#iloveguns",
        "#standyourground",
        "#saynotosmugglers"
      ],
      "topic_mentions": [
        "gun_control",
        "immigration"
      ],
      "polarity": 0.5,
      "subjectivity": 1,
      "demographic":{
        "politcal_leaning":"",
        "languages":["",""],
        "prefered_languge":"en",
        "visitor":true
      }
    }
  }
}
```

-----------------

### <a name="emoji"></a> Emoji Queries
#####<a name="emoji-summary></a>Get General Information about Emoji Usage
```http
GET /emoji/general
```

#### Output
```json
{
  "0": { //Top 10 is sufficient.
    "emoji": "☺️",
    "count": 1000,
    "avg_subjectivity": 0.5,
    "avg_polarity": 0.2,
    "irony_detected": 20
  }, 
  "1": {
    "emoji": "😡",
    "count": 500,
    "avg_subjectivity": 0.5,
    "avg_polarity": -0.9,
    "irony_detected": 50
  },
  ...
}
```

#####<a name="emoji-heatmap"></a> Get Emoji used locations
```http
GET /emoji/:emoji_code/locations
```

#### Output
```json
{[
  {"lat": 12.123123,
   "lng": 23.231232
  },
  {"lat": 12.32112,
   "lng": 29.12312
  },
  ...
]} 
```

#####<a name="emoji-affluence"></a> Get Emoji affluence
```http
GET /emoji/:emoji_code/affluence
```

#### Output
```json
{
  "emoji": "😡",
  "insider": {
    "count": 1283, //counts how many tweets were mentioned within the search radius. 
    "avg_polarity": 0.5, 
    "avg_subjectivity": 0.2,
    "mood": "happy" 
  },
  "outsider": {
    "count": 1000000000,
    "avg_polarity": -0.2,
    "avg_subjectivity": 0,
    "mood": "sad"
  },
  "outreach_nodes": {
    "count": 29, //counts how many insider tweets were retweeted.
    "avg_spread": 10000, //counts on average how many people retweeted the insider tweet. 
    "avg_polarity": 1,
    "avg_subjectivity": 0
  }
}
```

### Tweet Data Structure
```json
{
  "id": "1239812093801298421",
  "metadata": {
    "result_type": "recent",
    "iso_language_code": "ar"
  },
  "user_mentions": [
    {
      "id": "123123123",
      "name": "Mat",
      "screen_name": "alskdjaslkdjlaksjd"
    }
  ],
  "symbols": [],
  "hashtags": [
    "content"
  ],
  "urls": [],
  "text": "blahlsdhalskdjalskdja sdlkajs dlkasj dlaksjd laskjd aslkdj",
  "lang": "en",
  "geo": {
    "type": "point",
    "coordinates": [
      "23.123123",
      "12.1231"
    ]
  },
  "analysis": {
    "language_features": {
      "polarity": "0.6",
      "subjectivity": "0.9",
      "detected_language": "en",
      "english": "alksdjalskdjlaksjd",
      "ironic" : true
    },
    "emojis": {
      "text": ":):(",
      "emoji_sentiment": "happy"
    },
    "topics": {
      "meniton_immigration": true,
      "mentions_gun_controler": true,
      "unemployment":true,
      "democratic_indicator": true,
      "repulbican_indicator":true
    }
  }
}
```

### <a name="tweet"></a>Updated! Tweet Data Structure
```json
{
  "id": "1239812093801298421",
  "user": {
    "id": "134212421343214",
    "screen_name": "Blaine"
  },
  "metadata": {
    "result_type": "recent",
    "iso_language_code": "ar"
  },
  "user_mentions": [
    {
      "id": "123123123",
      "name": "Mat",
      "screen_name": "alskdjaslkdjlaksjd"
    }
  ],
  "symbols": [],
  "hashtags": [
    "content"
  ],
  "urls": [],
  "text": "blahlsdhalskdjalskdja sdlkajs dlkasj dlaksjd laskjd aslkdj",
  "lang": "en",
  "geo": {
    "type": "point",
    "coordinates": [
      "23.123123",
      "12.1231"
    ]
  },
  "retweeted": true,
  "analysis": {
    "language_features": {
      "polarity": "0.6",
      "subjectivity": "0.9",
      "detected_language": "en",
      "english": "alksdjalskdjlaksjd",
      "ironic" : true
    },
    "emojis": {
      "text": ":):(",
      "emoji_sentiment": "happy"
    },
    "topics": {
      "meniton_immigration": true,
      "mentions_gun_controler": true,
      "unemployment":true,
      "democratic_indicator": true,
      "repulbican_indicator":true
    }
  }

}
```
