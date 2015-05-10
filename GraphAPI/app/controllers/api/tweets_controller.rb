class Api::TweetsController < ApplicationController
	include TweetRepresentor

	require 'tweet_importer'

	def submit
		# Find tweets
		tweets = params[:tweets]
		# Hold errors
		errors = []
		# Process each tweet with the tweet importer
		TweetImporter.import_tweets tweets

		if errors
			render json: errors
		else
			render json: {"msg" => "#{tweets.count} tweets imported"}.to_json, status: :ok
		end
	end


	def index
		render json: Tweet.all
	end
end
