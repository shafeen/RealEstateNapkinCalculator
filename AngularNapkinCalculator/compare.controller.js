angular.module('napkinCalculatorApp')
.controller('CompareCtrl', function ($location, PropertyService) {
    var compare = this;

    this.savedModels = PropertyService.getSavedModels();

    this.detailModel = {};

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