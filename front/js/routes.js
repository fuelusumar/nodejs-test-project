angular.module('test').config(function ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'templ/auth/login.html',
        controller: 'AuthCtrl',
        controllerAs: 'authCtrl'
    }).when('/users', {
        templateUrl: 'templ/usrs/usrs.html',
        controller: 'UsrsCtrl',
        controllerAs: 'usrsCtrl'
    }).otherwise({
        redirectTo: '/users'
    });
});