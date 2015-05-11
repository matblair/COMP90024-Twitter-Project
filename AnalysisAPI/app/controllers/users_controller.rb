class UsersController < ApplicationController
	include UserRepresentor

	# Find general stats about user networks
	def index
		# Find average activity
		activity = 12
		connectivity = 12
		date = Date.today
		time = Time.now
		render json: {activity: activity,
					  connectivity: connectivity,
					  date: date,
					  time: time }.to_json
	end

	# Find information about a user
	def show
		# Get user id from the params
		user_id = params[:user_id]
		# Get information from couch and neo4j
		couch_info = {:dummy => "hello"}
		graph_info = {:basic_stats => "sadasd"}

		# Return structure
		render json: user_show_json(couch_info, graph_info)
	end

	# Find connections for a given user
	def connections
		# Find degree
		if params.has_key? 'degree'
			degree = params['degree']
		else
			degree = 1
		end

		# Get user id from the params
		user_id = params[:user_id]

		# Get connections from graph
		connections = { 1 => [{"user" => {id: 3}}] }

		# Get demos from couch
		demographics = { 1 => 'asdljasd' }

		# Build JSON
		render json: connections_json(user_id, connections, demographics)
	end

end
