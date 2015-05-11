app.controller("FactController", ['$scope', function($scope) {

		$scope.tags = {
      "0":{
          "text":"yolo",
          "sentiment":"0.9",
          "subjectivity":"0.1",
          "popularity":"10%"
      },
      "1":{
          "text":"donkey",
          "sentiment":"0.9",
          "subjectivity":"0.1",
          "popularity":"20%"
      }
		}
	}])