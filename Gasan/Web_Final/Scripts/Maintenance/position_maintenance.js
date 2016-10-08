app.controller('PositionMaintenance', function ($timeout) {
    var vm = this;

    firebase.database().ref('positions').on('value', function (data) {
        $timeout(function () {
            vm.positions = data.val();
        });
    });

    vm.positionOnSubmit = function () {
        var positionObject = {
            name: vm.position
        };

        if (vm.buttonType == 2) {
            firebase.database().ref('positions/' + vm.positionId).update(positionObject)
                .then(function (data) {
                    $timeout(function () {
                        vm.position = '';
                    });

                    swal('Success', 'Position successfully updated', 'success');
                }).catch(function (error) {
                    swal('Error', error.message, 'error');
                });
        } else {
            firebase.database().ref('positions').push(positionObject).then(function () {
                $timeout(function () {
                    vm.position = '';
                });

                swal('Success', 'Position successfully created', 'success');
            }).catch(function (error) {
                swal('Error', error.message, 'error');
            });
        }

        vm.buttonType = 1;
    }

    vm.editPositionOnClick = function (id) {
        vm.buttonType = 2;
        vm.positionId = id;

        vm.position = vm.positions[id].name;
    }

    vm.deletePositionOnClick = function (id) {
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
                firebase.database().ref('positions/' + id).remove()
                    .then(function (data) {
                        swal("Deleted!", "Position successfully deleted", "success");
                    }).catch(function (error) {
                        swal('Success', error.message, 'error');
                    });
            } else {
                swal("Cancelled", null, "error");
            }
        });
    }
});