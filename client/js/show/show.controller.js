angular.module('show.controller',['ngMap'])
    .controller('ShowController', function($scope,NgMap, show, emailResource){
    	NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });
        $scope.show = show;
        $scope.sendemail = function () {
            var bus_routes ='';
            for (var i =0;i<$scope.show.items.length; i++) {
                bus_routes = bus_routes + $scope.show.items[i].display_name + '\n';
            }
            emailResource.get({                
                emailid: $scope.emailid,
                busrroutes : bus_routes,
            }, function (response) {
                $scope.emailstatus = "Email Sent to email id : " + $scope.emailid;
                $scope.emailid='';

            });

        };
    });