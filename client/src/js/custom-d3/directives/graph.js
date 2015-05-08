angular.module("d3.graph", ["d3"])
	.directive("graph", ['d3Service', function(d3Service) {
		return {
			restrict: 'EA',
			scope: {},
			link: function(scope, element, attrs) {
				d3Service.d3().then(function(d3) {

					scope.render = function() {

					}
				})
			}
		}		
	}]);