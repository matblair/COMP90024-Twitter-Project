module LocationRepresentor
	extend ActiveSupport::Concern

	def index_json response
		JSON.parse '{"date":"21/01/2015","period":"1:00pm - 2:00pm","locations":[{"geo":{"nw":{"lat":"29.192","long":"21.91"},"se":{"lat":"29.192","long":"21.91"}},"sentiment":{"polarity":"0.1","subjectivity":"0.2"}}]}'
	end

	def sentiment_json response
		JSON.parse '{"start_date":"21/01/2015","end_date":"03/02/2015","location":[{"lat":"123","long":"123"},{"lat":"123","long":"123"}],"period":"1:00pm - 2:00pm","sentiment":{"polarities":{"0.1":"10","0.2":"20"},"subjectivity":{"0.1":"10","0.2":"20"}}}'
	end


end
