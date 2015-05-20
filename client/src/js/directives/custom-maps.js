app.directive("heatmap", ["$window", "uiGmapGoogleMapApi", function($window, uiGmapGoogleMapApi) {
	return {
		cope: {
				data: '='
			},
			restrict: 'E',
			transclude: true,
			link: function(scope, element, attrs) {
				uiGmapGoogleMapApi.then(function(maps) {



					function MapHeatLayer(heatLayer) {
						var locData = [];

						scope.data.forEach(function(d) {
							locData.push(new maps.LatLng(d.latitude, d.longitude))
						})

						pointArray = new maps.MVCArray(locData);
						heatLayer.setData(pointArray)
						return heatLayer;
					}

				})
			}
	}
}]);