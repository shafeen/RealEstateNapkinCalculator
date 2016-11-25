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
            }, 4000)
        });
    };

    const SIGNUP_URL = '/signup';
    const SIGNUP_SUCCESS_URL = '/dashboard';
    navbar.signup = function () {
        // TODO: complete this -> create and bind verification functions
        console.log('attempting to sign up!');
        var signupParams = {
            email: $('#signup-email').val(),
            password: $('#signup-password').val()
        };
        $http.post(SIGNUP_URL, signupParams)
            .then(function success() {
                $window.location.href = SIGNUP_SUCCESS_URL;
            }, function failure() {
                $('#signup-errorPanel').show().find('.panel-body').text('Signup failed');
                $timeout(function () {
                    $('#signup-errorPanel').hide();
                }, 4000)
            });
    };

    navbar.verifySignup = function() {
        // TODO: complete this
    };

    navbar.clicked = function () {
        console.log('test click succeeded!');
    };
});