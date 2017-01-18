angular.module('search.controller', [])
	.controller('SearchController',function ($scope, searchResource) {

		
		$scope.search = function () {
			console.log($scope.searchText);
			searchResource.get({
				
				search: $scope.searchText,
			}, function (response) {
				$scope.shows = response.display_name ? response : '';

			});

		};


});