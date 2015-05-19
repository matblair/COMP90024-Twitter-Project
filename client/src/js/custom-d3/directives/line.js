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
	}])
	.directive("d3LineBrusher", ["d3Service", "$window", function(d3Service, $window) {
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

				var parseDate = d3.time.format("%b %Y").parse;

				var x = d3.time.scale().range([0, width]),
				    x2 = d3.time.scale().range([0, width]),
				    y = d3.scale.linear().range([height, 0]),
				    y2 = d3.scale.linear().range([height2, 0]);

				var xAxis = d3.svg.axis().scale(x).orient("bottom"),
				    xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
				    yAxis = d3.svg.axis().scale(y).orient("left");

				var brush = d3.svg.brush()
				    .x(x2)
				    .on("brush", brushed);

				var area = d3.svg.area()
				    .interpolate("monotone")
				    .x(function(d) { return x(d.date); })
				    .y0(height)
				    .y1(function(d) { return y(d.price); });

				var area2 = d3.svg.area()
				    .interpolate("monotone")
				    .x(function(d) { return x2(d.date); })
				    .y0(height2)
				    .y1(function(d) { return y2(d.price); });

				var svg = d3.select("body").append("svg")
				    .attr("width", width + 2 * margin)
				    .attr("height", height + 2 * margin);

				svg.append("defs").append("clipPath")
				    .attr("id", "clip")
				  .append("rect")
				    .attr("width", width)
				    .attr("height", height);

				var focus = svg.append("g")
				    .attr("class", "focus")
				    .attr("transform", "translate(" + margin + "," + margin + ")");

				var context = svg.append("g")
				    .attr("class", "context")
				    .attr("transform", "translate(" + margin + "," + margin + ")");

				d3.csv("sp500.csv", type, function(error, data) {
				  x.domain(d3.extent(data.map(function(d) { return d.date; })));
				  y.domain([0, d3.max(data.map(function(d) { return d.price; }))]);
				  x2.domain(x.domain());
				  y2.domain(y.domain());

				  focus.append("path")
				      .datum(data)
				      .attr("class", "area")
				      .attr("d", area);

				  focus.append("g")
				      .attr("class", "x axis")
				      .attr("transform", "translate(0," + height + ")")
				      .call(xAxis);

				  focus.append("g")
				      .attr("class", "y axis")
				      .call(yAxis);

				  context.append("path")
				      .datum(data)
				      .attr("class", "area")
				      .attr("d", area2);

				  context.append("g")
				      .attr("class", "x axis")
				      .attr("transform", "translate(0," + height2 + ")")
				      .call(xAxis2);

				  context.append("g")
				      .attr("class", "x brush")
				      .call(brush)
				    .selectAll("rect")
				      .attr("y", -6)
				      .attr("height", height2 + 7);
				});

				function brushed() {
				  x.domain(brush.empty() ? x2.domain() : brush.extent());
				  focus.select(".area").attr("d", area);
				  focus.select(".x.axis").call(xAxis);
				}

				function type(d) {
				  d.date = parseDate(d.date);
				  d.price = +d.price;
				  return d;
				}
			}
		}
	}]);	