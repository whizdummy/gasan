var app = angular.module('gasanApp', []);

app.constant('appSettings', {
    BASE_URL: 'http://192.168.43.79/gasan_api/'
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

app.service('announcementService', function ($http, $q, appSettings) {
    var deferred;

    this.getAnnouncements = function () {
        deferred = $q.defer();

        $http.get(appSettings.BASE_URL + 'api/v1/announcements')
            .then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });

        return deferred.promise;
    };

    this.getAnnouncement = function (id) {
        deferred = $q.defer();

        $http.get(appSettings.BASE_URL + 'api/v1/announcements/' + id)
           .then(function (response) {
               deferred.resolve(response.data);
           }, function (errorResponse) {
               deferred.reject(errorResponse);
           });

        return deferred.promise;
    }

    this.addAnnouncement = function (announcementDetails) {
        deferred = $q.defer();

        $http({
            url: appSettings.BASE_URL + 'api/v1/announcements',
            method: 'POST',
            data: announcementDetails,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function (responseError) {
            deferred.reject(responseError);
        });

        return deferred.promise;
    }

    this.updateAnnouncement = function (id, announcementDetails) {
        deferred = $q.defer();

        $http({
            url: appSettings.BASE_URL + 'api/v1/announcements/' + id,
            method: 'PUT',
            data: announcementDetails,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function (responseError) {
            deferred.reject(responseError);
        });

        return deferred.promise;
    }

    this.deleteAnnouncement = function (id) {
        deferred = $q.defer();

        $http({
            url: appSettings.BASE_URL + 'api/v1/announcements/' + id,
            method: 'DELETE'
        })
        .then(function (response) {
            alert(response.data.message);

            deferred.resolve(response.data);
        }, function (responseError) {
            alert('An error occurred!');
            
            deferred.reject(responseError);
        });

        return deferred.promise;
    }
});

app.service('fileUpload', function ($http, municipalityService) {
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
});