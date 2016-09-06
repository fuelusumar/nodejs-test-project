angular.module('test', [
    'ngRoute',
    'ngCookies',
    'test.auth',
    'test.usrs',
    'test.directive.usrCard'
]);

angular.module('test.auth', ['ngCookies']);

angular.module('test.usrs', ['ngCookies', 'test.auth', 'test.directive.usrCard']);