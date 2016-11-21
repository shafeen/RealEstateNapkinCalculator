angular.module('napkinCalculatorApp')
.controller('NavbarCtrl', function ($location) {
    var navbar = this;
    navbar.$location = $location;
});