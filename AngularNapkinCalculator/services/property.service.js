angular.module('napkinCalculatorApp')
.service('PropertyService', function () {

    this.defaultModel = {
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

    // tempModel used to pass models between controllers
    this.tempModel = null;

    this.savedModels = {};

    this.getNewDefaultModel = function () {
        var model = {};
        for (var property in this.defaultModel) {
            if (this.defaultModel.hasOwnProperty(property)) {
                model[property] = this.defaultModel[property];
            }
        }
        return model;
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