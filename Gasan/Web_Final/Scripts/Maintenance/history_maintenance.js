app.controller('HistoryMaintenanceController', function ($http, $timeout, appSettings) {
    var vm = this;
    var historyRef = firebase.database().ref('histories');
    var historyStorageRef = firebase.storage().ref('images/histories');
    var historyDiv = $('#history_div');

    vm.historyForm = {};
    vm.isToggled = false;
    vm.toggleMessage = "Add";

    historyDiv.hide();

    historyRef.on('value', function (data) {
        $timeout(function () {
            vm.histories = data.val();
        });
    });

    vm.toggleHistoryFormOnClick = function (isToggled) {
        if (!isToggled) {
            historyDiv.slideDown();

            vm.isToggled = true;
            vm.toggleMessage = "Close";

            vm.buttonType = 1;
            vm.historyForm = {};
        } else {
            historyDiv.slideUp();

            vm.isToggled = false;
            vm.toggleMessage = "Add";
        }
    }

    vm.historyFormOnSubmit = function () {
        var file = document.getElementById('history-image').files[0];
        var historyObject = {
            title: vm.historyForm.title,
            place: vm.historyForm.place,
            description: vm.historyForm.description != null ? vm.historyForm.description : null,
            date: vm.historyForm.date.getTime()
        };

        if (vm.buttonType == 1) {
            var history = historyRef.push(historyObject);

            if (history.key) {
                if(file) {
                    historyStorageRef.child(history.key + '.jpg').put(file)
                    .then(function (data) {
                        historyStorageRef.child(history.key + '.jpg').getDownloadURL()
                            .then(function (url) {
                                firebase.database().ref('histories/' + history.key).update({
                                    'imageUrl': url
                                }).then(function (data) {
                                    $timeout(function () {
                                        vm.historyForm = {};

                                        vm.isToggled = false;
                                        vm.toggleMessage = "Add";

                                        historyDiv.slideUp();

                                        swal('Success', 'History successfully added', 'success');
                                    });
                                }).catch(function (error) {
                                    swal('Error', error.message, 'error');
                                });
                            }).catch(function (error) {
                                swal('Error', error.message, 'error');
                            });
                    }).catch(function (error) {
                        swal('Error', error.message, 'error');
                    });
                } else {
                    swal('Success', 'History successfully added', 'success');

                    vm.historyForm = {};

                    vm.isToggled = false;
                    vm.toggleMessage = "Add";

                    historyDiv.slideUp();
                }
            } else {
                swal('Error', 'Something went wrong', 'error');
            }
        } else if (vm.buttonType == 2) {
            firebase.database().ref('histories/' + vm.historyId).update(historyObject)
                .then(function (data) {
                    if (file) {
                        historyStorageRef.child(vm.historyId + '.jpg').put(file)
                        .then(function (data) {
                            historyStorageRef.child(vm.historyId + '.jpg').getDownloadURL()
                                .then(function (url) {
                                    firebase.database().ref('histories/' + vm.historyId).update({
                                        'imageUrl': url
                                    }).then(function (data) {
                                        $timeout(function () {
                                            vm.historyForm = {};
                                            vm.isToggled = false;
                                            vm.toggleMessage = "Add";

                                            historyDiv.slideUp();

                                            swal('Success', 'History successfully updated', 'success');
                                        });
                                    }).catch(function (error) {
                                        swal('Error', error.message, 'error');
                                    });
                                }).catch(function (error) {
                                    swal('Error', error.message, 'error');
                                });
                        }).catch(function (error) {
                            swal('Error', error.message, 'error');
                        });
                    }
                }).catch(function (error) {
                    swal('Error', error.message, 'error');
                });
        }
    }

    vm.historyEditOnClick = function (id) {
        vm.buttonType = 2;
        vm.historyId = id;

        firebase.database().ref('histories/' + id)
            .once('value', function (data) {
                $timeout(function () {
                    var historyDetails = data.val();

                    var date = new Date(historyDetails.date);

                    vm.historyForm.title = historyDetails.title;
                    vm.historyForm.place = historyDetails.place;
                    vm.historyForm.description = historyDetails.description;
                    vm.historyForm.date = date;

                    historyDiv.slideDown();

                    vm.isToggled = true;
                    vm.toggleMessage = "Close";
                });
            });
    }

    vm.historyDeleteOnClick = function (id) {
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
                firebase.database().ref('histories/' + id).remove()
                    .then(function (data) {
                        swal("Deleted!", "History successfully deleted.", "success");
                    }).catch(function (error) {
                        swal('Error', error.message, 'error');
                    });
            } else {
                swal("Cancelled", null, "error");
            }
        });
    }
});