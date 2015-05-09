app.controller('TestController',['$scope', function($scope) {
	$scope.data = [
		{name: "Donkey", value: 24},
		{name: "Monkey", value: 92},
		{name: "Cow", value: 22},
		{name: "Dog", value: 49}
	]

	$scope.showDetailToggle = {}
	$scope.detail = {}

	$scope.showDetail = function(item, arg) {
		if (!($scope.showDetailToggle))
			$scope.showDetailToggle[arg] = true
		console.log(item, arg)
		$scope.$apply(function() {
			$scope.detail[arg] = item
		})
	}

	$scope.unshowDetail = function(arg) {
		$scope.showDetailToggle[arg] = false
		$scope.detail[arg] = null
	}
}])