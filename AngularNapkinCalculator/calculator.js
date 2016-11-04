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
})
.controller('NapkinCalcCtrl', function ($location) {
    var calculator = this;

    calculator.$location = $location;

    calculator.downPaymentAmt = function () {
        calculator.model.downPaymentAmt = calculator.model.downPaymentPct * calculator.model.propertyPrice / 100;
        return calculator.model.downPaymentAmt;
    };
    calculator.mortgagePayment = function () {
        return calculator.getMonthlyMortgagePayment(
            calculator.model.propertyPrice()-calculator.downPaymentAmt(),
            calculator.model.interestPct,
            calculator.model.loanDurationYears
        );
    };
    calculator.mortgagePayment = function () {
        return getMonthlyMortgagePayment(
            calculator.model.propertyPrice-calculator.downPaymentAmt(),
            calculator.model.interestPct,
            calculator.model.loanDurationYears);
    };
    calculator.managementCost = function () {
        return calculator.model.expectedRent*calculator.model.managementCostPct;
    };
    calculator.repairFund = function () {
        return calculator.model.expectedRent *
            ((calculator.model.repairFundPct + calculator.model.capExPct) / 100);
    };
    calculator.vacancyAllowance = function () {
        return calculator.model.expectedRent*calculator.model.expectedVacancyPct/100;
    };
    calculator.cashFlow = function () {
        calculator.model.cashFlow = roundToDp(calculator.model.expectedRent
            - calculator.model.expectedHOA
            - calculator.managementCost()
            - calculator.repairFund()
            - calculator.model.expectedInsurance
            - calculator.model.expectedPropTaxes
            - calculator.mortgagePayment()
            - calculator.vacancyAllowance(), 2);
        return calculator.model.cashFlow;
    };
    function getMonthlyMortgagePayment(principal, interestPct, years) {
        var i = interestPct/1200;
        var n = years*12;
        return roundToDp((principal*(i*(Math.pow((1+i),n)))/(Math.pow((1+i),n)-1)), 2);
    }
    function roundToDp(num, numDp) {
        var factor = Math.pow(10, parseInt(numDp));
        return Math.round(num*factor)/factor;
    }
    calculator.netAnnualIncome = function () {
        return roundToDp(calculator.cashFlow()*12, 2);
    };
    calculator.capitalizationRate = function() {
        calculator.model.capRate = roundToDp((calculator.netAnnualIncome() + calculator.mortgagePayment()*12)*100
            / calculator.model.propertyPrice, 2);
        return calculator.model.capRate;

    };
    calculator.cashOnCashReturn = function () {
        calculator.model.cashOnCashReturn = roundToDp(calculator.netAnnualIncome() * 100 / calculator.downPaymentAmt(), 2);
        return calculator.model.cashOnCashReturn;
    };
    calculator.doublerYears = function () {
        return Math.ceil(72 / calculator.cashOnCashReturn());
    };

    // starting input data model
    calculator.model = {
        name: "Sample Property",
        propertyPrice: 100000,
        expectedRent: 1100,
        expectedHOA: 150,
        expectedInsurance: 70,
        expectedPropTaxes: 90,
        expectedVacancyPct: 8.34,
        repairFundPct: 5,
        managementCostPct: .1,
        capExPct: 5,
        downPaymentPct: 21,
        interestPct: 3.82,
        loanDurationYears: 30,

        downPaymentAmt: null,
        cashFlow: null,
        cashOnCashReturn: null,
        capRate: null
    };

    calculator.savedModels = {};

    calculator.saveCurrentModel = function () {
        var model = {};
        for (var property in calculator.model) {
            if (calculator.model.hasOwnProperty(property)) {
                model[property] = calculator.model[property];
            }
        }
        if (calculator.savedModels[model.name] != undefined) {
            alert('A property with the name "'+model.name+'" already exists!')
        } else {
            calculator.savedModels[model.name] = model;
        }
    };

    calculator.loadModel = function (model) {
        for (var property in model) {
            if (model.hasOwnProperty(property)) {
                calculator.model[property] = model[property];
            }
        }
    };

    calculator.removeModel = function (model) {
        if (confirm('Are you sure you want to remove "'+model.name+'"?')) {
            delete calculator.savedModels[model.name];
        }
    };


});