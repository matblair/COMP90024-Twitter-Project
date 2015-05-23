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
				onSelect: '&',
				onUnselect: '&'
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
			  fill: black; \
			  font: 14px sans-serif; \
			  pointer-events: none; \
			} \
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
						var width = d3.select(element[0]).node().offsetWidth - margin;

						if (!data) return;

						svg.selectAll("*").remove();

						/* 
						 * Link Builder automatically builds links based on the edges that have been linked
						 * using keywords source and target that are written in String instead of index.
						 * EXAMPLE INPUT:
						 * {
						 *	"links": [
						 *		{"source": "harry", "target": "sally"},
						 *		{"source": "sally", "target": "chloe"},
						 *		{"source": "chloe", "target": "harry"}
						 *	],
						 *	"nodes": [
						 *		{"name": "harry", "value": 0.7},
						 *		{"name": "sally", "value": 0.8},
						 *		{"name": "chloe", "value": 0.9}
						 *	]
						 * }; 
						 */
						var linkBuilder = function(links, nodes, source, target) {
							var edges = [];

							data.links.forEach(function(e) {
								var sourceNode = data.nodes.filter(function(n) { return n[source] === e.source; })[0],
									targetNode = data.nodes.filter(function(n) { return n[target] === e.target; })[0];
								edges.push({source: sourceNode, target: targetNode})
							});
							console.log("edges", edges)
							return edges;
						}

						var force = d3.layout.force()
							.nodes(d3.values(data.nodes))
							.links(linkBuilder(data.links, data.nodes, "name", "name"))
							.size([width, height])
							.linkDistance(100)
							.charge(-300)
							.on("tick", tick)
							.start();

						svg.append("svg:defs").selectAll("marker")
							.data(["end"])
							.enter().append("svg:marker")
								.attr("id", String)
								.attr("viewBox", "0 -5 10 10")
								.attr("refX", 25)
								.attr("refY", -1.5)
								.attr("markerWidth", 6)
								.attr("markerHeight", 6)
								.attr("orient", "auto")
								.append("svg:path")
									.attr("d", "M0, -5L10, 0L0, 5");

						// add the links and the arrows
						console.log(force.links())
						var path = svg.append("svg:g").selectAll("path")
						    .data(force.links())
						  .enter().append("svg:path")
						//    .attr("class", function(d) { return "link " + d.type; })
						    .attr("class", "link")
						    .attr("marker-end", "url(#end)");

						// define the nodes
						var node = svg.selectAll(".node")
						    .data(force.nodes())
						  .enter().append("g")
						    .attr("class", "node")
						    .on("click", click)
						    .on("dblclick", dblclick)
						    .call(force.drag);

						// add the nodes
						node.append("circle")
						    .attr("r", 12);

						// add the text 
						node.append("text")
						    .attr("x", 18)
						    .attr("dy", ".35em")
						    .style("stroke", "none")
						    .style("fill", "black")
				        .style("stroke", "none")
						    .text(function(d) { return d.name; });

						// add the curvy lines
						function tick() {
					    path.attr("d", function(d) {
				        var dx = d.target.x - d.source.x,
			            dy = d.target.y - d.source.y,
			            dr = Math.sqrt(dx * dx + dy * dy);
				        return "M" + 
			            d.source.x + "," + 
			            d.source.y + "A" + 
			            dr + "," + dr + " 0 0,1 " + 
			            d.target.x + "," + 
			            d.target.y;
				    	});

					    node
				        .attr("transform", function(d) { 
			  	    		return "translate(" + d.x + "," + d.y + ")"; 
			  	    	});
						}

						// action to take on mouse click
						function click(d) {
					    d3.select(this).select("text").transition()
				        .duration(750)
				        .attr("x", 25)
				        .style("fill", "steelblue")
				        .style("stroke", "lightsteelblue")
				        .style("stroke-width", ".5px")
				        .style("font", "20px sans-serif");
					    d3.select(this).select("circle").transition()
				        .duration(750)
				        .attr("r", 24)
				        .style("fill", "lightsteelblue");
				      return scope.onSelect({item: d})
						}

						// action to take on mouse double click
						function dblclick() {
					    d3.select(this).select("circle").transition()
				        .duration(750)
				        .attr("r", 12)
				        .style("fill", "#ccc");
					    d3.select(this).select("text").transition()
				        .duration(750)
				        .attr("x", 18)
				        .style("stroke", "none")
				        .style("fill", "black")
				        .style("stroke", "none")
				        .style("font", "14px sans-serif");

				      return scope.onUnselect();
						}
					}
				})
			}
		}
	}])