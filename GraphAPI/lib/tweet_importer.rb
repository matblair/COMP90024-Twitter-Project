class TweetImporter
  require 'couch_uploader'

  HASHTAG_KEY = "hashtags"
  MENTION_KEY = "user_mentions"

  def self.import_tweets tweets
    ## Process each tweet as if it has the correct structure
    ## and then upload to couchdb if save is correct
    to_couch = []
    tweets.each do |tweet_hash|

      ## Create the tweet
      tweet_id = tweet_hash["id"]
      tweet = Tweet.new(twitter_id: tweet_id)
      puts tweet.attributes

      # Check if unique
      if tweet.save
        # Is unique so build relationships
        find_tweeters tweet, tweet_hash
        find_topics tweet, tweet_hash
        find_mentions tweet, tweet_hash

        # Push to couch for tweet content storage
        to_couch << tweet_hash
      else
      	puts tweet.errors.full_messages
      end

    end

    # Upload all things to couch if there is anything
    if to_couch.count > 0
    	CouchUploader.upload_documents to_couch, "id"
    end

  end

  # Functions to build tweet relationships
  private
  def self.find_tweeters tweet, tweet_hash
    if tweet_hash.has_key? :user_id
      u = User.find_or_create_by(twitter_id: user_id)
    end
  end

  def self.find_topics tweet, tweet_hash
  	if tweet_hash.has_key? HASHTAG_KEY
  		topics = tweet_hash[HASHTAG_KEY]
  		topics.each do |t|
  			t = Topic.find_or_create_by(tag: t)
  			t.tweets << tweet
  			t.save
  		end
  	end
  end

  def self.find_mentions tweet, tweet_hash
  	if tweet_hash.has_key? MENTION_KEY
  		mentions = tweet_hash[MENTION_KEY]
  		mentions.each do |mention|
  			u = User.find_or_create_by(twitter_id: mention["id"],
  									   name: mention["name"])
  			u.mentions << tweet
  			u.save
  		end
  	end
  end



end
