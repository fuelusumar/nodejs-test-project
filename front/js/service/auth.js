angular.module('test.auth').service('Auth', ['$http', '$cookies', '$location', '$q',
    function ($http, $cookies, $location, $q) {
        return {
            doLogin: function (login) {
                //alert("doLogin");
                login.dvc = "web";
                login.apikey_id = "552c1539155370e229eb56dd";
                $http({
                    method: 'POST',
                    url: 'http://localhost/v1/auth/login',
                    data: login
                }).success(function (data) {
                    var usr = data.result[0];
                    $cookies.put("_id", usr._id);
                    $cookies.put("usrnm", usr.usrnm);
                    $cookies.put("name", usr.name);
                    $cookies.put("email", usr.email);
                    $cookies.put("is_admin", usr.is_admin);
                    $cookies.put("has_vid", usr.has_vid);
                    if (usr.has_vid) {
                        $cookies.put("nameurl", usr.vid.nameurl);
                    }
                    $cookies.put("dvc", login.dvc);
                    $cookies.put("apikey_id", login.apikey_id);
                    $cookies.put("tkn_id", usr._tkn_id);
                    $location.url('usrs');
                }).error(function (data) {
                    alert(data.error.msg);
                });
            },
            doLogout: function () {
                //alert("doLogout");
                $http({
                    method: 'GET',
                    url: 'http://localhost/v1/auth/logout',
                }).success(function () {
                    $cookies.remove("_id");
                    $cookies.remove("usrnm");
                    $cookies.remove("name");
                    $cookies.remove("email");
                    $cookies.remove("is_admin");
                    $cookies.remove("has_vid");
                    $cookies.remove("nameurl");
                    $cookies.remove("dvc");
                    $cookies.remove("apikey_id");
                    $cookies.remove("tkn_id");
                    $location.url('login');
                }).error(function (data) {
                    alert(data.error.msg);
                });
            }
        }
    }
]);