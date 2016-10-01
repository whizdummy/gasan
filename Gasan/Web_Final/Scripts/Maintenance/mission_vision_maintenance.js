app.controller('MissionVisionMaintenanceController', function (divService, missionVisionService) {
    var vm = this;

    divService.setDivName('#mission_vision_div');

    missionVisionService
        .getMunicipalityDetails()
        .then(function (response) {
            var municipalityDetails = response.data;

            vm.municipalityID = municipalityDetails.id;
            vm.missionDetails = municipalityDetails.mission;
            vm.visionDetails = municipalityDetails.vision;
        }, function (responseError) {
            alert('An error occurred!');
        });

    vm.editMissionOnClick = function (missionVisionFlag) {
        missionVisionService
            .getMunicipalityDetails()
            .then(function (response) {
                var municipalityDetails = response.data;

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
            }, function (responseError) {
                alert('An error occurred!');
            });

        divService.openDiv();
    };

    vm.saveMissionVisionOnSubmit = function (isMissionFlag) {
        var missionVisionButton = document.getElementById('btn-save-mission-vision');

        missionVisionButton.disabled = true;

        var missionVisionDetails = {
            municipality_id:    vm.municipalityID,
            mission:            vm.missionVisionDescription,
            vision:             vm.missionVisionDescription,
            is_mission_flag:    isMissionFlag
        };

        missionVisionService
            .updateMunicipalityDetails(missionVisionDetails)
            .then(function (response) {
                var municipalityDetails = response.data;

                if (response.status == 'S') {
                    vm.missionDetails = municipalityDetails.mission;
                    vm.visionDetails = municipalityDetails.vision;

                    missionVisionButton.disabled = false;
                    divService.closeDiv();
                }

                alert(response.message);
            }, function (responseError) {
                alert('An error occurred!');
            });
    }

    vm.closeMissionVisionOnClick = function () {
        divService.closeDiv();
    }
});