/**
 * Created by fuelusumar on 10/07/15.
 */
angular.module('test.usrs')
    .filter('usrnmFltr', function() {
        return function(value) {
            return '@' + String(value);
        }
    });
