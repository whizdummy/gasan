app.controller('LogoMaintenanceController', function ($http, $timeout, appSettings, fileUpload, municipalityService) {
    var vm = this;
    var logoInput = document.getElementById('file-0a');
    var logoDiv = $('#logo_div');
    var imageRef = firebase.database().ref('details/imageUrl');
    var imageStorageRef = firebase.storage().ref('images');
    var municipalityDetailsRef = firebase.database().ref('details');

    logoDiv.hide();

    //getLogo();
    imageRef.on('value', function (data) {
        $timeout(function () {
            vm.url = data.val();
        });
    });

    function getLogo() {
        $http.get(appSettings.BASE_URL + 'api/v1/logos')
        .then(function (response) {
            var logoData = response.data;

            if (logoData.status == 'S') {
                vm.url = appSettings.BASE_URL + 'images/municipalities/' + logoData.data.image_path;
                vm.logoName = logoData.data.name + " Logo";

                municipalityService.setMunicipalityID(logoData.data.id);
            } else {
                alert('Wala pang logo!');
            }
        }, function (response) {
            alert('An error occurred!');
        });
    }

    vm.showLogoFormOnClick = function () {
        logoDiv.slideDown();
    };

    vm.addLogoOnClick = function () {
        $('#logo_modal').modal('show');
    };

    vm.saveImageOnClick = function () {
        //var file = vm.logoFile;
        var file = logoInput.files[0];
        
        imageStorageRef.child('logo.jpg').put(file)
            .then(function (data) {
                imageStorageRef.child('logo.jpg').getDownloadURL()
                    .then(function (url) {
                        municipalityDetailsRef.update({
                            'imageUrl': url
                        }).then(function (data) {
                            swal('Success', 'Logo successfully updated', 'success');

                            logoDiv.slideUp();
                        }).catch(function (error) {
                            swal('Error', error.message, 'error');
                        });
                    }).catch(function (error) {
                        swal('Error', error.message, 'error');
                    });
            }).catch(function (error) {
                swal('Error', error.message, 'error');
            });
    };
});