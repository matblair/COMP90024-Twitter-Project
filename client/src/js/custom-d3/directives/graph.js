angular.module("d3.graph", ["d3"])
	.directive("d3StickyGraph", ['d3Service', '$window', function(d3Service, $window) {
		return {
			restrict: 'E',
			scope: {
				data: '=',
				xLabel: '@',
				yLabel: '@',
				onClick: '&'
			},
			template: "<style> \
					.link { \
					  stroke: #000;\
					  stroke-width: 1.5px;\
					}\
\
					.node {\
					  cursor: move;\
					  fill: #ccc;\
					  stroke: #000;\
					  stroke-width: 1.5px;\
					}\
\
					.node.fixed {\
					  fill: #f00;\
					}\
\
					</style>",
			link: function(scope, element, attrs) {
				d3Service.d3().then(function(d3) {

					var margin = parseInt(attrs.margin) || 20,
						height = parseInt(attrs.height) || 500

					var svg = d3.select(element[0])
						.append("svg")
						.style('width', '100%')
						.attr("height", height)

					window.onresize = function() {
						scope.$apply();
					};

					scope.$watch(function() {
						return angular.element($window)[0].innerWidth;
					}, function() {
						scope.render(scope.data);
					});

					scope.render = function(data) {
						// if there is no data. Do not proceed.
						if (!data) return;

						var width = d3.select(element[0]).node().offsetWidth - margin;
						console.log(width)
						var force = d3.layout.force()
							.charge(-400)
							.linkDistance(40)
							.size([width, height])
							.on("tick", tick);

						var drag = force.drag()
							.on("dragstart", dragstart);

						// clear out dirty svg tags.
						svg.selectAll("*").remove()

						function tick() {
							link.attr("x1", function(d) { return d.source[attrs.xlabel]; })
								.attr("y1", function(d) { return d.source[attrs.ylabel]; })
								.attr("x2", function(d) { return d.target[attrs.xlabel]; })
								.attr("y2", function(d) { return d.target[attrs.ylabel]; });

							node.attr("cx", function(d) { return d[attrs.xlabel]; })
								.attr("cy", function(d) { return d[attrs.ylabel]; });
						}

						function dblclick(d) {
							d3.select(this).classed("fixed", d.fixed = false);
						}

						function dragstart(d) {
							d3.select(this).classed("fixed", d.fixed = true);
						}

						var link = svg.selectAll(".link"),
							node = svg.selectAll(".node");

						force
							.nodes(data.nodes)
							.links(data.links)
							.start();

						link = link.data(data.links)
							.enter().append("line")
								.attr("class", "link")

						node = node.data(data.nodes)
							.enter().append("circle")
								.attr("class", "node")
								.attr("r", 12)
								.on("dblclick", dblclick)
								.call(drag);

						
					}	
				})
			}
		}		
	}])
	.directive("d3DirectionalGraph", ["d3Service", "$window", 
		function(d3Service, $window) 
	{
		return {
			restrict: "E",
			scope: {
				data: '=',
				xLabel: '@',
				yLabel: '@',
				onClick: '&'
			},
			template: "<style>\
			\
			path.link { \
			  fill: none; \
			  stroke: #666; \
			  stroke-width: 1.5px; \
			} \
			\
			circle { \
			  fill: #ccc; \
			  stroke: #fff; \
			  stroke-width: 1.5px; \
			} \
			\
			text { \
			  fill: #000; \
			  font: 10px sans-serif; \
			  pointer-events: none; \
			} \
			</style>"
		},
		link: function(scope, element, attrs) {

		}
	}])