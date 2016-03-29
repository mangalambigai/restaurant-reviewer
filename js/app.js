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
        $scope.type = 'All types';
        $scope.price = 'All prices';
        $scope.rating = 'All ratings';

        $.getJSON( 'data/restaurants.json', function() {
            console.log('got json data');
        }).done(function(data) {
            //console.log(data);
            $scope.$apply(function() {
                $scope.restaurants = data;
            })
        }).fail(function(error) {
        	console.log(error);
        });

    };

    $scope.filterRestaurants = function(element) {

        if ($scope.type !== 'All types')
        {
            //if (element.type)
        }
        if ($scope.price != 'All prices')
        {
            if (element.price != $scope.price)
                return false;
        }
        if ($scope.rating != 'All ratings')
        {
            if (element.rating != $scope.rating)
                return false;
        }
        return true;

    };
}]);
