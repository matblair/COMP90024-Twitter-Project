app.controller('TestController',['$scope', function($scope) {
	$scope.data = [
		{name: "Donkey", value: 24},
		{name: "Monkey", value: 16},
		{name: "Cow", value: 22},
		{name: "Dog", value: 49}
	]

	$scope.showDetail = function(item) {
		if (!($scope.showDetailToggle))
			$scope.showDetailToggle = true
		$scope.detail = item
	}

	$scope.unshowDetail = function() {
		$scope.showDetailToggle = false
	}
}])