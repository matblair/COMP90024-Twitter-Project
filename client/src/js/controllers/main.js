app.controller("MainController", ["$scope", "uiGmapGoogleMapApi", function($scope, uiGmapGoogleMapApi) {	

	uiGmapGoogleMapApi.then(function(maps) {
		
		// carousel for SA.
		$scope.myInterval = 5000;
	  var slides = $scope.slides = [];
	  $scope.addSlide = function() {
	  	slides.push({
	    	image: "http://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Alamo_pano.jpg/1280px-Alamo_pano.jpg",
	    	text: "Alamo in San Antonio"
	    });
	    slides.push({
	      image: "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/San_Antonio_Christmas.jpg/600px-San_Antonio_Christmas.jpg",
	      text: "Downtown San Antonio @ Night"
	    });

	    slides.push({
	    	image: "http://upload.wikimedia.org/wikipedia/commons/4/48/Downtown-san-antonio.jpeg",
	    	text: "Downtown San Antonio @ Daytime"
	    });
	  };
	  $scope.addSlide()

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