var app = angular.module('gasanApp', []);

app.constant('appSettings', {
    BASE_URL: 'http://192.168.56.1:8080/gasan_api/'
});

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.service('municipalityService', function () {
    var municipality = {};

    this.setMunicipalityID = function (municipalityID) {
        municipality.id = municipalityID;
    }

    this.getMunicipalityID = function () {
        return municipality.id;
    }
});

app.service('fileUpload', ['$http', 'municipalityService', function ($http, municipalityService) {
    this.uploadFileToUrl = function (file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        fd.append('municipalityID', municipalityService.getMunicipalityID());
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
        .then(function (response) {
            alert(response.data.message);
        }, function (response) {
            console.log("Image upload error");
        });
    }
}]);