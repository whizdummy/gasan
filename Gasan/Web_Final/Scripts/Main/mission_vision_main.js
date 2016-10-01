app.controller('MissionVisionController', function (missionVisionService) {
    var vm  = this;

    missionVisionService
        .getMunicipalityDetails()
        .then(function (response) {
            var municipalityDetails = response.data;

            vm.missionDetails       = municipalityDetails.mission;
            vm.visionDetails        = municipalityDetails.vision;
        }, function (responseError) {
            alert(responseError.config.url + ": " + responseError.statusText);
        });
});