var newsSummaryApp = angular.module("newsSummaryApp", ['ngRoute']);

newsSummaryApp.config(function($routeProvider,$locationProvider){

	$routeProvider
		.when('/',{
			templateUrl: 'pages/feed.html',
			controller: 'NewsSummaryController'
		})
		.when('/full',{
			templateUrl: 'pages/fullstory.html',
			controller: 'StoryController'
		})

	$locationProvider.html5Mode(true)
	
})

