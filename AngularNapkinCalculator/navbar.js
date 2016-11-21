angular.module('napkinCalculatorApp')
.controller('NavBarCtrl', function ($location) {
    var navbar = this;
    navbar.$location = $location;
});