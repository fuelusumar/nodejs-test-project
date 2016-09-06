angular.module('test.auth').controller('AuthCtrl', ['Auth',
    function (Auth) {
        this.doLogin = Auth.doLogin;
        this.doLogout = Auth.doLogout;
    }
]);