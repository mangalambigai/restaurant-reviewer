/**
 * @ngdoc object
 * @name restaurantApp
 *
 * @description
 *
 */
angular.module('restaurantApp', ['ngRoute'])
.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/restaurants', {
            templateUrl: '/partials/list.html',
            controller: 'ListCtrl'
        }).
        when('/restaurant/:restaurantId', {
            templateUrl: '/partials/restaurant.html',
            controller: 'RestaurantCtrl'
        }).
        otherwise({
            redirectTo: '/restaurants'
        });
    }
])

.factory('restaurants', function($http) {
    return {
        get: function() {
            return $http.get('data/restaurants.json');
        }
    }
})

/**
 * @ngdoc controller
 * @name RestaurantListCtrl
 *
 * @description
 * Controller for the list of restaurants
 *
 */
.controller('RootCtrl', ['$scope',  function($scope) {

    $scope.init = function() {
        $scope.criteriatype = 'All types';
        $scope.criteriaprice = 'All prices';
        $scope.criteriarating = 'All ratings';
    };

}])

.controller('ListCtrl', ['$scope', 'restaurants', function($scope, restaurants) {
    $scope.init = function(){
        restaurants.get().then(function(response) {
            $scope.restaurants = response.data;
        });
    };
    $scope.filterRestaurants = function(element) {

        if ($scope.criteriatype !== 'All types')
        {
            //if (element.type)
        }
        if ($scope.criteriaprice != 'All prices')
        {
            if (element.price != $scope.criteriaprice)
                return false;
        }
        if ($scope.criteriarating != 'All ratings')
        {
            if (element.rating != $scope.criteriarating)
                return false;
        }
        return true;

    };

}])
.controller('RestaurantCtrl', ['$scope', 'restaurants', function($scope, restaurants) {
}]);
