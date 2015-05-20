#Couch DB Map-Reduce views

## Topics 
For the API calls
- `GET /topics/:topic`
- `GET /topics/:topic/trend`
- `GET /topics/:topic/extremes`

### Design Document : topic
#### View : analysis (analysis of topic)
These are the returned keys and values
```
Keys : [ "topic", political_leaning, language, year, month, day, hour, minute ]
Returns : [ count, subjectivity, polarity ]
```
Where 
 - topics : "mention_immigration", "gun_control", "unemployment"
 - political_leaning : "democrat", "republican", "none"

#### Query Examples

View analysis of all tweets about topic "gun_control".

```
/tweets/_design/topic/_view/analysis?startkey=["gun_control"]&endkey=["gun_control",{},{},{},{},{},{},{}]
```

View analysis of all tweets about topic "gun_control" by democrats in English

```	
/tweets/_design/topic/_view/analysis?startkey=["gun_control","republican","en"]&endkey=["gun_control","republican","en",{},{},{},{},{}]
```

View analysis of all tweets grouped by the first 3 keys.

```	
/tweets/_design/topic/_view/analysis?group=true&group_level=3	
```

#### View : language_count (count of tweets for a particular language)
These are the returned keys and values
```
Keys : [ "topic", language ]
Returns : [ count ]
```
Where
- topics : "mention_immigration", "gun_control", "unemployment"
- language : "en", "da", "es"....

#### Query Examples 

View language stats about topic "gun_control".

```	
/tweets/_design/topic/_view/language_count?startkey=["gun_control"]&endkey=["gun_control",{}]&group=true
```

View language stats in groups.

```	
/tweets/_design/topic/_view/language_count?group=true
```

#### View : users 
These are the returned keys and values
```
Keys : [ "topic", user screen name, uder id, political_leaning, language ]	
Returns : [ no. of tweets, no. of followers, count, subjectivity, polarity ]
```

#### Query Examples

View count of tweeters about topic "gun_control" grouped by topic	
 
```
/tweets/_design/topic/_view/users?startkey=["gun_control"]&endkey=["gun_control",{},{},{},{}]&group=true&group_level=1
```

#### View : location
These are the returned keys and values
```
Keys : [ "topic", political_leaning, language, year, month, day, hour, minute  
Returns : [ latitude, longitude, count, subjectivity, polarity ]
```

Where     
- topics : "mention_immigration", "gun_control", "unemployment"
- political_leaning : "democrat", "republican", "none"

#### Query Examples
 
View location of all tweets about topic "gun_control".

```       
/tweets/_design/topic/_view/location?startkey=["gun_control"]&endkey=["gun_control",{},{},{},{},{},{},{}]
```

## Locations 
For the API calls
- `GET /locations`
- `GET /location/sentiment`

### Design Document : location
#### View : sentiment
These are the returned keys and values
```
Keys : [ "location" (unrelated string), latitude, longitude, year, month, day, hour, minute ]
Returns : [ count, subjectivity, polarity ]
```

#### Query Examples

View count of all tweets between latitude 29 to 30 and longitude -98 to -100.

```
/tweets/_design/location/_view/sentiment?startkey=["location",29,-98]&endkey=["location",30,-100,{},{},{},{},{}]
```

View count of all tweets between latitude 29 to 30 and longitude -98 to -100, from 02/05/2015 to 05/05/2015

```	
/tweets/_design/location/_view/sentiment?startkey=["location",29,-98,2015,5,2]&endkey=["location",30,-100,2015,5,5,{},{}]
```

#### View : loc_sentiment 
These are the returned keys and values
```
Keys : [ political_leaning, language, year, month, day, hour, minute ]
Returns : [ latitude, longitude, count, subjectivity, polarity ]
```

#### Query Examples
* View count of all tweets with location and sentiment for democrats .
	
```
/tweets/_design/location/_view/sentiment?startkey=["democrat"]&endkey=["democrat",{},{},{},{},{},{}]
```

## Locations 
For the API calls

- `GET /hashtags/stats/:tag`
- `GET /hashtags/trending`

### Design Document : hashtag
### View : count
These are the returned keys and values
```
Keys : [  hash_topic, language ]
Returns : [ count ]
```

#### Query Examples

View count of all hash topics and find which hash topic has maximum number of tweets

```	
/tweets/_design/hashtag/_view/count
```

#### View : stat
These are the returned keys and values
```
Keys : [ hash_topic, political_leaning, language, latitude, longitude, year, month, day, hour, minute ]
Returns : [ count, subjectivity, polarity ]
```

#### Query Examples

View sentiment for unemployment in english democrats between latitude 29 and 30, and longitude -99 and -100 .
	
```
/tweets/_design/hashtag/_view/stat?startkey=["unemployment","democrat","en",29,-99]&endkey=["unemployment","democrat","en",30,-100,{},{},{},{},{}]
```


## Emoji 
For the API calls

- `GET /emoji/general`
- `GET /emoji/happiness/locations`

### Design Document : emojis
#### View : general
These are the returned keys and values
```
Keys : [  emoji_sentiment, political_leaning, language, year, month, day, hour, minute, latitude, longitude ]
Returns : [ count, subjectivity, polarity ]
```

Where 
- emoji_sentiment : "happy", "neutral", "sad"	
	
#### Query Examples

View count of all happy democrats

```
/tweets/_design/emojis/_view/general?startkey=["happy","democrat"]&endkey=["sad","democrat",{},{},{},{},{},{},{},{}]
```

###View : happiness
These are the returned keys and values
```
Keys : [  'happiness', political_leaning, language, year, month, day, hour, minute, latitude, longitude ]	
Returns : [ count ]
```

Where
 - emoji_sentiment : "happy", "neutral", "sad"	

#### Query Examples

View the happiness level of english speaking democrats in 2014 and 2015

```	
/tweets/_design/emojis/_view/happiness?startkey=["happiness","democrat","en",2014]&endkey=["happiness","democrat","en",2015,{},{},{},{},{},{}]&group=true&group_level=4
```

## Emoji 
For the API calls
- `GET /users/:user`
 
### Design Document : users

#### View : basic_info
These are the returned keys and values
````
Keys : [  'User', User_screen_name, User_id ]
Returns : [ language, statuses_count, followers_count, friends_count ]
````

#### Query Examples

* View basic information about user with screen name "xyz"

```	
/twitter_users/_design/users/_view/basic_info?startkey=["User","xyz"]&endkey=["User","xyz",{}]
```
