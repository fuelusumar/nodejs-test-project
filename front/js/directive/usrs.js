angular.module('test.directive.usrCard', []).directive('usrCard', function () {
    return {
        restrict: 'E',
        scope: {
            usr: '='
        },
        replace: true,
        templateUrl: "templ/usrs/usr-card.html",
        link: function (scope, element, attrs) {
            //console.dir(arguments);
            element.click(function () {
                alert(scope.usr.usrnm);
            });
        },
        controller: function ($scope) {
            //alert("controller");
            console.dir($scope.usr);
        }
    };
});