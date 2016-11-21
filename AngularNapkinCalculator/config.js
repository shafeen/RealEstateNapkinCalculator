angular.module('napkinCalculatorApp', ["ngRoute"])
.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "calculator.html"
        })
        .when("/calculator", {
            templateUrl: "calculator.html"
        })
        .when("/compare", {
            templateUrl: "compare.html"
        });
});