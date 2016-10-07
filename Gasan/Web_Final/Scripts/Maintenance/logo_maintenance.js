app.controller('LogoMaintenanceController', function ($http, appSettings, fileUpload, municipalityService) {
    var vm = this;

    $(document).ready(function () {
        $('#logo_div').hide();
    })

    //getLogo();

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
        $('#logo_div').fadeIn();
    };

    vm.addLogoOnClick = function () {
        $('#logo_modal').modal('show');
    };

    vm.saveImageOnClick = function () {
        var file = vm.logoFile;
        console.log('file is ');
        console.dir(file);
        fileUpload.uploadFileToUrl(file, appSettings.BASE_URL + 'api/v1/logos');

        $('#logo_div').fadeOut();
    };
});