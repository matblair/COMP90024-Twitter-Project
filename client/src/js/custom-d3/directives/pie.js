angular.module('d3.pie', ['d3'])
	.directive('d3Pie', ['d3Service', '$window', function(d3Service, $window) {
		return {
			restrict: "E",
			scope: {
				data: "=",
				categoricalLabel: "@",
				numericalLabel: "@",
				onClick: "&"
			},
			link: function(scope, element, attrs) {
				d3Service.d3().then(function(d3) {

					var margin = parseInt(attrs.margin) || 20,
						height = parseInt(attrs.height) || 500

					window.onresize = function() {
						scope.$apply();
					};

					var svg = d3.select(element[0])
						.append("svg")
							.style('width', '100%');

					scope.$watch(function() {
						return angular.element($window)[0].innerWidth;
					}, function() {
						scope.render(scope.data);
					});

					scope.render = function(data) {
						var width = d3.select(element[0]).node().offsetWidth - margin,
							radius = Math.min(width, height) / 2;

						// remove dirty svg tags
						svg.selectAll('*').remove();

						// if there isnt any data, just don't render.
						if (!data) return;

						var _svg = svg.attr('height', height)
							.append("g")
								.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

						var color = d3.scale.category20();

						var arc = d3.svg.arc()
							.outerRadius(radius - 10)
							.innerRadius(0);

						var pie = d3.layout.pie()
							.sort(null)
							.value(function(d) {
								return d[scope.numericalLabel]
							});

						var g = _svg.selectAll(".arc")
							.data(pie(data))
							.enter()
								.append("g")
									.attr("class", "arc")
									.on("click", function(d, i) {
										return scope.onClick({item: d.data})
									})

						g.append("path")
							.attr("d", arc)
							.style("fill", function(d) {
								return color(d.data[scope.categoricalLabel]);
							})
							.transition().duration(1000);

						g.append("text")
							.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
							.attr("dy", ".35em")
							.style("text-anchor", "middle")
							.text(function(d) { 
								return d.data[scope.categoricalLabel]; 
							});
					}
				})
			}
		}
	}]);