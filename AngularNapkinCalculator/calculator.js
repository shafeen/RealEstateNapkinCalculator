angular.module('napkinCalculatorApp')
.controller('NapkinCalcCtrl', function ($location) {
    var calculator = this;

    calculator.downPaymentAmt = function () {
        calculator.model.downPaymentAmt = calculator.model.downPaymentPct * calculator.model.propertyPrice / 100;
        return calculator.model.downPaymentAmt;
    };
    calculator.mortgagePayment = function () {
        calculator.model.mortgagePayment = getMonthlyMortgagePayment(
            calculator.model.propertyPrice-calculator.downPaymentAmt(),
            calculator.model.interestPct,
            calculator.model.loanDurationYears);
        return calculator.model.mortgagePayment;
    };
    calculator.managementCost = function () {
        calculator.model.managementCost = calculator.model.expectedRent*calculator.model.managementCostPct;
        return calculator.model.managementCost;
    };
    calculator.repairFund = function () {
        calculator.model.repairFund = calculator.model.expectedRent *
            ((calculator.model.repairFundPct + calculator.model.capExPct) / 100);
        return calculator.model.repairFund;
    };
    calculator.vacancyAllowance = function () {
        calculator.model.vacancyAllowance = calculator.model.expectedRent*calculator.model.expectedVacancyPct/100;
        return calculator.model.vacancyAllowance;
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
        calculator.model.netAnnualIncome = roundToDp(calculator.cashFlow()*12, 2);
        return calculator.model.netAnnualIncome;
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
        calculator.model.doublerYears = Math.ceil(72 / calculator.cashOnCashReturn());
        return calculator.model.doublerYears;
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
        mortgagePayment: null,
        cashFlow: null,
        netAnnualIncome: null,
        managementCost: null,
        repairFund: null,
        vacancyAllowance: null,
        cashOnCashReturn: null,
        capRate: null,
        doublerYears: null
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

    calculator.loadCalcModel = function (model) {
        for (var property in model) {
            if (model.hasOwnProperty(property)) {
                calculator.model[property] = model[property];
            }
        }
        $location.path('/calculator');
    };

    calculator.loadDetailModel = function (model) {
        calculator.detailModel = calculator.detailModel || {};
        for (var property in model) {
            if (model.hasOwnProperty(property)) {
                calculator.detailModel[property] = model[property];
            }
        }
    };

    calculator.removeModel = function (model) {
        if (confirm('Are you sure you want to remove "'+model.name+'"?')) {
            delete calculator.savedModels[model.name];
        }
    };

    calculator.toggleCompareOptions = function () {
        if ($('#sortFilterOptions').hasClass('in')) {
            $('#sortFilterOptions').collapse('hide');
        } else {
            $('#sortFilterOptions').collapse('show');
        }
    };


});