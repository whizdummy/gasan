app.controller('EventMaintenanceController', function ($timeout) {
    var vm = this;
    var eventDiv = $('#event-div');

    vm.toggle = false;
    vm.buttonName = 'Add';
    vm.eventForm = {};

    eventDiv.hide();

    vm.toggleEventOnClick = function (toggle) {
        if (!toggle) {
            eventDiv.slideDown();

            vm.toggle = true;
            vm.buttonName = "Close";

            vm.buttonType = 1;
            vm.eventForm = {};
        } else {
            eventDiv.slideUp();

            vm.toggle = false;
            vm.buttonName = "Add";
        }
    }

    firebase.database().ref('events').on('value', function (data) {
        vm.events = data.val();
    });

    vm.editOnClick = function (id) {
        vm.buttonType = 2;
        vm.eventId = id;

        firebase.database().ref('events/' + id).once('value', function (data) {
            $timeout(function () {
                var eventDetails = data.val();

                vm.eventForm.title = eventDetails.title;
                vm.eventForm.description = eventDetails.description;
                vm.eventForm.startDate = new Date(eventDetails.startDate);
                vm.eventForm.endDate = new Date(eventDetails.endDate);

                eventDiv.slideDown();

                vm.toggle = true;
                vm.buttonName = "Close";
            });
        });
    }

    vm.eventOnSubmit = function () {
        var file = document.getElementById('event-image').files[0];
        var eventObject = {
            title: vm.eventForm.title,
            description: vm.eventForm.description,
            startDate: (new Date(vm.eventForm.startDate)).getTime(),
            endDate: (new Date(vm.eventForm.endDate)).getTime()
        };

        if (vm.buttonType == 1) {
            var eventDetails = firebase.database().ref('events').push(eventObject);

            if (eventDetails.key) {
                if (file) {
                    firebase.storage().ref('images/events').child(eventDetails.key + '.jpg').put(file)
                        .then(function (data) {
                            firebase.storage().ref('images/events/' + eventDetails.key + '.jpg').getDownloadURL()
                                .then(function(url) {
                                    firebase.database().ref('events/' + eventDetails.key).update({
                                        imageUrl: url
                                    }).then(function (data) {
                                        $timeout(function () {
                                            eventDiv.slideUp();

                                            vm.toggle = false;
                                            vm.buttonName = "Add";

                                            vm.eventForm = {};
                                        });

                                        swal('Success', 'Event successfully added', 'success');
                                    });
                                }).catch(function (error) {
                                    swal('Error', error.message, 'error');
                                });
                        });
                } else {
                    $timeout(function () {
                        eventDiv.slideUp();

                        vm.toggle = false;
                        vm.buttonName = "Add";

                        vm.eventForm = {};
                    });

                    swal('Success', 'Event successfully added', 'success');
                }
            } else {
                swal('Error', 'Something went wrong', 'error');
            }
        } else if (vm.buttonType == 2) {
            console.log(vm.eventId);

            firebase.database().ref('events/' + vm.eventId).update(eventObject)
                .then(function (data) {
                    if (file) {
                        firebase.storage().ref('images/events/' + vm.eventId + '.jpg').put(file)
                            .then(function (data) {
                                firebase.storage().ref('images/events/' + vm.eventId + '.jpg').getDownloadURL()
                                .then(function (url) {
                                    firebase.database().ref('events/' + vm.eventId).update({
                                        imageUrl: url
                                    }).then(function (data) {
                                        $timeout(function () {
                                            eventDiv.slideUp();

                                            vm.toggle = false;
                                            vm.buttonName = "Add";

                                            vm.eventForm = {};
                                        });

                                        swal('Success', 'Event successfully added', 'success');
                                    });
                                }).catch(function (error) {
                                    swal('Error', error.message, 'error');
                                });
                            }).catch(function (error) {
                                swal('Error', error.message, 'error');
                            })
                    } else {
                        $timeout(function () {
                            eventDiv.slideUp();

                            vm.toggle = false;
                            vm.buttonName = "Add";

                            vm.eventForm = {};
                        });

                        swal('Success', 'Event successfully updated', 'success');
                    }
                }).catch(function (error) {
                    swal('Success', error.message, 'error');
                });
        }
    }
});