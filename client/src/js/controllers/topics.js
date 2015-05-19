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
    	"topic": "ALSKDJASL",
	    "time_periods":[
	      {
	        "start": Date(2015, 5, 18, 20, 0, 0),
	        "end": Date(2015, 5, 18, 21, 0, 0),
	        "count": 29,
	        "trend":"stable",
	        "polarity": 0.9,
	        "subjectivity": 0.2
	      },
	      {
	        "start": Date(2015, 5, 18, 21, 0, 0),
	        "end": Date(2015, 5, 18, 22, 0, 0),
	        "count": 92,
	        "trend":"stable",
	        "polarity": 0.4,
	        "subjectivity": 0.5
	      },
	      {
	        "start": Date(2015, 5, 18, 22, 0, 0),
	        "end": Date(2015, 5, 18, 23, 0, 0),
	        "count": 66,
	        "trend":"stable",
	        "polarity": 0.7,
	        "subjectivity": 0.4
	      },
	    ]
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
		response: test_data.summary //TEST DATA USED.
	};

	// Second, Topic Trends
	$scope.trends = {
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
			granularity: "hourly"
		},
		response: test_data.trends //TEST DATA USED.
	}


}]);