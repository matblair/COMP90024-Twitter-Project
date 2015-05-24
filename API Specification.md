## Analysis API For San Antonio Texas
This API provides an interface through which users can query certain attributes about the people of San Antonio Texas to discover changing feelings on certain topics. 

###TABLE OF CONTENT
-------------------
1. [Topic](#topic)
  1. [Get General Information About A Topic](#topic-general)
  2. [Get Information About Topic Trends](#topic-trends)
  3. [Get Information About Topic Locations](#topic-locations)
2. [Location](#location)
  1. [Get General Information about Locations' Sentiment](#location-general)
  2. [Get information about a particular area](#location-sentiment)
3. [Hashtag](#hashtag)
  1. [Return information about a particular hashtag](#hashtag-single)
  2. [Return the ten most popular hashtags](#hashtag-popular)
  3. [Return hashtags associated to a topic](#hashtag-topic)
4. [Social Network](#social)
  1. [Provide general information about the social graph](#social-users)
  2. [Ask about a user](#social-user)
  3. [Get Twitter Users for various demographic attributes](#social-demographics)
  4. [Ask about the users particular friends](#social-friends)
5. [Emoji](#emoji)
  1. [Get general information about emoji usage](#emoji-summary)
  2. [Get emoji heatmap](#emoji-heatmap)
6. [Tweet Data Structure](#tweet)

##### General Notes
--------
As a note, all input times are in San Antonio (Central US Time) Time. Database values are stored in UTC but the API converts to and back in order to make it's calculations.

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
    "politcal_leaning":"",
    "language":"",
    "start_date":"21/01/2015",
    "end_date":"02/03/2015"
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
    "most_popular_languages":["gb","de"], // If no language specified
    "least_popular_languages":["en"],
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
    "politcal_leaning":"",
    "language":"",
    "start_date":"21/01/2015",
    "end_date":"02/03/2015",
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


### <a name="topic-location"></a>Get Information About Topic Locations
```http
GET /topics/:topic/locations
```
###### Input Params
```json
{
    "limit":200, // Optional
}
```
#### Output
List of Points with Sentiment Informations
```json
{
  "locations": [
    {
      "geo": {
        "lat": 29.46197139,
        "lon": -98.3589597
      },
      "polarity": 0,
      "subjectivity": 0
    },
    {
      "geo": {
        "lat": 29.52802452,
        "lon": -98.67108143 
      },
      "polarity": 0,
      "subjectivity": 0
    }
  ],
  "topic": "unemployment"
}
```

### <a name="location"></a>Location Queries
##### <a name="location-general"></a>Get General Information about Locations' Sentiment
```http
GET /locations
```

#### Input
```json
{
    "date":"21/01/2015", // DEFAULT IS YESTERDAY
    "politcal_leaning":"",
    "language":"",
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

##### <a name="location-sentiment"></a>Get information about a particular area

```http
GET /location/sentiment
```
#### Input
```json
{
    "start_date":"21/01/2015", // (optional)
    "end_date":"03/02/2015", // (optional)
    "period":"1:00pm - 2:00pm", //(optional)
    "limit":500, // (optional)
    "politcal_leaning":"", //(optional)
    "language":"", //(optional)
    "start_lat":"123",
    "start_long":"123",
    "end_lat":"23",
    "end_long":"123"
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
    "start_lat":"123",
    "start_long":"123",
    "end_lat":"23",
    "end_long":"123"
    "period":"1:00pm - 2:00pm", //(optional)
    "sentiment":{
        "points":"1290",
        "total":"97850",
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
    "most_popular_languages":["gb"],
    "least_popular_languages":["en"]
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
    "politcal_leaning":"",
    "language":"",
    "start_date": "15/4/2015",
    "start_date": "20/4/2015",
    "granularity": "hourly"
}
```

#### Demographic Markers - (Optional)
Political Leaning is one of:
- "democratic"
- "republican"

Language is a two character language code, i.e. "en","ch","gb"

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
  "time_periods" : {
    "00": {
      "start_date": "15/4/2015",
      "end_date": "20/4/2015",
      "trending":{
        "0":{
            "text":"ILoveHaskell",
            "polarity":"0.9",
            "count":"10",
            "subjectivity":"0.1"
        },
        "1":{
            "text":"HaskellSucksMonkeyBalls",
            "polarity":"0.9",
            "count":"10",
            "subjectivity":"0.1"
        } //10 of these for each period.
      }
    },
    "01": 
      "start_date": "15/4/2015",
      "end_date": "20/4/2015",
      "trending":{
        "0":{
            "text":"TechiesBOOM",
            "polarity":"0.9",
            "count":"10",
            "subjectivity":"0.1"
        },
        "1":{
            "text":"PudgeHook",
            "polarity":"-1",
            "count":"10",
            "subjectivity":"1"
        } //10 of these for each period.
      }
    }
  }
}
```


#####<a name="hashtag-topic"></a> Return Top 10 Hashtags mentioned for topics 
```http
GET /hashtag/topics
```
###### Input Params
```json
{
    "frequency":true, // Optional - Defaults to false
}
```
#### Output - With Frequency
```json
{
  "gun_control": {
    "hashtags": {
      "#donkeys":3
      "#obamasux":12
      "#iloveguns":1230 
      //Maximum Limit of 10
    }
  } // Etc for all supported topics
}
```
#### Output - Without Frequency
```json
{
  "gun_control": {
    "hashtags": [
      "#donkeys",
      "#obamasux",
      "#iloveguns" //Maximum Limit of 10
    ]
  } // Etc for all supported topics
}
```

#####<a name="hashtag-topic"></a> Return Similar Hashtags mentioned for topics 
```http
GET /hashtag/stats/:hashtag/similar
```

#### Input
```json
{
    "degree": "0",
    "frequency": "true"
}
```

##### Degree (Optional)
One of 0 or 1

##### Frequency (Optional)
One of:
- true
- false

#### Output
```json
{
  "degree": 0,
  "similar": {
    "EveryoneThinksImWeirdBecause": 1,
    "HealthIT": 1,
    "Leadership": 1,
    "Mindfulness": 1,
    "healthcareinnovation": 1,
    "imaging": 1,
    "innovation": 1,
    "medical": 1,
    "radiology": 1
  },
  "topic": "healthcare",
  "tweet_references": 7,
  "user_references": 5
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
        "politcal_leaning":{
          "democrat":12,
          "republican":13
          },
        "languages":["",""],
        "prefered_languge":"en",
    }
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
    "emoji_name" : "smiley",
    "count": 1000,
    "avg_subjectivity": 0.5,
    "avg_polarity": 0.2,
    "irony_detected": 20
  }, 
  "1": {
    "emoji": "😡",
    "emoji_name" : "sadface"
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
GET /emoji/:emoji_name/locations
```

#### Output
```json
{ "count" : 2,
  "emoji_name": "smile",
  "emoji":"😄"
  "locations": [
    {"lat": 12.123123,
     "lng": 23.231232
    },
    {"lat": 12.32112,
     "lng": 29.12312
    }
  ]
} 
```

### <a name="tweet"></a> Tweet Data Structure
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
