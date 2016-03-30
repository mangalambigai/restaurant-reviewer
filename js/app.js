/**
 * @ngdoc object
 * @name restaurantApp
 * @requires ngRoute
 *
 * @description
 * Routes to different partials
 */
angular.module('restaurantApp', ['ngRoute', 'ui.bootstrap'])
.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/restaurants', {
            templateUrl: '/partials/list.html',
            controller: 'ListCtrl'
        }).
        when('/restaurant/:restaurant', {
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
.controller('ListCtrl', ['$scope', '$location', 'restaurants',
    function($scope, $location, restaurants) {
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

    /**
     * Navigates to specific restaurant
     */
    $scope.viewRestaurant = function(restaurantname) {
        $location.path('/restaurant/'+restaurantname);
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
.controller('RestaurantCtrl', ['$scope', '$routeParams', 'restaurants',
    function($scope, $routeParams, restaurants) {

    $scope.init = function() {
        $scope.stars = 0;
        restaurants.get().then( function(response) {
                $scope.restaurant = response.data.find(function(restaurant) {
                    return restaurant.name == $routeParams.restaurant;
                });

                if ($scope.restaurant.reviews)
                {
                    $.getJSON($scope.restaurant.reviews)
                    .done(function(json) {
                        console.log(json);
                        $scope.$apply(function(){
                           $scope.comments = json;
                        });
                    });
                }
            }
        );
    };
}]);
