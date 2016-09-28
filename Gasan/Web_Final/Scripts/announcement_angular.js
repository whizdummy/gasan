app.controller("AnnouncementController", function ($http, appSettings, announcementService) {
    var vm = this;

    vm.announcementForm = {};

    $('#announcement_div').hide();

    var loadAssignments = function () {
        announcementService.getAnnouncements()
            .then(function (response) {
                vm.announcements = response.data;
            }, function (responseError) {
                alert(responseError);
            });
    };

    loadAssignments();

    vm.announcementOnClick = function (buttonType, id) {
        vm.buttonType = buttonType;

        switch (buttonType) {
            case 1:
                $('#announcement_div').slideDown();
                break;

            case 2:
                announcementService.getAnnouncement(id)
                    .then(function(response) {
                        var announcementDetails = response.data;
                        var durationDay = announcementDetails.duration / 24;

                        vm.announcementForm.announcementId = announcementDetails.id;
                        vm.announcementForm.title = announcementDetails.title;
                        vm.announcementForm.description = announcementDetails.description;
                        vm.announcementForm.durationDay = parseInt(durationDay, 10);
                        vm.announcementForm.durationHour = parseInt(announcementDetails.duration - (24 * vm.durationDay), 10);

                        $('#announcement_div').slideDown();
                    }, function (responseError) {
                        alert(responseError);
                    });
                break;
            case 3:
                announcementService.deleteAnnouncement(id)
                    .then(function (response) {
                        loadAssignments();
                    }, function (responseError) {
                        alert('An error occurred');
                    });
                break;
            default:
                alert('Engg!');
                break;
        }
    };

    vm.closeModalOnClick = function () {
        $('#announcement_div').slideUp();
    }

    vm.announcementOnSubmit = function (announcementId, submitType) {
        var announcementDetailsObject = $.param({
            'title': vm.announcementForm.title,
            'description': vm.announcementForm.description,
            'duration': (vm.announcementForm.durationDay * 24) + vm.announcementForm.durationHour
        });

        // Add
        if (vm.buttonType == 1) {
            announcementService.addAnnouncement(announcementDetailsObject)
                .then(function (response) {
                    alert(response.message);

                    vm.closeModalOnClick();
                    loadAssignments();
                }, function (responseError) {
                    alert('An error occurred');
                });
        } else if (vm.buttonType == 2) {
            //Edit
            announcementService.updateAnnouncement(announcementId, announcementDetailsObject)
                .then(function(response) {
                    alert(response.message);

                    vm.closeModalOnClick();
                    loadAssignments();
                }, function(responseError) {
                    alert('An error occurred');   
                });
        }

        vm.announcementForm = {};
    }
});