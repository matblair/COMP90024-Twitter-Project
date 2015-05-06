class Api::TweetsController < ApplicationController
	include TweetRepresentor

	def submit
		# Find tweets
		tweets = params[:tweets]
		# Hold errors
		errors = []
		# Process each tweet
		tweets.each do |t|
			user_id = t[:user_id]
			tweet_id = t[:tweet_id]
			u = User.find_or_create_by(twitter_id: user_id, name: "Mat")
			t = Tweet.new(twitter_id: tweet_id)
			if not t.save
				errors << {:id => tweet_id, :msg => "already have tweet #{tweet_id}"}
			end
		end

		if errors 
			render json: errors
		else
		# Loop over each tweet and if successful save the relationships
			render json: Tweet.all
		end
	end

	def index
		render json: Tweet.all
	end
end
