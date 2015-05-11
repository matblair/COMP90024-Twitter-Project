class LocationsController < ApplicationController
	include LocationRepresentor
	include DemographicParser

	before_action :validate_sentiment_params, only: [:sentiment]
	before_action :validate_index_params, only: [:index]
	# Find demographic if it exists
	before_action :find_demo

	def sentiment
		# Find the location
		location = params[:location]

		# Find the range if included and the period if included
		period = params.has_key?('period') ? params['period'] : nil
		range = params.has_key?('range') ? params['range'] : nil
		# Verify range has start and end date or emit it
		if range && !(range.has_key?('start_date') && range.has_key?('end_date'))
			range = nil
		end

		# Make couch request for sentiment
		couch_response = 'alskdjalskdja'

		# Render json
		render json: sentiment_json(couch_response)

	end

	def index
		# Find required period
		date = Date.parse(params[:date])
		period = params.has_key?('period') ? params[:period] : nil

		# Make couch request]
		couch_response = 'aksjdhaksjdh'

		# Render json
		render json: index_json(couch_response)
	end

	private
	# Find required index params
	def validate_index_params
		params.require(:date)
	end

	# Find required sentiment params
	def validate_sentiment_params
		params.require(:location)
	end

	private
	def find_demo
		@demographic = extract_demographic params
	end



end
