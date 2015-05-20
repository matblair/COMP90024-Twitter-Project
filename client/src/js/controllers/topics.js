app.controller("TopicsOverviewController", ["$scope", function($scope) {

}]);

app.controller("TopicController", ["$scope", "topic", "uiGmapGoogleMapApi", function($scope, topic, uiGmapGoogleMapApi) {

	uiGmapGoogleMapApi.then(function(maps) {
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
			},
			locations: 
				[{"geo": {
					"lat": 29.4167, 
          "lng": 98.5000
        	},
				  "polarity": 0.5,
				  "subjectivity": 0.2,
				  "mood": "happy"
				},
				{"geo": {"lat": 29.4170, 
          "lng": 98.5000},
				  "polarity": 0.5,
				  "subjectivity": 0.2,
				  "mood": "happy"
				},
				{"geo": {"lat": 29.4173, 
          "lng": 98.5000},
				  "polarity": 0.5,
				  "subjectivity": 0.2,
				  "mood": "happy"
				}]
			
		}
		/* END Test Data */

		// First, Topic Summary
		$scope.summary = {
			request: {
				demographics: {
					political_leaning: "",
					language: ""
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
					language: ""
				},
				date_range: {
					start_date: Date(2015, 4, 1, 0, 0 , 0),
					end_date: Date()
				},
				granularity: "hourly"
			},
			response: test_data.trends //TEST DATA USED.
		}

		// Third, Locations
		$scope.locations = {
			request: {
				demographics: {
					political_leaning: "",
					language: ""
				},
				date_range: {
					start_date: Date(2015, 4, 1, 0, 0 , 0),
					end_date: Date()
				}
			},
			response: test_data.locations // TEST DATA USED. 
		}

		// Google Maps
		$scope.map = {
			heatLayerCallback: function (layer) {
        //set the heat layers backend data
        var heatLayer = new MapHeatLayer(layer);
      },
      center: {
	  		latitude: 29.4167,
	  		longitude: -98.5000
	  	},
	  	zoom: 11,
	  	pan: false,
	  	options: {
	  		scrollwheel: false,
	  		panControl: false,
	  		draggable: false
	  	},
		}

		function MapHeatLayer(heatLayer) {
			var map, pointarray, heatmap;
			var locData = [];

			$scope.locations.response.forEach(function(d) {
				locData.push(new maps.LatLng(d.geo.lat, d.geo.lng))
			})

			var pointArray = new maps.MVCArray(locData);
			heatLayer.setData(pointArray)

			return heatLayer;
		}
	})
	

}]);