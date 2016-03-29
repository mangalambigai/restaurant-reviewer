/**
 * @ngdoc object
 * @name restaurantApp
 *
 * @description
 *
 */
angular.module('restaurantApp', [])
/**
 * @ngdoc controller
 * @name RestaurantListCtrl
 *
 * @description
 * Controller for the list of restaurants
 *
 */
.controller('RestaurantListCtrl', ['$scope', function($scope) {

    $scope.getData = function() {
        $.getJSON('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+
            '&radius=500&type=restaurant&key=', function(data) {

            console.log(data);
        });
        //https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY
    };

    $scope.init = function() {
        $.getJSON( 'data/restaurants.json', function() {
            console.log('got json data');
        }).done(function(data) {
            console.log(data);
            $scope.$apply(function() {
                $scope.restaurants = data;
            })
        }).fail(function(error) {
        	console.log(error);
        });

    };

    $scope.filterRestaurants = function(element) {

        return true;

    };
}]);
