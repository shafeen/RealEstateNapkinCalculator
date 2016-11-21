angular.module('napkinCalculatorApp', ["ngRoute"])
.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "calculator.html",
            controller: "NapkinCalcCtrl as calculator"
        })
        .when("/calculator", {
            templateUrl: "calculator.html",
            controller: "NapkinCalcCtrl as calculator"
        })
        .when("/compare", {
            templateUrl: "compare.html",
            controller: "CompareCtrl as compare"
        });
});