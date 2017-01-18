var ss = angular.module('show.service',[]);
    ss.factory('ShowService', function ($resource) {
        return $resource('/api/show/:busid');
    });
    ss.factory('emailResource', function ($resource) {
		return $resource('/api/email');
	});