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
	.directive('d3BarsLegend', ['d3Service', '$window', function(d3Service, $window) {
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

						var width = d3.select(element[0]).node().offsetWidth - margin,
							height = scope.data.length * (barHeight + barPadding),
							color = d3.scale.category20(),
							yScale = d3.scale.linear()
								.domain([0, d3.max(data, function(d) {
									return d[scope.numericalLabel];
								})])
								.range([0, width]);

						var categories = [];
						data.forEach(function(d) {
							categories.push(d["categoricalLabel"]);
						})

					};
				});
			}
		}
	}])