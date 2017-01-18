
angular.module('app', 
	['ngRoute', 'ngResource', 'search.controller', 'search.service', 'show.controller', 'show.service'])
	.config(['$routeProvider', '$locationProvider', 
		function ($routeProvider, $locationProvider) {

			$routeProvider
				.when('/', {
					templateUrl: 'views/search.html',
					controller: 'SearchController'
				})
				.when('/show/:busid',{
					
                    templateUrl: 'views/show.html',
                    controller: 'ShowController',
                    resolve: {
                        show: function($route, ShowService){
                        	console.log("inside " + $route.current.params.busid);
                            return ShowService.get({busid: $route.current.params.busid})
                        }
                    }
                })
				.otherwise({
					redirectTo: '/'
				});

			$locationProvider.html5Mode(true);
	}]);