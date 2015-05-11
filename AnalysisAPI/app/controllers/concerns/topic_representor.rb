module TopicRepresentor
	extend ActiveSupport::Concern

	def show_json response
		JSON.parse '{"topic":"ALSKDJASL","popularity":"1000","sentiment":"0.9","subjectivity":"0.4","most_popular_language":"gb","least_popular_language":"en"}'
	end

	def trend_json response
		JSON.parse '{"topic":"ALSKDJASL","trend":"stable","sentiment":"0.9","time_periods":[{"start":"21/01/2015","end":"21/02/2015","popularity":"100","trend":"stable"}]}'
	end

	def extremes_json response
		JSON.parse '{"topic":"ALSKDJASL","greatest_supporter":{"name":"mat","username":"matthefantastic","id":"aslkdjaslkdj","basic_stats":{"number_of_tweets":"3","num_followers":"2","talker":true,"degree_of_connectivity":"12"},"sentiment":{"average_sentiment":"2","average_subjectivity":"3"},"demographic":{"politcal_leaning":"","languages":["",""],"prefered_languge":"en","visitor":true}},"greatest_detract":{"name":"mat","username":"matthefantastic","id":"aslkdjaslkdj","basic_stats":{"number_of_tweets":"3","num_followers":"2","talker":true,"degree_of_connectivity":"12"},"sentiment":{"average_sentiment":"2","average_subjectivity":"3"},"demographic":{"politcal_leaning":"","languages":["",""],"prefered_languge":"en","visitor":true}},"maximum_distance":"9","shortest_distance":"3","shortest_path":{"0":{"user_id":"Name","name":"mat"},"1":{"user_id":"ASLKD","name":"john"}}}'
	end
end
