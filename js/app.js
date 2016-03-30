/**
 * @ngdoc object
 * @name restaurantApp
 * @requires ngRoute
 *
 * @description
 * Routes to different partials
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

/**
 * @ngdoc factory
 * @name restaurants
 *
 * @description
 * Gets the restaurants from json file
 */
.factory('restaurants', function($http) {
    return {
        get: function() {
            return $http.get('data/restaurants.json');
        }
    }
})

/**
 * @ngdoc controller
 * @name RootCtrl
 *
 * @description
 * Root Controller - has the filtering criteria
 *
 */
.controller('RootCtrl', ['$scope',  function($scope) {

    /**
     * Initializes the criteria
     */
    $scope.init = function() {
        $scope.criteriatype = 'All types';
        $scope.criteriaprice = 'All prices';
        $scope.criteriarating = 'All ratings';
    };

}])
/**
 * @ngdoc controller
 * @name ListCtrl
 *
 * @description
 * Controller for the list of restaurants
 *
 */
.controller('ListCtrl', ['$scope', 'restaurants', function($scope, restaurants) {
    /**
     * Initializes the list of restaurants
     */
    $scope.init = function(){
        restaurants.get().then(function(response) {
            $scope.restaurants = response.data;
        });
    };

    /**
     * Filters the restaurants based on criteria
     */
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

/**
 * @ngdoc controller
 * @name RestaurantCtrl
 *
 * @description
 * Controller for displaying a single restaurant
 *
 */
.controller('RestaurantCtrl', ['$scope', 'restaurants', function($scope, restaurants) {
}]);
