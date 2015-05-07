angular.module("d3", [])
    .directive("graph", ['d3Service', function(d3Service) {
        return {
            restrict: 'EA',
            scope: {},
            link: function(scope, element, attrs) {
                
            }
        }
    }])