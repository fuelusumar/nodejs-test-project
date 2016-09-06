angular.module('test.usrs').filter('usrnmFltr', function () {
    return function (value) {
        return '@' + String(value);
    }
});