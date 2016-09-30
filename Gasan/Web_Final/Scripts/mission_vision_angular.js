app.controller('MissionVisionController', function ($http, appSettings, divService) {
    var vm = this;

    divService.setDivName('#mission_vision_div');
    divService.hideDiv();

    $http.get(appSettings.BASE_URL + "api/v1/municipalities")
        .then(function (response) {
            var municipalityDetails = response.data.municipality_details;

            vm.municipalityID = municipalityDetails.id;
            vm.missionDetails = municipalityDetails.mission;
            vm.visionDetails = municipalityDetails.vision;
        }, function (response) {
            alert('An error occurred!');
        });

    vm.editMissionOnClick = function (missionVisionFlag) {
        $http.get(appSettings.BASE_URL + "api/v1/municipalities?missionVisionFlag=" + missionVisionFlag)
            .then(function (response) {
                var municipalityDetails = response.data.municipality_details;

                vm.missionVisionDescription = '';

                if (missionVisionFlag == 1) {
                    vm.missionVisionTitle = "Mission";
                    vm.isMission = 1;

                    vm.missionVisionDescription = municipalityDetails.mission;
                } else {
                    vm.missionVisionTitle = "Vision";
                    vm.isMission = 0;

                    vm.missionVisionDescription = municipalityDetails.vision;
                }
            }, function (response) {
                alert('An error occurred!');
            });

        $("#mission_vision_div").slideDown();
    };

    vm.saveMissionVisionOnSubmit = function (isMissionFlag) {
        var missionVisionButton = document.getElementById('btn-save-mission-vision');

        missionVisionButton.disabled = true;

        $http({
            url: appSettings.BASE_URL + 'api/v1/municipalities/' + vm.municipalityID + '?is_mission=' + isMissionFlag,
            method: 'PUT',
            data: $.param({
                mission: vm.missionVisionDescription,
                vision: vm.missionVisionDescription
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function (response) {
            var municipalityDetails = response.data;

            if (municipalityDetails.status == 'S') {
                vm.missionDetails = municipalityDetails.data.mission;
                vm.visionDetails = municipalityDetails.data.vision;

                alert(municipalityDetails.message);

                missionVisionButton.disabled = false;
                divService.closeDiv();
            }
        }, function(response) {
            alert("An error occurred!");
        });
    }

    vm.closeMissionVisionOnClick = function () {
        divService.closeDiv();
    }
});