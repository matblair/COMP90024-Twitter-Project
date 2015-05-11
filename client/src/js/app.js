'use strict'

var app = angular.module('twitter-app', ['ui.router', 'ui.bootstrap', 'ngD3']);

app.config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {

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
        .state('proportions', {
            url: "/proportions",
            templateUrl: "partials/proportions.html"
        })
        .state('relationships', {
            url: "/relationships",
            templateUrl: "partials/relationships.html"
        })
        .state('facts', {
            url: "/facts",
            controller: "FactController",
            templateUrl: "partials/facts.html"
        })
        .state('main', {
            url: "/",
            templateUrl: "partials/landing.html"
        })
        .state('test', {
            url: "/test",
            templateUrl: "partials/test.html"
        })
}])