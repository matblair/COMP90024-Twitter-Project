app.controller("MainController", ["$scope", "uiGmapGoogleMapApi", function($scope, uiGmapGoogleMapApi) {	

	uiGmapGoogleMapApi.then(function(maps) {
		
		// carousel for SA.
		$scope.myInterval = 5000;
	  var slides = $scope.slides = [];
	  $scope.addSlide = function() {
	    var newWidth = 600 + slides.length + 1;
	    slides.push({
	      image: 'http://placekitten.com/' + newWidth + '/500',
	      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
	        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
	    });
	  };
	  for (var i=0; i<4; i++) {
	    $scope.addSlide();
	  }

	  // google maps for San Antonio 
	  $scope.sa = {
	  	center: {
	  		latitude: 29.4167,
	  		longitude: 98.5000
	  	},
	  	zoom: 8,
	  	options: {}
	  };
	});
}])