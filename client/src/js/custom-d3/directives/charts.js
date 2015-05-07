'use strict'

angular.module("d3", [])
    .directive('heatmap', ['d3Service', function(d3Service){
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            // controller: function($scope, $element, $attrs, $transclude) {},
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            // templateUrl: '',
            // replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {
                
            }
        };
    }])
    .directive('barchart', ['d3Service', function(d3Service) {
        return {
            scope: {},
            restrict: 'EA',
            link: function(scope, element, attrs) {
                d3Service.d3().then(function(d3) {
                    var margin = parseInt(attrs.margin) || 20,
                        barHeight = parseInt(attr.barHeight) || 20,
                        barPadding = parseInt(attr.barPadding) || 5;

                    var svg = d3.select(element[0])
                            .append("svg")
                            .style('width', '100%')

                    window.onresize = function() {
                        scope.$apply();
                    };

                    scope.data = {

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
                        var width = d3.select(ele[0]).node().offsetWidth - margin,
                            height = scope.data.length * (barHeight + barPadding),
                            xScale = d3.scale.linear()
                                .domain([0, d3.max(data, function(d) {
                                    return d.score;
                                })])
                                .range([0, width]);

                        svg.attr('height', height);

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
                                    return color(d.score);
                                })
                                .transition()
                                    .duration(1000)
                                    .attr('width', function(d) {
                                        return xScale(d.score);
                                    })

                        /*
                        svg.selectAll('text')
                            .data(data).enter()
                                .append('text')
                                .attr('fill', '#fff')
                                .attr('y', function(d, i) {
                                    return i * (barHeight + barPadding) + 15;
                                })
                                .attr('x', 15)
                                .text(function(d) {
                                    return d.name + }
                                })
                        */
                    };
                });
                
            }
        }
    }])
    .directive('piechart', ['d3Service', function(d3Service) {

    }])