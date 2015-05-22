app.controller("TopicController", ["$scope", "topic", "uiGmapGoogleMapApi", "$http", function($scope, topic, uiGmapGoogleMapApi, $http) {

	uiGmapGoogleMapApi.then(function(maps) {
		$scope.topic = topic;	
		
		switch($scope.topic.name) {	
			case "Gun Control":
				$scope.topic.path = "gun_control";
				break;
			case "Unemployment":
				$scope.topic.path = "unemployment";
				break;
			case "Immigration":
				$scope.topic.path = "immigration";
				break;
		}
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
			response: test_data.summary, //TEST DATA USED.
			tweets: {}
		};

		// All Topic Tweets
		$http.get(("http://144.6.227.63:4500/topics/" + $scope.topic.path), {params: $scope.summary.request}).
			success(function(data) {
				$scope.summary.response = data
				console.log("all", $scope.summary.response)
			}).
			error(function(err) {
				console.log("all", err)
			})

		// Demographic Contraints
		// "en" language
		$scope.summary.request = {
			demographics: {
				political_leaning: "",
				language: "en"
			},
			date_range: {
				start_date: Date(2010, 4, 1, 0, 0 , 0),
				end_date: Date()
			}
		}

		$http.get(("http://144.6.227.63:4500/topics/" + $scope.topic.path), {params: $scope.summary.request}).
			success(function(data) {
				$scope.summary.tweets.en = data
				console.log("english", $scope.summary.tweets.en);
			}).
			error(function(err) {
				console.log("english", err);
			})

		// "es" language
		$http.get(("http://144.6.227.63:4500/topics/" + $scope.topic.path), {params: {
			demographics: {
				political_leaning: "",
				language: "es"
			},
			date_range: {
				start_date: Date(2010, 4, 1, 0, 0 , 0),
				end_date: Date()
			}
		}}).success(function(data) {
			$scope.summary.tweets.es = data;
			console.log("Spanish", $scope.summary.tweets.es);
		}).error(function(err) {
			console.log("spanish", err);
		})

		// "cn" language
		$http.get(("http://144.6.227.63:4500/topics/" + $scope.topic.path), {params: {
			demographics: {
				political_leaning: "",
				language: "cn"
			},
			date_range: {
				start_date: Date(2010, 4, 1, 0, 0 , 0),
				end_date: Date()
			}
		}}).success(function(data) {
			$scope.summary.tweets.cn = data;
			console.log("Chinese", $scope.summary.tweets.cn);
		}).error(function(err) {
			console.log("Chinese", err);
		})


		// "democrats" political_leaning
		$http.get(("http://144.6.227.63:4500/topics/" + $scope.topic.path), {params: {
			demographics: {
				political_leaning: "democratic",
				language: ""
			},
			date_range: {
				start_date: Date(2010, 4, 1, 0, 0 , 0),
				end_date: Date()
			}
		}}).success(function(data) {
			$scope.summary.tweets.democratic = data;
			console.log("democratic", $scope.summary.tweets.democratic);
		}).error(function(err) {
			console.log("democratic", err);
		});

		// "republican" political_leaning
		$http.get(("http://144.6.227.63:4500/topics/" + $scope.topic.path), {params: {
			demographics: {
				political_leaning: "republican",
				language: ""
			},
			date_range: {
				start_date: Date(2010, 4, 1, 0, 0 , 0),
				end_date: Date()
			}
		}}).success(function(data) {
			$scope.summary.tweets.republican = data;
			console.log("republican", $scope.summary.tweets.republican);
		}).error(function(err) {
			console.log("republican", err);
		});

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