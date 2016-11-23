angular.module('napkinCalculatorApp')
.controller('CompareCtrl', function ($location, PropertyService) {
    var compare = this;

    this.savedModels = PropertyService.getSavedModels();

    this.detailModel = {};

    this.filterOptions = {
        filterByInvestment : false,
        maxInvestment : null,

        filterByCapRate : false,
        minCapRate : null,

        filterByCashFlow : false,
        minCashFlow: null,

        filterByCOC : false,
        minCOCReturn : null
    };

    this.disableFilters = function(type) {
        if (type == 'investment') {
            compare.filterOptions.maxInvestment = null;
        } else if (type == 'caprate') {
            compare.filterOptions.minCapRate = null;
        } else if (type == 'cashflow') {
            compare.filterOptions.minCashFlow = null;
        } else if (type = 'coc') {
            compare.filterOptions.minCOCReturn = null;
        }
        compare.filterOptionsUpdate();
    };

    this.filterOptionsUpdate = function() {
        compare.savedModels = PropertyService.getSavedModels();
        console.log(compare.savedModels);
        if (compare.filterOptions.maxInvestment != null) {
            var amount = compare.filterOptions.maxInvestment;
            var savedModelArray = Object.keys(compare.savedModels).map(function (name) {
                return compare.savedModels[name];
            });
            var filteredSavedModels = savedModelArray.filter(function (model) { /* Property */
                return model.downPaymentAmt <= amount;
            });
            compare.savedModels = {};
            filteredSavedModels.forEach(function (model) {
                compare.savedModels[model.name] = model;
            });
        }
        if (compare.filterOptions.minCashFlow != null) {
            var amount = compare.filterOptions.minCashFlow;
            var savedModelArray = Object.keys(compare.savedModels).map(function (name) {
                return compare.savedModels[name];
            });
            var filteredSavedModels = savedModelArray.filter(function (model) { /* Property */
                return model.cashFlow >= amount;
            });
            compare.savedModels = {};
            filteredSavedModels.forEach(function (model) {
                compare.savedModels[model.name] = model;
            });
        }
        if (compare.filterOptions.minCapRate != null) {
            var amount = compare.filterOptions.minCapRate;
            var savedModelArray = Object.keys(compare.savedModels).map(function (name) {
                return compare.savedModels[name];
            });
            var filteredSavedModels = savedModelArray.filter(function (model) { /* Property */
                return model.capRate >= amount;
            });
            compare.savedModels = {};
            filteredSavedModels.forEach(function (model) {
                compare.savedModels[model.name] = model;
            });
        }
        if (compare.filterOptions.minCOCReturn != null) {
            var amount = compare.filterOptions.minCOCReturn;
            var savedModelArray = Object.keys(compare.savedModels).map(function (name) {
                return compare.savedModels[name];
            });
            var filteredSavedModels = savedModelArray.filter(function (model) { /* Property */
                return model.cashOnCashReturn >= amount;
            });
            compare.savedModels = {};
            filteredSavedModels.forEach(function (model) {
                compare.savedModels[model.name] = model;
            });
        }
    };

    this.loadCalcModel = function (model) {
        PropertyService.pushTempModel(model);
        $location.path('/calculator');
    };

    this.loadDetailModel = function (model) {
        this.detailModel = this.detailModel || {};
        for (var property in model) {
            if (model.hasOwnProperty(property)) {
                this.detailModel[property] = model[property];
            }
        }
    };

    this.removeModel = function (model) {
        PropertyService.removeModel(model);
    };

    this.toggleCompareOptions = function () {
        if ($('#sortFilterOptions').hasClass('in')) {
            $('#sortFilterOptions').collapse('hide');
        } else {
            $('#sortFilterOptions').collapse('show');
        }
    };



});