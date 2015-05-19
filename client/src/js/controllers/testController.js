app.controller('TestController',['$scope', function($scope) {
	$scope.data = [
		{name: "Donkey", value: 24},
		{name: "Monkey", value: 92},
		{name: "Cow", value: 22},
		{name: "Dog", value: 49}
	]

	$scope.data1 = {
	  "nodes": [
	    {"x": 469, "y": 410},
	    {"x": 493, "y": 364},
	    {"x": 442, "y": 365},
	    {"x": 467, "y": 314},
	    {"x": 477, "y": 248},
	    {"x": 425, "y": 207},
	    {"x": 402, "y": 155},
	    {"x": 369, "y": 196},
	    {"x": 350, "y": 148},
	    {"x": 539, "y": 222},
	    {"x": 594, "y": 235},
	    {"x": 582, "y": 185},
	    {"x": 633, "y": 200}
	  ],
	  "links": [
	    {"source":  0, "target":  1},
	    {"source":  1, "target":  2},
	    {"source":  2, "target":  0},
	    {"source":  1, "target":  3},
	    {"source":  3, "target":  2},
	    {"source":  3, "target":  4},
	    {"source":  4, "target":  5},
	    {"source":  5, "target":  6},
	    {"source":  5, "target":  7},
	    {"source":  6, "target":  7},
	    {"source":  6, "target":  8},
	    {"source":  7, "target":  8},
	    {"source":  9, "target":  4},
	    {"source":  9, "target": 11},
	    {"source":  9, "target": 10},
	    {"source": 10, "target": 11},
	    {"source": 11, "target": 12},
	    {"source": 12, "target": 10}
	  ]
	}

	$scope.data2 = {
		"links": [
			{"source": "harry", "target": "sally"},
			{"source": "sally", "target": "chloe"},
			{"source": "chloe", "target": "harry"}
		],
		"nodes": [
			{"name": "harry", "value": 0.7},
			{"name": "sally", "value": 0.8},
			{"name": "chloe", "value": 0.9}
		]
	};

	$scope.data3 = [	
		{"date": 1200, "count": 100},
		{"date": 1201, "count": 120},
		{"date": 1202, "count": 128},
		{"date": 1203, "count": 90}
	];

	$scope.showDetailToggle = {}
	$scope.detail = {}

	$scope.showDetail = function(item, arg) {
		if (!($scope.showDetailToggle))
			$scope.showDetailToggle[arg] = true
		$scope.$apply(function() {
			$scope.detail[arg] = item
		})
	}

	$scope.unshowDetail = function(arg) {
		$scope.showDetailToggle[arg] = false
		$scope.detail[arg] = null
	}
}])