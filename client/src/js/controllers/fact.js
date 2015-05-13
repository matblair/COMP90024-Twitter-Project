app.controller("FactController", ['$scope', '$http', function($scope, $http) {

		$scope.hashtagFetch = function() {
			var req = {
			 method: 'GET',
			 url: "http://144.6.227.63:4500/hashtags/trending/",
			 headers: {
			   'Content-Type': undefined
			 },
			 data:{}
			}
			$http(req).
				success(function(data, status, headers, config) {
					$scope.tags = data.response;
				}).
				error(function(data, status, headers, config){ 
					alert("http://144.6.227.63:4500/hashtags/trending NOT REACHABLE");
				})
		}

		$scope.socialGraphFetch = function() {
			$http.get("http://144.6.227.63:4500/users/").
				success(function(data, status, headers, config) {
					console.log(data)
					$scope.socialGraph = data;
				}).
				error(function(data, status, headers, config) {
					alert("http://144.6.227.63:4500/users/", status);
				})
		}

		$scope.hashtagFetch()
		$scope.socialGraphFetch()
	}])