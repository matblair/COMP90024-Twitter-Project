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
        .state('immigration', {
            url: "/topic/immigration",
            templateUrl: "partials/immigration.html"
        })
        .state('unemployment', {
            url: "/topic/unemployment",
            templateUrl: "partials/unemployment.html"
        })
        .state('comparison', {
            url: "/topic/comparison",
            templateUrl: "partials/comparison.html"
        })
        .state('location', {
            url: "/location",
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