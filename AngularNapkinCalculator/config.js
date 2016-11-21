angular.module('napkinCalculatorApp', ["ngRoute"])
.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "calculator.html",
            controller: "CalculatorCtrl as calculator"
        })
        .when("/calculator", {
            templateUrl: "calculator.html",
            controller: "CalculatorCtrl as calculator"
        })
        .when("/compare", {
            templateUrl: "compare.html",
            controller: "CompareCtrl as compare"
        });
});