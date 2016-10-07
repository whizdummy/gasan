app.controller('BannerMaintenance', function ($timeout) {
    var vm = this;
    var bannerDiv = $('#banner-div');
    var imageStorageRef = firebase.storage().ref('images');
    var bannerRef = firebase.database().ref('details/bannerUrl');
    var bannerInput = document.getElementById('file-banner');
    var municipalityDetailsRef = firebase.database().ref('details');

    bannerDiv.hide();

    bannerRef.on('value', function (data) {
        $timeout(function () {
            vm.imageUrl = data.val();
        });
    });

    vm.showBannerFormOnClick = function () {
        bannerDiv.slideDown();
    };

    vm.closeOnClick = function () {
        bannerDiv.slideUp();
    };

    vm.bannerOnSubmit = function () {
        var file = bannerInput.files[0];

        imageStorageRef.child('banner.jpg').put(file)
            .then(function (data) {
                imageStorageRef.child('banner.jpg').getDownloadURL()
                    .then(function (url) {
                        municipalityDetailsRef.update({
                            'bannerUrl': url
                        }).then(function (data) {
                            swal('Success', 'Banner successfully updated', 'success');

                            bannerDiv.slideUp();
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