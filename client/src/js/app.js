'use strict'

var app = angular.module('twitter-app', ['ui.router', 'ui.bootstrap']);

app.config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/')

    $stateProvider
        .state('topic', {
            url: "/topic",
            templateUrl: "partials/topic.html"
        })
        .state('generic', {
            url: "/generic",
            templateUrl: "partials/generic.html"
        })
        
}])