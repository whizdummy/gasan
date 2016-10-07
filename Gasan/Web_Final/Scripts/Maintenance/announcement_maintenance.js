app.controller("AnnouncementMaintenanceController", function (announcementService) {
    var vm = this;
    var announcementDiv = $('#announcement_div');

    vm.announcementForm = {};

    announcementDiv.hide();

    var loadAssignments = function () {
        announcementService.getAnnouncements()
            .then(function (response) {
                vm.announcements = response.data;
            }, function (responseError) {
                alert(responseError);
            });
    };

    //loadAssignments();

    vm.announcementOnClick = function (buttonType, id) {
        vm.buttonType = buttonType;

        vm.announcementForm = {};

        switch (buttonType) {
            // Add
            case 1:
                announcementDiv.slideDown();
                break;

            // Edit
            case 2:
                announcementService.getAnnouncement(id)
                    .then(function(response) {
                        var announcementDetails = response.data;
                        var durationDay = announcementDetails.duration / 24;

                        vm.announcementForm.announcementId  = announcementDetails.id;
                        vm.announcementForm.title           = announcementDetails.title;
                        vm.announcementForm.description     = announcementDetails.description;
                        vm.announcementForm.durationDay     = parseInt(durationDay, 10);
                        vm.announcementForm.durationHour    = parseInt(announcementDetails.duration - (24 * vm.announcementForm.durationDay), 10);

                        announcementDiv.slideDown();
                    }, function (responseError) {
                        alert(responseError);
                    });
                break;
            // Delete
            case 3:
                announcementService.deleteAnnouncement(id)
                    .then(function (response) {
                        alert(response.message);

                        loadAssignments();
                    }, function (responseError) {
                        alert('An error occurred');
                    });
                break;
            default:
                alert('Invalid button type!');
                break;
        }
    };

    vm.closeDivOnClick = function () {
        announcementDiv.slideUp();
    }

    vm.announcementOnSubmit = function (announcementId, submitType) {
        var announcementDetailsObject = $.param({
            'title':        vm.announcementForm.title,
            'description':  vm.announcementForm.description,
            'duration':     (vm.announcementForm.durationDay * 24) + vm.announcementForm.durationHour
        });

        // Add
        if (vm.buttonType == 1) {
            announcementService.addAnnouncement(announcementDetailsObject)
                .then(function (response) {
                    alert(response.message);

                    announcementDiv.slideUp();
                    loadAssignments();
                }, function (responseError) {
                    alert('An error occurred');
                });
        } else if (vm.buttonType == 2) {
            //Edit
            announcementService.updateAnnouncement(announcementId, announcementDetailsObject)
                .then(function(response) {
                    alert(response.message);

                    announcementDiv.slideUp();
                    loadAssignments();
                }, function(responseError) {
                    alert('An error occurred');   
                });
        }

        vm.announcementForm = {};
    }
});