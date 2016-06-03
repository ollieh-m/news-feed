var newsSummaryApp = angular.module("newsSummaryApp", ['ngRoute']);

newsSummaryApp.config(function($routeProvider,$locationProvider){

	$routeProvider
		.when('/',{
			templateUrl: 'pages/feed.html',
			controller: 'NewsSummaryController'
		})
		.when('/summary',{
			templateUrl: 'pages/summary.html',
			controller: 'StorySummaryController'
		})

	$locationProvider.html5Mode(true)
	
})

