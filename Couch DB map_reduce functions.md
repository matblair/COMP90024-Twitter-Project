## Design Document : emojis

###View : count


####Map

```
function(doc) {
  if(doc['analysis']['topics']['democratic_indicator']) {
	var leaning = "democrat"; }
  else if (doc['analysis']['topics']['repulican_indicator']) {
	var leaning = "republican"; }
  else {
	var leaning = "none"; }

	emit([doc['analysis']['emojis']['emoji_sentiment'], leaning, doc['analysis']['language_features']['detected_language'], doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute'], doc['geo']['coordinates']['0'], doc['geo']['coordinates']['1']], {subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});
}
```

####Reduce

```
function(keys, values, rereduce){

 var analysis = {'count':0, 'subjectivity':0, 'polarity':0}
 var sub_sum = 0
 var polar_sum = 0

  for(var i = 0; i < values.length; i++) {
    analysis.count += values[i].count || 0
    sub_sum += values[i].subjectivity    || 0
    polar_sum += values[i].polarity    || 0

  }
  analysis.subjectivity = sub_sum/values.length
  analysis.polarity = polar_sum/values.length

  return analysis
}
```

###View : general

####Map

```
function(doc) {
    re = /[a-z]+/;
  str = JSON.stringify(doc['analysis']['emojis']['emoji_sentiment'])
  text = re.exec(str)
  if(text != "neutral"){
  	str = JSON.stringify(doc['analysis']['emojis']['text'])
  	emo = str.substr(1,str.length-2)

  if(doc['analysis']['topics']['democratic_indicator']) {
	var leaning = "democrat"; }
  else if (doc['analysis']['topics']['repulican_indicator']) {
	var leaning = "republican"; }
  else {
	var leaning = "none"; }

	s=emo.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/);
	for(i=0; i<emo.length; i+=1){
		if(s[i] != "" && s[i] != null)
        		emit([s[i], leaning, doc['analysis']['language_features']['detected_language'], doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute']],{subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});
	}
	
    }
}
```

####Reduce

```
function(keys, values, rereduce){

 var analysis = {'count':0, 'subjectivity':0, 'polarity':0}
 var sub_sum = 0
 var polar_sum = 0

  for(var i = 0; i < values.length; i++) {
    analysis.count += values[i].count || 0
    sub_sum += values[i].subjectivity    || 0
    polar_sum += values[i].polarity    || 0

  }
  analysis.subjectivity = sub_sum/values.length
  analysis.polarity = polar_sum/values.length

  return analysis
}
```

###View : general_bydate

####Map

```
function(doc) {
    re = /[a-z]+/;
  str = JSON.stringify(doc['analysis']['emojis']['emoji_sentiment'])
  text = re.exec(str)
  if(text != "neutral"){
  	str = JSON.stringify(doc['analysis']['emojis']['text'])
  	emo = str.substr(1,str.length-2)

  if(doc['analysis']['topics']['democratic_indicator']) {
	var leaning = "democrat"; }
  else if (doc['analysis']['topics']['repulican_indicator']) {
	var leaning = "republican"; }
  else {
	var leaning = "none"; }

	s=emo.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/);
	for(i=0; i<emo.length; i+=1){
		if(s[i] != "" && s[i] != null)
        		emit([doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute'],s[i], leaning, doc['analysis']['language_features']['detected_language'], doc['geo']['coordinates']['0'].toFixed(4),doc['geo']['coordinates']['1'].toFixed(4) ],{subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});
	
	}
	
    }
}
```

####Reduce

```
function(keys, values, rereduce){

 var analysis = {'count':0, 'subjectivity':0, 'polarity':0}
 var sub_sum = 0
 var polar_sum = 0

  for(var i = 0; i < values.length; i++) {
    analysis.count += values[i].count || 0
    sub_sum += values[i].subjectivity    || 0
    polar_sum += values[i].polarity    || 0

  }
  analysis.subjectivity = sub_sum/values.length
  analysis.polarity = polar_sum/values.length

  return analysis
}
```

###View : general_byloc

####Map

```
function(doc) {
    re = /[a-z]+/;
  str = JSON.stringify(doc['analysis']['emojis']['emoji_sentiment'])
  text = re.exec(str)
  if(text != "neutral"){
  	str = JSON.stringify(doc['analysis']['emojis']['text'])
  	emo = str.substr(1,str.length-2)

  if(doc['analysis']['topics']['democratic_indicator']) {
	var leaning = "democrat"; }
  else if (doc['analysis']['topics']['repulican_indicator']) {
	var leaning = "republican"; }
  else {
	var leaning = "none"; }

	s=emo.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/);
	for(i=0; i<emo.length; i+=1){
		if(s[i] != "" && s[i] != null)
        		emit([doc['geo']['coordinates']['0'].toFixed(4),doc['geo']['coordinates']['1'].toFixed(4), s[i],leaning, doc['analysis']['language_features']['detected_language'], doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute']],{subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});
	}
	
    }
}
```

####Reduce

```
function(keys, values, rereduce){

 var analysis = {'count':0, 'subjectivity':0, 'polarity':0}
 var sub_sum = 0
 var polar_sum = 0

  for(var i = 0; i < values.length; i++) {
    analysis.count += values[i].count || 0
    sub_sum += values[i].subjectivity    || 0
    polar_sum += values[i].polarity    || 0

  }
  analysis.subjectivity = sub_sum/values.length
  analysis.polarity = polar_sum/values.length

  return analysis
}
```

###View : happiness

####Map

```
function(doc) {
  if(doc['analysis']['topics']['democratic_indicator']) {
	var leaning = "democrat"; }
  else if (doc['analysis']['topics']['repulican_indicator']) {
	var leaning = "republican"; }
  else {
	var leaning = "none"; }

  h = 0
  re = /[a-z]+/;
  str = JSON.stringify(doc['analysis']['emojis']['emoji_sentiment'])
  text = re.exec(str)
  if (text == "happy")
      h = 1
  else if (text == "sad")
      h = -1
  emit(['happiness', leaning, doc['analysis']['language_features']['detected_language'], doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute'], doc['geo']['coordinates']['0'], doc['geo']['coordinates']['1']], h)
	
}
```

####Reduce

```
function(keys, values){
  a = sum(values)
  return a;
}
```

##Design Document : hashtag

###View : count

####Map

```
function(doc) {
    for(i in doc.entities.hashtags){
 	str = JSON.stringify(doc.entities.hashtags[i]);
	tokens = str.split("\"").slice(1);
      emit([tokens[2], doc['analysis']['language_features']['detected_language']], 1);
	}
}
```

####Reduce

```
function(keys, counts) {
  var sum = 0;
  for(var i=0; i < counts.length; i++) {
     sum += counts[i];
  }
  return sum;
}
```

###View : stats

####Map

```
function(doc) {
  if(doc['analysis']['topics']['democratic_indicator']) {
	var leaning = "democrat"; }
  else if (doc['analysis']['topics']['repulican_indicator']) {
	var leaning = "republican"; }
  else {
	var leaning = "none"; }

    for(i in doc.entities.hashtags){
	str = JSON.stringify(doc.entities.hashtags[i]);
	tokens = str.split("\"").slice(1);
      emit([tokens[2].toLowerCase(),leaning, doc['analysis']['language_features']['detected_language'], doc['geo']['coordinates']['0'],doc['geo']['coordinates']['1'], doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute']], {subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});
	}
}
```

####Reduce

```
function(keys, values, rereduce){

 var analysis = {'count':0, 'subjectivity':0, 'polarity':0}
 var sub_sum = 0
 var polar_sum = 0

  for(var i = 0; i < values.length; i++) {
    analysis.count += values[i].count || 0
    sub_sum += values[i].subjectivity    || 0
    polar_sum += values[i].polarity    || 0

  }
  analysis.subjectivity = sub_sum/values.length
  analysis.polarity = polar_sum/values.length

  return analysis
}
```

###View : stats_bydate

####Map

```
function(doc) {
  if(doc['analysis']['topics']['democratic_indicator']) {
	var leaning = "democrat"; }
  else if (doc['analysis']['topics']['repulican_indicator']) {
	var leaning = "republican"; }
  else {
	var leaning = "none"; }

    for(i in doc.entities.hashtags){
	str = JSON.stringify(doc.entities.hashtags[i]);
	tokens = str.split("\"").slice(1);
      emit([doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute'],leaning, doc['analysis']['language_features']['detected_language'], doc['geo']['coordinates']['0'],doc['geo']['coordinates']['1'], tokens[2].toLowerCase()], {subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});
	}
}
```

####Reduce

```
function(keys, values, rereduce){

 var analysis = {'count':0, 'subjectivity':0, 'polarity':0}
 var sub_sum = 0
 var polar_sum = 0

  for(var i = 0; i < values.length; i++) {
    analysis.count += values[i].count || 0
    sub_sum += values[i].subjectivity    || 0
    polar_sum += values[i].polarity    || 0

  }
  analysis.subjectivity = sub_sum/values.length
  analysis.polarity = polar_sum/values.length

  return analysis
}
```

###View : stats_bylocation

####Map

```
function(doc) {
  if(doc['analysis']['topics']['democratic_indicator']) {
	var leaning = "democrat"; }
  else if (doc['analysis']['topics']['repulican_indicator']) {
	var leaning = "republican"; }
  else {
	var leaning = "none"; }

    for(i in doc.entities.hashtags){
	str = JSON.stringify(doc.entities.hashtags[i]);
	tokens = str.split("\"").slice(1);
      emit([tokens[2].toLowerCase(), doc['geo']['coordinates']['0'].toFixed(4),doc['geo']['coordinates']['1'].toFixed(4),leaning, doc['analysis']['language_features']['detected_language'],  doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute']], {subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});
	}
}
```

####Reduce

```
function(keys, values, rereduce){

 var analysis = {'count':0, 'subjectivity':0, 'polarity':0}
 var sub_sum = 0
 var polar_sum = 0

  for(var i = 0; i < values.length; i++) {
    analysis.count += values[i].count || 0
    sub_sum += values[i].subjectivity    || 0
    polar_sum += values[i].polarity    || 0

  }
  analysis.subjectivity = sub_sum/values.length
  analysis.polarity = polar_sum/values.length

  return analysis
}
```

##Design Document : location

###View : loc_sentiment

####Map

```
function(doc) {
  if(doc['analysis']['topics']['democratic_indicator']) {
	var leaning = "democrat"; }
  else if (doc['analysis']['topics']['repulican_indicator']) {
	var leaning = "republican"; }
  else {
	var leaning = "none"; }

  emit([leaning, doc['geo']['coordinates']['0'], doc['geo']['coordinates']['1'], doc['analysis']['language_features']['detected_language'], doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute']], { subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});
}
```

####Reduce

```
function(keys, values, rereduce){

 var analysis = {'count':0, 'subjectivity':0, 'polarity':0}
 var sub_sum = 0
 var polar_sum = 0

  for(var i = 0; i < values.length; i++) {
    analysis.count += values[i].count || 0
    sub_sum += values[i].subjectivity    || 0
    polar_sum += values[i].polarity    || 0

  }
  analysis.subjectivity = sub_sum/values.length
  analysis.polarity = polar_sum/values.length

  return analysis
}
```

###View : sentiment

####Map

```
function(doc) {
  if(doc['analysis']['topics']['democratic_indicator']) {
	var leaning = "democrat"; }
  else if (doc['analysis']['topics']['repulican_indicator']) {
	var leaning = "republican"; }
  else {
	var leaning = "none"; }

  emit([doc['geo']['coordinates']['0'].toFixed(4),doc['geo']['coordinates']['1'].toFixed(4),leaning, doc['analysis']['language_features']['detected_language'], doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute']], {subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});
}
```

####Reduce

```
function(keys, values, rereduce){

 var analysis = {'count':0, 'subjectivity':0, 'polarity':0}
 var sub_sum = 0
 var polar_sum = 0

  for(var i = 0; i < values.length; i++) {
    analysis.count += values[i].count || 0
    sub_sum += values[i].subjectivity    || 0
    polar_sum += values[i].polarity    || 0

  }
  analysis.subjectivity = sub_sum/values.length
  analysis.polarity = polar_sum/values.length

  return analysis
}
```

###View : sentiment_bydate

####Map

```
function(doc) {
  if(doc['analysis']['topics']['democratic_indicator']) {
	var leaning = "democrat"; }
  else if (doc['analysis']['topics']['repulican_indicator']) {
	var leaning = "republican"; }
  else {
	var leaning = "none"; }

  emit([doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute'], doc['geo']['coordinates']['0'].toFixed(4),doc['geo']['coordinates']['1'].toFixed(4),leaning, doc['analysis']['language_features']['detected_language'] ], {subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});
}
```

####Reduce

```
function(keys, values, rereduce){

 var analysis = {'count':0, 'subjectivity':0, 'polarity':0}
 var sub_sum = 0
 var polar_sum = 0

  for(var i = 0; i < values.length; i++) {
    analysis.count += values[i].count || 0
    sub_sum += values[i].subjectivity    || 0
    polar_sum += values[i].polarity    || 0

  }
  analysis.subjectivity = sub_sum/values.length
  analysis.polarity = polar_sum/values.length

  return analysis
}
```

##Design Document : topic

###View : analysis

####Map

```
 function(doc) {
  if(doc['analysis']['topics']['democratic_indicator']) {
	var leaning = "democrat"; }
  else if (doc['analysis']['topics']['repulican_indicator']) {
	var leaning = "republican"; }
  else {
	var leaning = "none"; }
  if(doc['analysis']['topics']['mention_immigration'])
    emit(['mention_immigration', leaning, doc['analysis']['language_features']['detected_language'], doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute']], {subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});

  if(doc['analysis']['topics']['mention_gun_control'])
    emit(['gun_control', leaning, doc['analysis']['language_features']['detected_language'], doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute']], {subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});

  if(doc['analysis']['topics']['unemployment'])
    emit(['unemployment', leaning, doc['analysis']['language_features']['detected_language'], doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute']], {subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});
}
```

####Reduce

```
function(keys, values){

 var analysis = {'count':0, 'subjectivity':0, 'polarity':0}
 var sub_sum = 0
 var polar_sum = 0

  for(var i = 0; i < values.length; i++) {
    analysis.count += values[i].count || 0
    sub_sum += values[i].subjectivity    || 0
    polar_sum += values[i].polarity    || 0

  }
  analysis.subjectivity = sub_sum/analysis.count
  analysis.polarity = polar_sum/analysis.count

  return analysis
}
```

###View : analysis_bydate

####Map

```
 function(doc) {
  if(doc['analysis']['topics']['democratic_indicator']) {
	var leaning = "democrat"; }
  else if (doc['analysis']['topics']['repulican_indicator']) {
	var leaning = "republican"; }
  else {
	var leaning = "none"; }
  if(doc['analysis']['topics']['mention_immigration'])
    emit(['mention_immigration', doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute'], doc['analysis']['language_features']['detected_language'], leaning ], {subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});

  if(doc['analysis']['topics']['mention_gun_control'])
    emit(['gun_control', doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute'], doc['analysis']['language_features']['detected_language'],  leaning], {subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});

  if(doc['analysis']['topics']['unemployment'])
    emit(['unemployment', doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute'], doc['analysis']['language_features']['detected_language'], leaning], {subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});
}
```

####Reduce

```
function(keys, values){

 var analysis = {'count':0, 'subjectivity':0, 'polarity':0}
 var sub_sum = 0
 var polar_sum = 0

  for(var i = 0; i < values.length; i++) {
    analysis.count += values[i].count || 0
    sub_sum += values[i].subjectivity    || 0
    polar_sum += values[i].polarity    || 0

  }
  analysis.subjectivity = sub_sum/analysis.count
  analysis.polarity = polar_sum/analysis.count

  return analysis
}
```

###View : analysis_byloc

####Map

```
 function(doc) {
  if(doc['analysis']['topics']['democratic_indicator']) {
	var leaning = "democrat"; }
  else if (doc['analysis']['topics']['repulican_indicator']) {
	var leaning = "republican"; }
  else {
	var leaning = "none"; }
  if(doc['analysis']['topics']['mention_immigration'])
    emit(['mention_immigration', doc['geo']['coordinates']['0'].toFixed(4),doc['geo']['coordinates']['1'].toFixed(4), leaning, doc['analysis']['language_features']['detected_language'], doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute'] ], {subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});

  if(doc['analysis']['topics']['mention_gun_control'])
    emit(['gun_control', leaning, doc['geo']['coordinates']['0'].toFixed(4),doc['geo']['coordinates']['1'].toFixed(4), doc['analysis']['language_features']['detected_language'], doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute']], {subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});

  if(doc['analysis']['topics']['unemployment'])
    emit(['unemployment', doc['geo']['coordinates']['0'].toFixed(4),doc['geo']['coordinates']['1'].toFixed(4), doc['analysis']['language_features']['detected_language'], doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute']], {subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});
}
```

####Reduce

```
function(keys, values){

 var analysis = {'count':0, 'subjectivity':0, 'polarity':0}
 var sub_sum = 0
 var polar_sum = 0

  for(var i = 0; i < values.length; i++) {
    analysis.count += values[i].count || 0
    sub_sum += values[i].subjectivity    || 0
    polar_sum += values[i].polarity    || 0

  }
  analysis.subjectivity = sub_sum/analysis.count
  analysis.polarity = polar_sum/analysis.count

  return analysis
}
```

###View : analysis_lang_only

####Map

```
 function(doc) {
  if(doc['analysis']['topics']['democratic_indicator']) {
	var leaning = "democrat"; }
  else if (doc['analysis']['topics']['repulican_indicator']) {
	var leaning = "republican"; }
  else {
	var leaning = "none"; }
  if(doc['analysis']['topics']['mention_immigration'])
    emit(['mention_immigration', doc['analysis']['language_features']['detected_language'], doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute'], leaning], {subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});

  if(doc['analysis']['topics']['mention_gun_control'])
    emit(['gun_control', doc['analysis']['language_features']['detected_language'], doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute'], leaning], {subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});

  if(doc['analysis']['topics']['unemployment'])
    emit(['unemployment', doc['analysis']['language_features']['detected_language'], doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute'], leaning], {subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});
}
```

####Reduce

```
function(keys, values){

 var analysis = {'count':0, 'subjectivity':0, 'polarity':0}
 var sub_sum = 0
 var polar_sum = 0

  for(var i = 0; i < values.length; i++) {
    analysis.count += values[i].count || 0
    sub_sum += values[i].subjectivity    || 0
    polar_sum += values[i].polarity    || 0

  }
  analysis.subjectivity = sub_sum/analysis.count
  analysis.polarity = polar_sum/analysis.count

  return analysis
}
```

###View : language_count

####Map

```
function(doc) {


  if(doc['analysis']['topics']['mention_immigration'])
    emit(['mention_immigration', doc['analysis']['language_features']['detected_language']], 1);

  if(doc['analysis']['topics']['mention_gun_control'])
    emit(['gun_control', doc['analysis']['language_features']['detected_language']],1);

  if(doc['analysis']['topics']['unemployment'])
    emit(['unemployment',doc['analysis']['language_features']['detected_language']], 1);

}
```

####Reduce

```
function(keys, values){
  a = sum(values)
  return a;
}
```

###View : location

####Map

```
 function(doc) {
  if(doc['analysis']['topics']['democratic_indicator']) {
	var leaning = "democrat"; }
  else if (doc['analysis']['topics']['repulican_indicator']) {
	var leaning = "republican"; }
  else {
	var leaning = "none"; }
  if(doc['analysis']['topics']['mention_immigration'])
    emit(['mention_immigration', leaning, doc['analysis']['language_features']['detected_language'], doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute']], {latitude:doc['geo']['coordinates']['0'], longitude:doc['geo']['coordinates']['1'], subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});

  if(doc['analysis']['topics']['mention_gun_control'])
    emit(['gun_control', leaning, doc['analysis']['language_features']['detected_language'], doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute']], {latitude:doc['geo']['coordinates']['0'], longitude:doc['geo']['coordinates']['1'], subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});

  if(doc['analysis']['topics']['unemployment'])
    emit(['unemployment', leaning, doc['analysis']['language_features']['detected_language'], doc['created_at']['year'], doc['created_at']['month'], doc['created_at']['day'], doc['created_at']['hour'], doc['created_at']['minute']], {latitude:doc['geo']['coordinates']['0'], longitude:doc['geo']['coordinates']['1'], subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});
}
```

####Reduce

```
function(keys, values){

 var analysis = {'count':0, 'subjectivity':0, 'polarity':0}
 var sub_sum = 0
 var polar_sum = 0

  for(var i = 0; i < values.length; i++) {
    analysis.count += values[i].count || 0
    sub_sum += values[i].subjectivity    || 0
    polar_sum += values[i].polarity    || 0

  }
  analysis.subjectivity = sub_sum/analysis.count
  analysis.polarity = polar_sum/analysis.count

  return analysis
}
```

###View : users

####Map

```
 function(doc) {
  if(doc['analysis']['topics']['democratic_indicator']) {
	var leaning = "democrat"; }
  else if (doc['analysis']['topics']['repulican_indicator']) {
	var leaning = "republican"; }
  else {
	var leaning = "none"; }

  if(doc['analysis']['topics']['mention_immigration'])
    emit(['mention_immigration', doc['user']['screen_name'], doc['id'], leaning, doc['analysis']['language_features']['detected_language']], {tweets:doc['user']['statuses_count'], followers:doc['user']['followers_count'],subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});

  if(doc['analysis']['topics']['mention_gun_control'])
    emit(['gun_control', doc['user']['screen_name'], doc['id'], leaning, doc['analysis']['language_features']['detected_language']], {tweets:doc['user']['statuses_count'], followers:doc['user']['followers_count'],subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});

  if(doc['analysis']['topics']['unemployment'])
    emit(['unemployment', doc['user']['screen_name'], doc['id'], leaning, doc['analysis']['language_features']['detected_language']], {tweets:doc['user']['statuses_count'], followers:doc['user']['followers_count'],subjectivity:doc['analysis']['language_features']['subjectivity'], polarity:doc['analysis']['language_features']['polarity'], count:1});
}

```

####Reduce

```
function(keys, values){

 var analysis = {'tweets':0, 'followers':0, 'count':0, 'subjectivity':0, 'polarity':0}
 var sub_sum = 0
 var polar_sum = 0

  for(var i = 0; i < values.length; i++) {
    analysis.count += values[i].count || 0
    sub_sum += values[i].subjectivity    || 0
    polar_sum += values[i].polarity    || 0

  }
  analysis.subjectivity = sub_sum/analysis.count
  analysis.polarity = polar_sum/analysis.count  
  analysis.tweets = values.tweets
  analysis.followers = values.followers

  return analysis
}
```