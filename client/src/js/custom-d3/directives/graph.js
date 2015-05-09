angular.module("d3.graph", ["d3"])
	.directive("graph", ['d3Service', '$window', function(d3Service, $window) {
		return {
			restrict: 'E',
			scope: {
				data: '=',
				numericalLabel: '@',
				categoricalLabel: '@',
				onClick: '&'
			},
			link: function(scope, element, attrs) {
				d3Service.d3().then(function(d3) {

					var margin = parseInt(attrs.margin) || 20,
						barHeight = parseInt(attrs.barHeight) || 20,
						barPadding = parseInt(attrs.barPadding) || 5;

					var svg = d3.select(element[0])
							.append("svg")
							.style('width', '100%')

					window.onresize = function() {
						scope.$apply();
					};

					scope.$watch(function() {
						return angular.element($window)[0].innerWidth;
					}, function() {
						scope.render(scope.data);
					});

					scope.render = function(data) {
						
					}	
				})
			}
		}		
	}]);