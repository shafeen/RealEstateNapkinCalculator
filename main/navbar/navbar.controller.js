angular.module('napkinCalculatorApp')
.controller('NavbarCtrl', function ($http, $location, $window, $timeout) {
    var navbar = this;

    navbar.$location = $location;

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
        if (verifySignupParams() == false) {
            console.log('there were errors in the signup params!');
            return;
        }

        var signupParams = {
            email: $('#signup-email').val(),
            password: $('#signup-password').val()
        };
        $http.post(SIGNUP_URL, signupParams)
            .then(function success() {
                $window.location.href = SIGNUP_SUCCESS_URL;
            }, function failure() {
                setSignupErrorMsg('Signup failed', true);
            });
    };

    function verifySignupParams() {
        // TODO: complete this and verify email and password here ---> maybe do it the angular way

        // TODO: verify email here --> do it the angular way
        var emailValid = validateEmail($('#signup-email').val());
        if (!emailValid) {
            invalidEmailHandler('You must enter a valid email address.');
            return false;
        }

        var signupPassword = $('#signup-password').val();
        var confirmedSignupPassword = $('#signup-password-confirm').val();
        var passwordsDontMatch = signupPassword != confirmedSignupPassword;
        var passwordValid = passwordsDontMatch ? false : validatePassword(signupPassword);
        if (passwordsDontMatch) {
            passwordErrorHandler('Your passwords must match.');
            return false;
        }
        if (!passwordValid) {
            passwordErrorHandler('Your password must be at least 8 characters long.');
            return false;
        }
        return true;
    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function validatePassword(password) {
        const MIN_LENGTH = 8;
        // TODO: add a few more password rules (min length, alphanumeric requirement, etc)
        if (password.length < MIN_LENGTH) {
            return false;
        }
        return true;
    }

    function invalidEmailHandler(message) {
        navbar.emailError = true;
        setSignupErrorMsg(message, true);
        $timeout(function () {
            navbar.emailError = false;
        }, 4000);
    }

    function passwordErrorHandler(message) {
        navbar.passwordError = true;
        setSignupErrorMsg(message, true);
        $timeout(function () {
            navbar.passwordError = false;
        }, 4000);
    }

    function setSignupErrorMsg(message, hideAfterwards) {
        $('#signup-errorPanel').show().find('.panel-body').text(message);
        if (hideAfterwards) {
            $timeout(function () {
                $('#signup-errorPanel').hide();
            }, 4000);
        }

    }


    navbar.clicked = function () {
        console.log('test click succeeded!');
    };
});