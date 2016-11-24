angular.module('napkinCalculatorApp')
.controller('NavbarCtrl', function ($http, $location, $window, $timeout) {
    var navbar = this;

    navbar.$location = $location;
    navbar.$window = $window;

    const LOGIN_URL = '/login';
    const LOGIN_SUCCESS_URL = '/dashboard';
    navbar.login = function() {
        var loginParams = {
            email: $('#email').val(),
            password: $('#password').val()
        };
        $http.post(LOGIN_URL, loginParams)
        .then(function success() {
            $window.location.href = LOGIN_SUCCESS_URL;
        }, function failure() {
            $('#errorPanel').show().find('.panel-body').text('Login failed');
            $timeout(function () {
                $('#errorPanel').hide();
            }, 3000)
        });
    };

    navbar.clicked = function () {
        alert('test click succeeded!')
    };
});