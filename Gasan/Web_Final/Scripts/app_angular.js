var app = angular.module('gasanApp', []);

app.constant('appSettings', {
    BASE_URL:   'http://192.168.254.103:8080/gasan_api/',
    IMAGE_PATH: 'public/images/'
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

app.service('logoService', function ($http, $q, appSettings) {
    var deferred;

    this.getLogoDetails = function () {
        deferred = $q.defer();

        $http.get(appSettings.BASE_URL + 'api/v1/logos')
            .then(function (response) {
                deferred.resolve(response.data);
            }, function (responseError) {
                deferred.reject(responseError);
            });

        return deferred.promise;
    }
});

app.service('missionVisionService', function ($http, $q, appSettings) {
    var deferred;

    this.getMunicipalityDetails = function () {
        deferred = $q.defer();

        $http.get(appSettings.BASE_URL + "api/v1/municipalities")
        .then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });

        return deferred.promise;
    }

    this.updateMunicipalityDetails = function (municipalityDetails) {
        deferred = $q.defer();

        $http({
            url: appSettings.BASE_URL + 'api/v1/municipalities/' + municipalityDetails.municipality_id + '?is_mission=' + municipalityDetails.is_mission_flag,
            method: 'PUT',
            data: $.param(municipalityDetails),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function (responseError) {
            deferred.reject(responseError);
        });

        return deferred.promise;
    }
});

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

    this.deleteAnnouncement = function (id) {
        deferred = $q.defer();

        $http({
            url: appSettings.BASE_URL + 'api/v1/announcements/' + id,
            method: 'DELETE'
        })
        .then(function (response) {
            deferred.resolve(response.data);
        }, function (responseError) {
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