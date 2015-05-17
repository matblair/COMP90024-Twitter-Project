## Analysis API For San Antonio Texas
This API provides an interface through which users can query certain attributes about the people of San Antonio Texas to discover changing feelings on certain topics. 

TABLE OF CONTENT
1. [Topic](#topic)

2. [Location](#location)

3. [Hashtag](#hashtag)

4. [Social Network](#social)

5. [Tweet Data Structure](#tweet)

### <a name="topic"></a>Topic Queries
This api endpoint provides information about one of the three chosen topics we are investigating in San Antonio

#### Topics
- Gun Control
- Immigration
- Unemployment

#### Get General Information About A Topic
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
    "popularity":"1000",
    "sentiment":"0.9",
    "subjectivity":"0.4",
    "most_popular_language":"gb",
    "least_popular_language":"en"
}
```


### Get Information About Topic Trends
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
    }
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
    "sentiment":"0.9",
    "time_periods":[
      {
        "start":"21/01/2015",
        "end":"21/02/2015",
        "popularity":"100",
        "trend":"stable"
      }
    ]
}
```

#### Trend
One of:
- "increasing"
- "decreasing"
- "stable"

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

---------

### <a name="location"></a>Location Queries
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
        "visitor":true
    },
    "period":"1:00pm - 2:00pm" //(optional)
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

##### Get information about a particular area

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
    "location":[{"lat":"123","long":"123"},{"lat":"123","long":"123"}],
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

##### Returns topic interests for a location. 
```http
GET /location/topics
```

#### Input
```json
{
  "start_date":"21/01/2015",
  "end_date":"03/02/2015",
  "location":[{"lat":"123","long":"123"},{"lat":"123","long":"123"}],
  "period":"1:00pm - 2:00pm" //(optional)
}
```

#### Output
```json

```


#####

### <a name="hashtag"></a>Hashtag Queries
Return information about a particular hashtag

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
    "sentiment":"0.9",
    "subjectivity":"0.1",
    "popularity":"10%",
    "most_popular_language":"gb",
    "least_popular_language":"en"
}
```

#### Trending Hashtags
Returns the ten most popular hash tags within the past hour.

```http
GET /hashtags/trending
```

#### Input
```json
{
    "deomographic_markers":{
        "politcal_leaning":"",
        "language":"",
        "visitor":true
    },
    "mood":"happy"
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

#### Output
```json
{
    "date":"21/01/2015",
    "time":"12:39PM",
    "trending":{
        "0":{
            "text":"yolo",
            "sentiment":"0.9",
            "subjectivity":"0.1",
            "popularity":"10%"
        },
        "1":{
            "text":"yolo",
            "sentiment":"0.9",
            "subjectivity":"0.1",
            "popularity":"10%"
        }
    }
}
```


### <a name="social"></a>Social Network Queries
Provide general information about the social graph
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

#### Ask about a user
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
      "average_sentiment":"2",
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

#### Get Number of Twitter Users for various demographic attributes.
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

#### Ask about the users particular friends
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

#### Ask about the top 10 affluent twitter users in the region (ie. highest follower count)
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

#### Ask about highest retweets

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
