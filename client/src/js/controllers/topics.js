app.controller("TopicsOverviewController", ["$scope", function($scope) {

}]);

app.controller("TopicController", ["$scope", "topic", function($scope, topic) {
	$scope.topic = topic;	
	/* Test DATA */
	var test_data = {
		summary: {
	    "topic": $scope.topic.name,
	    "polarity":"0.9",
	    "subjectivity":"0.4",
	    "most_popular_language":"gb",
	    "least_popular_language":"en",
	    "count": 1921
		},
		trends: {
			
		}
	}
	/* END Test Data */

	// First, Topic Summary
	$scope.summary = {
		request: {
			demographics: {
				political_leaning: "",
				language: "",
				visitor: null
			},
			date_range: {
				start_date: Date(2015, 4, 1, 0, 0 , 0),
				end_date: Date()
			},
		},
		response: test_data.summary //TEST INJECTED!
	};

	// Second, Topic Trends
	$scope.trends = {
		request: {

		},
		response: {

		}
	}


}]);