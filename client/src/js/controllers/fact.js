app.controller("FactController", ['$scope', '$http', function($scope, $http) {

	/* Variables Initialisation */
	$scope.trendHash = {}

	$scope.hashtagFetch = function() {
		var req = {
		 method: 'GET',
		 url: "http://144.6.227.63:4500/hashtags/trending/",
		 headers: {
		   'Content-Type': undefined
		 },
		 data: $scope.trendHash
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
				$scope.socialGraph = data;
			}).
			error(function(data, status, headers, config) {
				alert("http://144.6.227.63:4500/users/", status);
			})
	}

	/* Init Run - Bad way to do it... but wtv... */
	$scope.hashtagFetch()
	$scope.socialGraphFetch()
}])