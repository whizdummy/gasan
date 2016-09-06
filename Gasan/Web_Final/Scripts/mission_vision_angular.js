app.controller('MissionVisionController', function ($http, appSettings) {
    var vm = this;

    $('#mission_vision_div').hide();

    $http.get(appSettings.BASE_URL + "api/Municipality")
        .then(function (response) {
            vm.municipalityID = response.data[0].MunicipalityID;
            vm.missionDetails   = response.data[0].Mission;
            vm.visionDetails    = response.data[0].Vision;
        }, function (response) {
            alert('An error occurred!');
        });

    vm.editMissionOnClick = function (missionVisionFlag) {
        if (missionVisionFlag == 1) {
            vm.missionVisionTitle = "Mission";

            vm.missionVisionDescription = vm.missionDetails;
        } else {
            vm.missionVisionTitle = "Vision";

            vm.missionVisionDescription = vm.visionDetails;
        }

        $("#mission_vision_div").fadeIn();
    };

    vm.saveMissionVisionOnClick = function () {
        var value = {
            Mission: 'Hello nigga!'
        };

        $http({
            url: appSettings.BASE_URL + 'api/Municipality/' + vm.municipalityID,
            method: 'GET',
            data: value
        }).then(function (response) {
            console.log(response.data);
        }, function (response) {
            alert("An error occurred!");
        });
    }
});