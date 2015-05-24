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
				ylabel: "@",
				data: "=",
				height: "@",
				onClick: "&"
			},
			template: " \
				<style> \
				svg { \
				  font: 10px sans-serif; \
				} \
				\
				.area { \
				  fill: steelblue; \
				  clip-path: url(#clip); \
				} \
				.axis path, \
				.axis line { \
				  fill: none; \
				  stroke: #000; \
				  shape-rendering: crispEdges; \
				} \
 				\
				.brush .extent { \
				  stroke: #fff; \
				  fill-opacity: .125; \
				  shape-rendering: crispEdges; \
				} \
				</style> \
			",
			link: function(scope, element, attrs) {
				d3Service.d3().then(function(d3) {
					var height = parseInt(attrs.height) || 500;

					window.onresize = function() {
							scope.$apply();
					};

					scope.$watch(function() {
						return angular.element($window)[0].innerWidth;
					}, function() {
						scope.render(scope.data);
					});

					var svg = d3.select(element[0])
						.append("svg")
						.style('width', '100%')
						.attr("height", height)

					scope.render = function(data) {

						if (!data) return 

						svg.selectAll("*").remove();

						var margin1 = {top: 10, right: 10, bottom: (0.3 * height), left: 40},
							margin2 = {top: (0.8 * height), right: 10, bottom: 20, left: 40},
							width = d3.select(element[0]).node().offsetWidth - margin1.left - margin1.right,
							height1 = height - margin1.top - margin1.bottom,
							height2 = height - margin2.top - margin2.bottom;

						
						var parseDate = d3.time.format().parse;
						
						var x = d3.time.scale().range([0, width]),
					    x2 = d3.time.scale().range([0, width]),
					    y = d3.scale.linear().range([height1, 0]),
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
					    .y0(height1)
					    .y1(function(d) { return y(d[attrs.ylabel]); });

						var area2 = d3.svg.area()
					    .interpolate("monotone")
					    .x(function(d) { return x2(d.date); })
					    .y0(height2)
					    .y1(function(d) { return y2(d[attrs.ylabel]); });

				   	svg.append("defs").append("clipPath")
					    .attr("id", "clip")
					  .append("rect")
					    .attr("width", width)
					    .attr("height", 0.9 * height1);

						var focus = svg.append("g")
					    .attr("class", "focus")
					    .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

						var context = svg.append("g")
					    .attr("class", "context")
					    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

					  x.domain(d3.extent(scope.data.map(function(d) { return d.date; })));
					  y.domain([0, d3.max(scope.data.map(function(d) { return d[attrs.ylabel]; }))]);
					  x2.domain(x.domain());
					  y2.domain(y.domain());

					  focus.append("path")
				      .datum(scope.data)
				      .attr("class", "area")
				      .attr("d", area);

				  	focus.append("g")
				      .attr("class", "x axis")
				      .attr("transform", "translate(0," + height1 + ")")
				      .call(xAxis);

				  	focus.append("g")
				      .attr("class", "y axis")
				      .call(yAxis);

				  	context.append("path")
				      .datum(scope.data)
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
				      	.attr("height", height1 + 7);

				    function brushed() {
						  x.domain(brush.empty() ? x2.domain() : brush.extent());
						  focus.select(".area").attr("d", area);
						  focus.select(".x.axis").call(xAxis);
						}

						function type(d) {
						  d.date = parseDate(d.date);
						  d[attrs.ylabel] = +d[attrs.ylabel];
						  return d;
						}
					};
				});
			}
		}
	}])
	// This fucking directive took me more than 3 hours to fix. Fuck Javascript. 
	.directive("d3MultiLineBrusher", ["d3Service", "$window", function(d3Service, $window) {
		return {
			restrict: "E",
			scope: {
				dateFormat: "@",
				ylabel: "@",
				data: "=",
				height: "@",
				onClick: "&"
			},
			template: " \
				<style> \
					.d3MultiLineBrusher-axis d3MultiLineBrusher-path, \
					.d3MultiLineBrusher-axis d3MultiLineBrusher-line { \
					  fill: none; \
					  stroke: #000; \
					  shape-rendering: crispEdges; \
					} \
					\
					.d3MultiLineBrusher-x.axis d3MultiLineBrusher-path { \
					  display: none; \
					} \
					\
					.d3MultiLineBrusher-line { \
					  fill: none; \
					  stroke: steelblue; \
					  stroke-width: 1.5px; \
					} \
					\
					.d3MultiLineBrusher-brush .d3MultiLineBrusher-extent { \
					  stroke: #fff; \
					  fill-opacity: .125; \
					  shape-rendering: crispEdges; \
					} \
					</style> \
					\
			",
			link: function(scope, element, attrs) {
				d3Service.d3().then(function(d3) {

					var height = parseInt(attrs.height) || 500,
						dateFormat = attrs.dateFormat || "%Y%m%d";

					window.onresize = function() {
							scope.$apply();
					};

					scope.$watch(function() {
						return angular.element($window)[0].innerWidth;
					}, function() {
						scope.render(scope.data);
					});

					var svg = d3.select(element[0])
						.append("svg")
						.style('width', '100%')
						.attr("height", height)

					/* RENDER START */
					scope.render = function(data) {
						if (!data) return;

						svg.selectAll("*").remove();

						// Set up all the sizes
						var margin1 = {top: 10, right: 10, bottom: (0.3 * height), left: 40},
							margin2 = {top: (0.8 * height), right: 10, bottom: 20, left: 40},
							width = d3.select(element[0]).node().offsetWidth - margin1.left - margin1.right,
							height1 = height - margin1.top - margin1.bottom,
							height2 = height - margin2.top - margin2.bottom;

						//var parseDate = d3.time.format(dateFormat).parse;

					  /* DOMAIN */
					  var x = d3.time.scale().range([0, width]),
					    x2 = d3.time.scale().range([0, width]),
					    y = d3.scale.linear().range([height1, 0]),
					    y2 = d3.scale.linear().range([height2, 0]);

					  var line = d3.svg.line()
					    .interpolate("basis")
					    .x(function(d) { return x(d.date); })
					    .y(function(d) { return y(d.value); });

					  var color = d3.scale.category10();
					  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date" }));

					 	data.forEach(function(d) {
					 		d.date = d.date;
					 	});

					 	var categories = color.domain().map(function(name) {
					 		return {
					      name: name,
					      values: data.map(function(d) {
					        return {date: d.date, value: +d[name]};
					      })
					    };
					 	});

					 	x.domain(d3.extent(data.map(function(d) { return d.date; })));
					  y.domain([
					    d3.min(categories, function(c) { return d3.min(c.values, function(v) { return v.value; }); }),
					    d3.max(categories, function(c) { return d3.max(c.values, function(v) { return v.value; }); })
					  ]);
					  x2.domain(x.domain());
					  y2.domain(y.domain());

					  var xAxis = d3.svg.axis().scale(x).orient("bottom"),
					    xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
					    yAxis = d3.svg.axis().scale(y).orient("left");

					  svg.append("defs").append("clipPath")
					    .attr("id", "clip")
						  .append("rect")
						    .attr("width", width)
						    .attr("height", height);

						var focus = svg.append("g")
					    .attr("class", "focus")
					    .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

						var context = svg.append("g")
					    .attr("class", "context")
					    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");


					  focus.append("g")
				      .attr("class", "d3MultiLineBrusher-x axis")
				      .attr("transform", "translate(0," + height + ")")
				      .call(xAxis);

				  	focus.append("g")
				      .attr("class", "d3MultiLineBrusher-y axis")
				      .call(yAxis)
				    .append("text")
				      .attr("transform", "rotate(-90)")
				      .attr("y", 6)
				      .attr("dy", ".71em")
				      .style("text-anchor", "end")
				      .text(attrs.ylabel.toString());

				 		var category = focus.selectAll(".cat")
				    	.data(categories)
				    	.enter().append("g")
				    		.attr("class", "d3MultiLineBrusher-cat")

				    category.append("path")
				    	.attr("class", "d3MultiLineBrusher-line")
				      .attr("d", function(d) { return line(d.values); })
				      .style("stroke", function(d) { return color(d.name); });

				  	context.append("g")
				      .attr("class", "d3MultiLineBrusher-x axis")
				      .attr("transform", "translate(0," + height2 + ")")
				      .call(xAxis2);

				    var category1 = context.selectAll(".cat1")
				    	.data(categories)
				    	.enter().append("g")
				    		.attr("class", "d3MultiLineBrusher-cat1")

				    category1.append("path")
				    	.attr("class", "d3MultiLineBrusher-line")
				      .attr("d", function(d) { return line(d.values); })
				      .style("stroke", function(d) { return color(d.name); });

				    var brush = d3.svg.brush()
					    .x(x2)
					    .on("brush", brushed);

				    context.append("g")
				      .attr("class", "d3MultiLineBrusher-x brush")
				      .call(brush)
				    .selectAll("rect")
				      .attr("y", -6)
				      .attr("height", height2 + 7);

				    function brushed() {
						  x.domain(brush.empty() ? x2.domain() : brush.extent());
						  focus.selectAll(".d3MultiLineBrusher-cat")
						  	.selectAll("path")
						  	.transition().duration(250)
						  	.attr("d", function(d) { return line(d.values) });
						  focus.select(".d3MultiLineBrusher-x.axis")
						  	.transition().duration(250)
						  	.call(xAxis);
						};

					}
					/* RENDER END */
				});
			}
		}
	}])