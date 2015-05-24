angular.module("d3.bar", ["d3"])
	/*
	 * Bar Chart Directive 
	 * PARAMs:
	 * 	@data, JSON Object. 
	 * CONTROLLER Required Implementations:
	 *  @onClick Function. 
	 */ 
	.directive('d3Bars', ['d3Service', '$window', function(d3Service, $window) {
		return {
			scope: {
				data: '=',
				numericalLabel: '@',
				categoricalLabel: '@',
				onClick: '&'
			},
			restrict: 'E',
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
						// remove dirty svg tags
						svg.selectAll('*').remove();
						// if there isnt any data, just don't render.
						if (!data) return;
						// set in the graphic attributes
						var width = d3.select(element[0]).node().offsetWidth - margin,
							height = scope.data.length * (barHeight + barPadding),
							color = d3.scale.category20(),
							xScale = d3.scale.linear()
								.domain([0, d3.max(data, function(d) {
									return d[scope.numericalLabel];
								})])
								.range([0, width]);

						svg.attr('height', height);

						// Rendering of Data Values
						svg.selectAll('rect')
							.data(data).enter()
								.append('rect')
								.attr('height', barHeight)
								.attr('width', 140)
								.attr('x', Math.round(margin/2))
								.attr('y', function(d, i) {
									return i * (barHeight + barPadding);
								})
								.attr('fill', function(d) {
									return color(d[scope.numericalLabel]);
								})
								.on('click', function(d, i) {
									return scope.onClick({item: d});
								})
								.transition()
									.duration(1000)
									.attr('width', function(d) {
										return xScale(d[scope.numericalLabel]);
									})
						// Labels for Barchart 
						svg.selectAll('text')
							.data(data).enter()
								.append('text')
								.attr('fill', '#fff')
								.attr('y', function(d, i) {
									return i * (barHeight + barPadding) + 15;
								})
								.attr('x', 15)
								.text(function(d) {
									return d[scope.categoricalLabel];
								})
					};
				});
			}
		}
	}])
	// Data Input = List of Objects.
	.directive('d3BarsAxis', ['d3Service', '$window', function(d3Service, $window) {
		return {
			scope: {
				data: '=',
				ykey: '@',
				xkey: '@',
				height: '@'
			},
			template: " \
				<style> \
					.d3BarsAxis-bar { \
					  fill: steelblue; \
					}\
					\
					.d3BarsAxis-bar:hover { \
					  fill: brown; \
					} \
					\
					.d3BarsAxis-axis { \
					  font: 10px sans-serif; \
					} \
					\
					.d3BarsAxis-axis path, \
					.d3BarsAxis-axis line { \
					  fill: none; \
					  stroke: #000; \
					  shape-rendering: crispEdges; \
					} \
					\
					.d3BarsAxis-x.axis path { \
					  display: none; \
					}\
					\
				</style> \
			",
			restrict: 'E',
			link: function(scope, element, attrs) {
				d3Service.d3().then(function(d3) {
					var margin = parseInt(attrs.margin) || 50,
						barHeight = parseInt(attrs.barHeight) || 20,
						barPadding = parseInt(attrs.barPadding) || 5,
						height = parseInt(attrs.height) || 300;


					var _svg = d3.select(element[0])
							.append("svg")
							.style('width', '100%')
							.attr('height', height);

					window.onresize = function() {
						scope.$apply();
					};

					scope.$watch(function() {
						return angular.element($window)[0].innerWidth;
					}, function() {
						scope.render(scope.data);
					});

					scope.render = function(data) {

						// remove dirty svg tags
						_svg.selectAll('*').remove();
						//console.log(data);
						// if there isnt any data, just don't render.
						if (!data) return;

						var width = d3.select(element[0]).node().offsetWidth - 2 * margin;
						
						height = height - 2 * margin;

						var x = d3.scale.ordinal()
							.rangeRoundBands([0, width], .1);

						var y = d3.scale.linear()
							.range([height, 0]);

						var xAxis = d3.svg.axis()
							.scale(x)
							.orient("bottom");

						var yAxis = d3.svg.axis()
							.scale(y)
							.orient("left")
							.ticks(20);

						var svg = _svg.append("g")
												.attr("transform", "translate(" + margin + "," + margin + ")");

						console.log(data.map(function(d) { return d[attrs.xkey]}));

						x.domain(data.map(function(d) { return d[attrs.xkey] }));
						y.domain([0, d3.max(data, function(d) { return d[attrs.ykey] })]);

						svg.append("g")
							.attr("class", "d3BarsAxis-x axis")
							.attr("transform", "translate(0," + height + ")")
							.call(xAxis);

						svg.append("g")
							.attr("class", "d3BarsAxis-y axis")
							.call(yAxis)
						.append("text")
							.attr("transform", "rotate(-90)")
							.attr("y", 6)
							.attr("dy", ".71em")
							.style("text-anchor", "end")
							.text(attrs.ykey)

					  svg.selectAll(".d3BarsAxis-bar")
					      .data(data)
					    .enter().append("rect")
					      .attr("class", "d3BarsAxis-bar")
					      .attr("x", function(d) { return x(d[attrs.xkey]); })
					      .attr("width", x.rangeBand())
					      .attr("y", function(d) { return y(d[attrs.ykey]); })
					      .attr("height", function(d) { return height - y(d[attrs.ykey]); });

					  function type(d) {
					  	d[attrs.ykey] = +d[attrs.ykey];
					  	return d;
					  }
					};
				});
			}
		}
	}])