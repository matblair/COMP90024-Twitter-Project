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
	  		longitude: -98.5000
	  	},
	  	zoom: 8,
	  	pan: false,
	  	options: {
	  		scrollwheel: false,
	  		panControl: false,
	  		draggable: false
	  	},
	  	circle: {
	  		radius: 100000,
	  		stroke: {
	        color: '#08B21F',
	        weight: 2,
	        opacity: 1
	    	},
	    	fill: {
          color: '#08B21F',
          opacity: 0.5
      	},
      	geodesic: true, // optional: defaults to false
        draggable: true, // optional: defaults to false
        clickable: true, // optional: defaults to true
        editable: true, // optional: defaults to false
        visible: true, // optional: defaults to true
        control: {}
	  	}
	  };
	});
}])