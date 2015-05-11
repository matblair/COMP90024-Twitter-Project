module HashtagRepresentor
	extend ActiveSupport::Concern

	def show_hashtag tag
		JSON.parse '{"text":"yolo","sentiment":"0.9","subjectivity":"0.1","popularity":"10%","most_popular_language":"gb","least_popular_language":"en"}'
	end

	def show_trending response
		response = JSON.parse '{"0":{"text":"yolo","sentiment":"0.9","subjectivity":"0.1","popularity":"10%"},"1":{"text":"yolo","sentiment":"0.9","subjectivity":"0.1","popularity":"10%"}}'
		output = {:date => Date.today,
				  :time => Time.now,
				  :response => response}
		output.to_json
	end

end
