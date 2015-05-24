'use strict'

var app = angular.module('twitter-app', ['ui.router', 'ui.bootstrap', 'ngD3', 'uiGmapgoogle-maps', 'cgBusy']);

app.config(['$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider', 
	function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {

	$urlRouterProvider.otherwise('/')

	$stateProvider
		.state('gun-control', {
			url: "/topic/gun-control",
			controller: "TopicController",
			templateUrl: "partials/topic.html",
			resolve: {
				topic: function() {
					return {
						name: "Gun Control"
					}
				}
			}
		})
		.state('immigration', {
			url: "/topic/immigration",
			controller: "TopicController",
			templateUrl: "partials/topic.html",
			resolve: {
				topic: function() {
					return {
						name: "Immigration"
					}
				}
			}
		})
		.state('unemployment', {
			url: "/topic/unemployment",
			controller: "TopicController",
			templateUrl: "partials/topic.html",
			resolve: {
				topic: function() {
					return {
						name: "Unemployment"
					}
				}
			}
		})
		.state('location', {
			url: "/location",
			controller: "LocationController",	
			templateUrl: "partials/location.html"
		})
		.state('hashtags', {
			url: "/hashtag",
			controller: "HashtagController",
			templateUrl: "partials/hashtags.html"
		})
		.state('social', {
			url: "/social-network",
			controller: "SocialController",
			templateUrl: "partials/social.html"
		})
		.state('emoji', {
			url: "/emoji",
			controller: "EmojiController",
			templateUrl: "partials/emoji.html"
		})
		.state('main', {
			url: "/",
			controller: "MainController",
			templateUrl: "partials/landing.html"
		})
		.state('test', {
			url: "/test",
			templateUrl: "partials/test.html"
		})

	uiGmapGoogleMapApiProvider.configure({
		key: "AIzaSyAR-tqoeOEtMdhf1M00teURELprVNUS-0k",
		v: '3.17',
		libraries: 'weather,geometry,visualization'
	});
}])