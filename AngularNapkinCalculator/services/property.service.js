angular.module('napkinCalculatorApp')
.service('PropertyService', function () {

    this.Property = function () {
        this.name = "Sample Property";
        this.propertyPrice = 100000;
        this.expectedRent = 1100;
        this.expectedHOA = 150;
        this.expectedInsurance = 70;
        this.expectedPropTaxes = 90;
        this.expectedVacancyPct = 8.34;
        this.repairFundPct = 5;
        this.managementCostPct = .1;
        this.capExPct = 5;
        this.downPaymentPct = 21;
        this.interestPct = 3.82;
        this.loanDurationYears = 30;

        this.downPaymentAmt = null;
        this.mortgagePayment = null;
        this.cashFlow = null;
        this.netAnnualIncome = null;
        this.managementCost = null;
        this.repairFund = null;
        this.vacancyAllowance = null;
        this.cashOnCashReturn = null;
        this.capRate = null;
        this.doublerYears = null;
    };

    // tempModel used to pass models (Property objects) between controllers
    this.tempModel = null;

    this.savedModels = {};

    this.getNewDefaultModel = function () {
        return new this.Property();
    };

    this.getSavedModels = function() {
        return this.savedModels;
    };

    this.getTempModel = function () {
        return this.tempModel;
    };

    this.pushTempModel = function (modelToPush) {
        var model = {};
        for (var property in modelToPush) {
            if (modelToPush.hasOwnProperty(property)) {
                model[property] = modelToPush[property];
            }
        }
        this.tempModel = model;
    };

    this.clearTempModel = function () {
        this.tempModel = null;
    };

    this.saveModel = function (modelToSave) {
        var model = {};
        for (var property in modelToSave) {
            if (modelToSave.hasOwnProperty(property)) {
                model[property] = modelToSave[property];
            }
        }
        if (this.savedModels[model.name] != undefined) {
            alert('A property with the name "'+model.name+'" already exists!')
        } else {
            this.savedModels[model.name] = model;
        }
    };

    this.removeModel = function (model) {
        if (confirm('Are you sure you want to remove "'+model.name+'"?')) {
            delete this.savedModels[model.name];
        }
    };
});