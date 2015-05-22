app.controller("EmojiController", ["$scope", "$http", "uiGmapGoogleMapApi", function($scope, $http, uiGmapGoogleMapApi) {

	// INIT
	// Emoji Dictionary
	$scope.emojis = [
		"bowtie",
		"laughing",
		"smiley",
		"kissing_heart",
		"flushed",
		"satisfied",
		"wink",
		"stuck_out_tongue_closed_eyes",
		"kissing",
		"worried",
		"anguished",
		"grimacing",
		"hushed",
		"unamused",
		"sweat",
		"weary",
		"dissapointed",
		"fearful",
		"persevere",
		"blush",
		"smile"
	];
	$scope.selected_emoji = undefined;
	$scope.emoji_locations = [];
	$scope.loc_update_toggle = true;

	$scope.emojiUsageLocation = function(emoji) {
		//console.log("query sent", emoji)
		$scope.heatmapUpdate = $http.get("http://144.6.227.63:4500/emoji/" + emoji + "/locations").
			success(function(res) {
				//console.log(res)
				$scope.loc_update_toggle = false
				$scope.emoji_locations = res.locations;
				$scope.emoji_locations_count = res.count;

				uiGmapGoogleMapApi.then(function(maps) {
					$scope.map = {
						heatLayerCallback: function (layer) {
			        //set the heat layers backend data
			        var heatLayer = new MapHeatLayer(layer);
			      },
			      center: {
				  		latitude: 29.4167,
				  		longitude: -98.5000
				  	},
				  	zoom: 11,
				  	pan: true,
				  	options: {
				  		scrollwheel: false,
				  		panControl: true,
				  		draggable: true
				  	},
				  	heatmap: {
				  		options: {
				  			radius: 25,
				  			opacity: 0.9,
				  			dissipating: true
				  		}
				  	}
					}
				
					function MapHeatLayer(heatLayer) {
						var map, pointarray, heatmap;
						var locData = [];

						$scope.emoji_locations.forEach(function(d) {
							//console.log(d)
							locData.push(new maps.LatLng(d.lat, d.lon))
						})
						//console.log(locData);
						heatLayer.setData(new maps.MVCArray(locData))
					};
				});
			}).
			error(function(err) {
				console.log(err)
			});
	}
}]);