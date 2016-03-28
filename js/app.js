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
}]);
