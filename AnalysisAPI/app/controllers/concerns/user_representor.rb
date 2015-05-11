module UserRepresentor
	extend ActiveSupport::Concern

	def user_show_json couch, neo
		# output = {}
		# couch.each_pair { |k,v| output[k] = v }
		# neo.each_pair   { |k,v| output[k] = v }
		# output.to_json
		JSON.parse '{"name":"mat","username":"matthefantastic","basic_stats":{"number_of_tweets":"3","num_followers":"2","talker":true,"degree_of_connectivity":"12"},"sentiment":{"average_sentiment":"2","average_subjectivity":"3"},"demographic":{"politcal_leaning":"","languages":["",""],"prefered_languge":"en","visitor":true}}'
	end

	def connections_json user, connections, demos
		# Will do stuff later
		JSON.parse '{"date":"21/01/2015","time":"12:39PM","user":"user_id","connections":{"1":[{"user":{"name":"asdkljalskdja","user_id":"1","num_connections":"1"},"demographic":{},"subjectivty":"0.9","sentiment":"0.1"}],"2":[{"user":{"name":"asdkljalskdja","user_id":"1","num_connections":"1"},"demographic":{},"subjectivty":"0.9","sentiment":"0.1"}]},"num_connections":"1","degree_of_connectivity":"12"}'
	end

end