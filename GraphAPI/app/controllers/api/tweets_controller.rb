class Api::TweetsController < ApplicationController
	include TweetRepresentor

	def submit
		tweets = params[:tweets]
		tweets.each do |t|
			user_id = t[:user_id]
			tweet_id = t[:tweet_id]
			u = User.find_by(twitter_id: user_id)
			if !u
			   u = User.create(twitter_id: user_id, name: "Mat")
			end
			t = Tweet.new(twitter_id: tweet_id)
			t.save
		end
		# Loop over each tweet and if successful save the relationships
		render json: Tweet.all
	end

	def index
		render json: Tweet.all
	end
end
