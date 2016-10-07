app.controller("AnnouncementMaintenanceController", function ($timeout, announcementService) {
    var vm = this;
    var announcementDiv = $('#announcement_div');
    var announcementRef = firebase.database().ref('announcements');
    var announcementList = [];

    vm.announcementForm = {};

    announcementDiv.hide();

    announcementRef.on('value', function (data) {
        $timeout(function () {
            vm.announcements = data.val();
        });
    });

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
                announcementRef.child(id).once('value')
                    .then(function (data) {
                        var durationDay = data.val().duration / 24;

                        $timeout(function () {
                            vm.announcementForm.announcementId = data.key;
                            vm.announcementForm.title = data.val().title;
                            vm.announcementForm.description = data.val().description;
                            vm.announcementForm.durationDay = parseInt(durationDay, 10);
                            vm.announcementForm.durationHour = parseInt(data.val().duration - (24 * vm.announcementForm.durationDay), 10);
                        });

                        announcementDiv.slideDown();
                    }).catch(function (error) {
                        swal('Error', error.message, 'error');
                    });
                break;
            // Delete
            case 3:
                swal({
                    title: "Are you sure?",
                    text: null,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel it!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                }, function (isConfirm) {
                    if (isConfirm) {
                        announcementRef.child(id).remove()
                            .then(function (data) {
                                swal("Deleted!", "Announcement successfuly deleted", "success");
                            }).catch(function (error) {
                                swal('Error', error.message, 'error');
                            });
                    } else {
                        swal("Cancelled", null, "error");
                    }
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
        var announcementDetailsObject = {
            'title':        vm.announcementForm.title,
            'description':  vm.announcementForm.description,
            'duration': (vm.announcementForm.durationDay * 24) + vm.announcementForm.durationHour,
            'createdAt': Date.now(),
            'updatedAt': Date.now(),
            'isExpired': false
        };

        // Add
        if (vm.buttonType == 1) {
            announcementRef.push(announcementDetailsObject)
                .then(function (data) {
                    swal('Success', 'Announcement successfully added', 'success');

                    announcementDiv.slideUp();
                }).catch(function (error) {
                    swal('Error', error.message, 'error');
                });
        } else if (vm.buttonType == 2) {
            //Edit
            announcementRef.child(announcementId).update(announcementDetailsObject)
                .then(function (data) {
                    swal('Success', 'Announcement successfully updated', 'success');

                    announcementDiv.slideUp();
                }).catch(function (error) {
                    swal('Error', error.message, 'error');
                });
        }

        vm.announcementForm = {};
    }
});