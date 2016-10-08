app.controller('OfficialMaintenance', function ($timeout) {
    var vm = this;
    var officialList = [];
    var officialDiv = $('#official-div');
    
    vm.toggled = false;
    vm.toggleMessage = 'Add';

    officialDiv.hide();

    firebase.database().ref('positions').on('value', function (data) {
        $timeout(function () {
            vm.positions = data.val();
        });
    });

    firebase.database().ref('officials').on('value', function (data) {
        officialList = [];

        data.forEach(function (childData) {
            var detail = childData.val();

            firebase.database().ref('positions/' + detail.position).once('value', function (snapshot) {
                officialList.push({
                    id: childData.key,
                    firstName: detail.firstName,
                    middleName: detail.middleName,
                    lastName: detail.lastName,
                    imageUrl: detail.imageUrl,
                    description: detail.description,
                    position: snapshot.val().name
                });
            });
        });

        $timeout(function () {
            vm.officials = officialList;
        });
    });

    vm.toggleOnClick = function (isToggled) {
        vm.buttonType = 1;

        if (!isToggled) {
            officialDiv.slideDown();

            vm.toggleMessage = 'Close';
            vm.toggled = true;
        } else {
            officialDiv.slideUp();

            vm.officialForm = {};
            vm.toggleMessage = 'Add';
            vm.toggled = false;
        }
    }

    vm.editOnClick = function (id) {
        vm.buttonType = 2;
        vm.officialId = id;

        firebase.database().ref('officials/' + id).once('value', function (data) {
            $timeout(function () {
                var officialDetails = data.val();

                vm.officialForm.firstName = officialDetails.firstName;
                vm.officialForm.middleName = officialDetails.middleName;
                vm.officialForm.lastName = officialDetails.lastName;
                vm.officialForm.description = officialDetails.description;

                officialDiv.slideDown();
                
                vm.toggleMessage = 'Close';
                vm.toggled = true;
            });
        });
    }

    vm.deleteOnClick = function (id) {
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
                firebase.database().ref('officials/' + id).remove()
                    .then(function (data) {
                        $timeout(function () {
                            vm.toggleOnClick(vm.toggled);
                        });

                        swal("Deleted!", "Official successfully deleted", "success");
                    }).catch(function (error) {
                        swal('Error', error.message, 'error');
                    });
            } else {
                swal("Cancelled", null, "error");
            }
        });
    }

    vm.officialOnSubmit = function () {
        var file = document.getElementById('official-image').files[0];
        var officialObject = {
            firstName: vm.officialForm.firstName,
            middleName: vm.officialForm.middleName != null ? vm.officialForm.middleName : '',
            lastName: vm.officialForm.lastName,
            position: vm.officialForm.position,
            description: vm.officialForm.description != null ? vm.officialForm.description : ''
        };

        if (vm.buttonType == 2) {
            firebase.database().ref('officials/' + vm.officialId).update(officialObject)
                .then(function (data) {
                    if (file) {
                        firebase.storage().ref('images/officials').child(vm.officialId + '.jpg').put(file)
                            .then(function (data) {
                                firebase.storage().ref('images/officials').child(vm.officialId + '.jpg').getDownloadURL()
                                    .then(function (url) {
                                        firebase.database().ref('officials/' + vm.officialId).update({
                                            imageUrl: url
                                        }).then(function (data) {
                                            $timeout(function () {
                                                vm.toggleOnClick(vm.toggled);
                                            });

                                            swal('Success', 'Official successfully updated', 'success');
                                        }).catch(function (error) {
                                            swal('Error', error.message, 'error');
                                        })
                                    }).catch(function (error) {
                                        swal('Error', error.message, 'error');
                                    })
                            }).catch(function (error) {
                                swal('Error', error.message, 'error');
                            });
                    } else {
                        $timeout(function () {
                            vm.toggleOnClick(vm.toggled);
                        });

                        swal('Success', 'Official successfully updated', 'success');
                    }
                });
        } else {
            var officialDetails = firebase.database().ref('officials').push(officialObject);

            if (officialDetails.key) {
                if (file) {
                    firebase.storage().ref('images/officials').child(officialDetails.key + '.jpg').put(file)
                        .then(function (data) {
                            firebase.storage().ref('images/officials').child(officialDetails.key + '.jpg').getDownloadURL()
                                .then(function (url) {
                                    firebase.database().ref('officials/' + officialDetails.key).update({
                                        imageUrl: url
                                    }).then(function (data) {
                                        $timeout(function () {
                                            vm.toggleOnClick(vm.toggled);
                                        });

                                        swal('Success', 'Official successfully created', 'success');
                                    }).catch(function (error) {
                                        swal('Error', error.message, 'error');
                                    })
                                });
                        }).catch(function (error) {
                            swal('Error', error.message, 'error');
                        });
                } else {
                    vm.toggleOnClick(vm.toggled);
                    swal('Success', 'Official successfully created', 'success');
                }
            }
        }

        vm.buttonType = 1;
    }
});