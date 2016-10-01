app.controller("LogoController", function (appSettings, logoService) {
    var municipalityLogo = document.getElementById('municipality-logo');

    logoService.getLogoDetails()
        .then(function (response) {
            if (response.status == 'S') {
                municipalityLogo.src    = appSettings.BASE_URL + appSettings.IMAGE_PATH + 'municipalities/' + response.data.image_path;
                municipalityLogo.alt    = response.data.name;
            }
        }, function (responseError) {
            alert(responseError.config.url + ": " + responseError.statusText);
        });
});