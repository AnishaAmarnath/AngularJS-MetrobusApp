angular.module('search.service', [])
	.factory('searchResource', function ($resource) {
		return $resource('/api/search');
	});