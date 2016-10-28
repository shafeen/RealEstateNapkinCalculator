angular.module('napkinCalculatorApp', [])
.controller('NapkinCalcCtrl', function () {
    var calculator = this;

    calculator.downPaymentAmt = function () {
        return calculator.model.downPaymentPct*calculator.model.propertyPrice/100;
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
        return roundToDp(calculator.model.expectedRent
            - calculator.model.expectedHOA
            - calculator.managementCost()
            - calculator.repairFund()
            - calculator.model.expectedInsurance
            - calculator.model.expectedPropTaxes
            - calculator.mortgagePayment()
            - calculator.vacancyAllowance(), 2);
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
    calculator.cashOnCashReturn = function () {
        return roundToDp(calculator.netAnnualIncome()*100 / calculator.downPaymentAmt(), 2);
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
        interestPct: 4.2,
        loanDurationYears: 30
    };

    calculator.savedModels = [];

    calculator.saveCurrentModel = function () {
        calculator.savedModels.push({
            name: calculator.model.name,
            propertyPrice: calculator.model.propertyPrice,
            expectedRent: calculator.model.expectedRent,
            expectedHOA: calculator.model.expectedHOA,
            expectedInsurance: calculator.model.expectedInsurance,
            expectedPropTaxes: calculator.model.expectedPropTaxes,
            expectedVacancyPct: calculator.model.expectedVacancyPct,
            repairFundPct: calculator.model.repairFundPct,
            managementCostPct: calculator.model.managementCostPct,
            capExPct: calculator.model.capExPct,
            downPaymentPct: calculator.model.downPaymentPct,
            interestPct: calculator.model.interestPct,
            loanDurationYears: calculator.model.loanDurationYears
        });
    };

    calculator.loadModel = function (model) {
        calculator.model = model;
    };


});