app.controller('MissionVisionController', function ($http, appSettings) {
    var vm = this;

    $('#mission_vision_div').hide();

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
        console.log(missionVisionFlag);
        
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

        $("#mission_vision_div").fadeIn();
    };

    vm.saveMissionVisionOnClick = function (isMissionFlag) {
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

            alert(municipalityDetails.message);

            if (municipalityDetails.status == 'S') {
                vm.missionDetails = municipalityDetails.data.mission;
                vm.visionDetails = municipalityDetails.data.vision;
            }

            $("#mission_vision_div").fadeOut();
        }, function(response) {
            alert("An error occurred!");
        });
    }
});