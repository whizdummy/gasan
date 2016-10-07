app.controller('MissionVisionMaintenanceController', function ($timeout, missionVisionService) {
    var vm                      = this;
    var missionVisionDiv        = $('#mission_vision_div');
    var missionEditBtn          = document.getElementById('btn-mission-edit');
    var visionEditBtn           = document.getElementById('btn-vision-edit');
    var missionVisionCloseBtn   = document.getElementById('btn-close-mission-vision');

    missionVisionDiv.hide();
    missionEditBtn.disabled = true;
    visionEditBtn.disabled  = true;

    firebase.database().ref('details/mission').on('value', function (data) {
        $timeout(function () {
            vm.missionDetails = data.val();

            missionEditBtn.disabled = false;
        });
    });

    firebase.database().ref('details/vision').on('value', function (data) {
        $timeout(function () {
            vm.visionDetails = data.val();

            visionEditBtn.disabled = false;
        });
    });

    vm.editMissionOnClick = function (missionVisionFlag) {
        if (missionVisionFlag == 1) {
            vm.missionVisionTitle = "Mission";
            vm.isMission = 1;

            vm.missionVisionDescription = vm.missionDetails;

            missionEditBtn.disabled = true;
            visionEditBtn.disabled  = false;
        } else {
            vm.missionVisionTitle = "Vision";
            vm.isMission = 0;

            vm.missionVisionDescription = vm.visionDetails;

            visionEditBtn.disabled  = true;
            missionEditBtn.disabled = false;
        }

        missionVisionDiv.slideDown();
    };

    vm.saveMissionVisionOnSubmit = function (isMissionFlag) {
        var missionVisionButton = document.getElementById('btn-save-mission-vision');

        missionVisionButton.disabled    = true;
        missionVisionCloseBtn.disabled  = true;
        missionEditBtn.disabled         = true;
        visionEditBtn.disabled          = true;

        var missionVisionDetails = {
            mission:            vm.isMission == 1 ? vm.missionVisionDescription : vm.missionDetails,
            vision:             vm.isMission == 0 ? vm.missionVisionDescription : vm.visionDetails
        };

        firebase.database().ref('details').update(missionVisionDetails)
            .then(function (data) {
                swal('Success', 'Successfully updated!', 'success');

                missionVisionButton.disabled = false;
                missionVisionCloseBtn.disabled = false;
                missionEditBtn.disabled = false;
                visionEditBtn.disabled = false;

                missionVisionDiv.slideUp();
            }).catch(function (error) {
                swal('Error', error.message, 'error');
            });
    }

    vm.closeMissionVisionOnClick = function () {
        missionVisionDiv.slideUp();

        missionEditBtn.disabled = false;
        visionEditBtn.disabled  = false;
    }
});