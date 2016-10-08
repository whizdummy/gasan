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

    vm.eventOnSubmit = function () {
        var file = document.getElementById('event-image').files[0];

        if (vm.buttonType == 1) {
            var eventDetails = firebase.database().ref('events').push({
                title: vm.eventForm.title,
                description: vm.eventForm.description,
                startDate: (new Date(vm.eventForm.startDate)).getTime(),
                endDate: (new Date(vm.eventForm.endDate)).getTime()
            });

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
        }
    }
});