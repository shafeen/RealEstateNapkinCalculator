angular.module('napkinCalculatorApp')
.controller('NapkinCalcCtrl', function ($location, PropertyService) {
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
    calculator.model = PropertyService.getTempModel() || PropertyService.getNewDefaultModel();
    PropertyService.clearTempModel(); // TODO: this should be done automatically

    calculator.savedModels = PropertyService.getSavedModels();

    calculator.saveCurrentModel = function () {
        PropertyService.saveModel(calculator.model);
    };

    calculator.loadCalcModel = function (model) {
        PropertyService.pushTempModel(model);
        calculator.model = PropertyService.getTempModel();
        PropertyService.clearTempModel();
    };
});