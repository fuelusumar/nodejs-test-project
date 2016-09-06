angular.module('test.usrs').controller('UsrsCtrl', ['$cookies', '$scope', '$location', '$http', 'Auth',
    function ($cookies, $scope, $location, $http, Auth) {
        if ($cookies.get('_id')) {
            if (!$cookies.get('version')) {
                //Auth.getVersion().then(function (version) {
                $cookies.put('version', '1');
                $scope.version = $cookies.get('version');
                //});
            } else {
                $scope.version = $cookies.get('version');
            }
            $scope._id = $cookies.get('_id');
            $scope.usrnm = $cookies.get('usrnm');
            $scope.name = $cookies.get('name');
            $scope.email = $cookies.get('email');
            $scope.footer = true;
            $scope.header = true;
            $scope.nav = true;
        } else {
            $location.url('login');
        }
        this.doLogout = Auth.doLogout;
        $http({
            method: 'GET',
            url: 'http://localhost/v1/users/' + $cookies.get("_id")
        }).success(function (data) {
            $scope.usrs = data.result;
        }).error(function (data) {
            $scope.msg = data.error.msg;
        });
    }
]);