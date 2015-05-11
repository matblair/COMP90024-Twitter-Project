class HashtagsController < ApplicationController
	include HashtagRepresentor
	include DemographicParser

	before_action :find_demo

	def show
		# Get the tag
		tag = params[:tag]
		# Search couch for it
		couch_response = {1 => 'HELLO'}
		# Return response
		render json: show_hashtag(couch_response)
	end

	def trending
		# Find mood if it exists
		if params.has_key? 'mood'
			mood=params['mood']
		end

		# Make couch request
		couch_response = {1 => 'HELLO'}

		# Respond
		render json: show_trending(couch_response)
	end

	private
	def find_demo
		@demographic = extract_demographic params
	end

end
