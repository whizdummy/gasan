app.controller('MissionVisionMaintenanceController', function (missionVisionService) {
    var vm                      = this;
    var missionVisionDiv        = $('#mission_vision_div');
    var missionEditBtn          = document.getElementById('btn-mission-edit');
    var visionEditBtn           = document.getElementById('btn-vision-edit');
    var missionVisionCloseBtn   = document.getElementById('btn-close-mission-vision');

    missionVisionDiv.hide();
    missionEditBtn.disabled = true;
    visionEditBtn.disabled  = true;

    //missionVisionService
    //    .getMunicipalityDetails()
    //    .then(function (response) {
    //        var municipalityDetails         = response.data;

    //        vm.municipalityID               = municipalityDetails.id;
    //        vm.missionDetails               = municipalityDetails.mission;
    //        vm.visionDetails                = municipalityDetails.vision;

    //        missionEditBtn.disabled         = false;
    //        visionEditBtn.disabled          = false;
    //    }, function (responseError) {
    //        alert('An error occurred!');
    //    });

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

                    missionEditBtn.disabled = true;
                    visionEditBtn.disabled  = false;
                } else {
                    vm.missionVisionTitle = "Vision";
                    vm.isMission = 0;

                    vm.missionVisionDescription = municipalityDetails.vision;

                    visionEditBtn.disabled  = true;
                    missionEditBtn.disabled = false;
                }

                missionVisionDiv.slideDown();
            }, function (responseError) {
                alert('An error occurred!');
            });
    };

    vm.saveMissionVisionOnSubmit = function (isMissionFlag) {
        var missionVisionButton = document.getElementById('btn-save-mission-vision');

        missionVisionButton.disabled    = true;
        missionVisionCloseBtn.disabled  = true;
        missionEditBtn.disabled         = true;
        visionEditBtn.disabled          = true;

        var missionVisionDetails = {
            mission:            vm.missionVisionDescription,
            vision:             vm.missionVisionDescription
        };

        firebase.database().ref('details').update(missionVisionDetails);

        //missionVisionService
        //    .updateMunicipalityDetails(missionVisionDetails)
        //    .then(function (response) {
        //        var municipalityDetails = response.data;

        //        if (response.status == 'S') {
        //            vm.missionDetails               = municipalityDetails.mission;
        //            vm.visionDetails                = municipalityDetails.vision;

        //            missionVisionButton.disabled    = false;
        //            missionVisionCloseBtn.disabled  = false;
        //            missionEditBtn.disabled         = false;
        //            visionEditBtn.disabled          = false;

        //            alert(response.message);

        //            missionVisionDiv.slideUp();
        //        }
        //    }, function (responseError) {
        //        alert('An error occurred!');
        //    });
    }

    vm.closeMissionVisionOnClick = function () {
        missionVisionDiv.slideUp();

        missionEditBtn.disabled = false;
        visionEditBtn.disabled  = false;
    }
});