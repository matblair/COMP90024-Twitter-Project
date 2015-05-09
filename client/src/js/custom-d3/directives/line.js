/*
 * Angular D3 Line Chart Template
 * HTML Attributes: 
 * @xlabel, X-Axis Label, DOM binding
 * @ylabel, Y-Axis Label, DOM binding
 * @data, data for the line chart, Two-Way Binding.
 * @height, height of the chart, DOM binding.
 * @margin, white space between the diagram and the parent element, DOM binding.
 * @onClick, event handler injector. Use this to pass data from the line chart 
 * back to the parent controller.
 */
angular.module("d3.line", ["d3"])
	.directive("d3Line", ["d3Service", "$window", function(d3Service, $window) {
		return {
			restrict: "E",
			scope: {
				xlabel: "@",
				ylabel: "@",
				data: "=",
				height: "@",
				margin: "@",
				onClick: "&"
			},
			link: function(scope, element, attrs) {
				var margin = parseInt(attrs.margin) || 20,
					height = parseInt(attrs.height) || 500;

				var svg = d3.select(element[0])
					.append("svg")
						.style("width", "100%")
						.append("g")
							.attr("transform", "translate(" + margin + "," + margin + ")");

				window.onresize = function() {
					scope.$apply()
				}

				scope.$watch(function() {
						return angular.element($window)[0].innerWidth;
					}, function() {
						scope.render(scope.data);
					});

				scope.render = function(data) {
					// remove dirty tags.
					svg.selectAll("*").remove()

					// support for multitype scale required for both x and y.
					var x = d3.time.scale()
						.range([0, width]);

					var y = d3.scale.linear()
						.range([height, 0]);

					var xAxis = d3.svg.axis()
						.scale(x)
						.orient("bottom");

					var yAxis = d3.svg.axis()
						.scale(y)
						.orient("left");

					var line = d3.svg.line()
						.x(function(d) { return x(d[attrs.xlabel]) })
						.y(function(d) { return y(d[attrs.ylabel]) });

					svg.append("g")
						.attr("class", "x-axis")
						.attr("transform", "translate(0," + height + ")")
						.call(xAxis)

					svg.append("g")
						.attr("class", "y-axis")
						.call(yAxis)
						.append("text")
							.attr("transform", "rotate(-90)")
							.attr("y", 6)
							.attr("dy", ".71em")
							.attr("text-anchor", "end")
							.text(attrs.ylabel)

					svg.append("path")
						.datum(data)
						.attr("class", "line")
						.attr("d", line)
				}
			}
		}
	}]);