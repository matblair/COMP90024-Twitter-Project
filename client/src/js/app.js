'use strict'

var app = angular.module('twitter-app', ['ui.router', 'ui.bootstrap', 'ngD3', 'uiGmapgoogle-maps']);

app.config(['$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider',
	function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {

	$urlRouterProvider.otherwise('/')

	$stateProvider
		.state('gun-control', {
			url: "/topic/gun-control",
			templateUrl: "partials/gun-control.html"
		})
		.state('topics', {
			url: "/topics",
			templateUrl: "partials/topics.html"
		})
		.state('topics.overview', {
			url: "/overview",
			controller: "TopicsOverviewController",
			templateUrl: "partials/topics.overview.html"
		})
		.state('topics.topic', {
			url: "/topic/:name",
			controller: "TopicController",
			templateUrl: "partials/topics.topic.html",
			resolve: {
				topic: function($stateParams) {
					return {
						name: $stateParams.name
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
			templateUrl: "partials/hashtag.html"
		})
		.state('social', {
			url: "/social-network",
			templateUrl: "partials/social-network.html"
		})
		.state('emoji', {
			url: "/emoji",
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