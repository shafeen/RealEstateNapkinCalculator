angular.module('napkinCalculatorApp', ["ngRoute"])
.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "calculator/calculator.html",
            controller: "CalculatorCtrl as calculator"
        })
        .when("/calculator", {
            templateUrl: "calculator/calculator.html",
            controller: "CalculatorCtrl as calculator"
        })
        .when("/compare", {
            templateUrl: "compare/compare.html",
            controller: "CompareCtrl as compare"
        });
});