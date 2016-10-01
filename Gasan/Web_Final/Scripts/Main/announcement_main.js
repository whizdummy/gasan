app.controller('AnnouncementController', function (announcementService) {
    var vm = this;

    // Current announcements
    announcementService.getAnnouncements(0)
        .then(function (response) {
            vm.currentAnnouncements = response.data;

            lapsedAnnouncements();
        }, function (responseError) {
            alert(responseError.config.url + ": " + responseError.statusText);
        });

    function lapsedAnnouncements() {
        // Lapsed/Past announcements
        announcementService.getAnnouncements(1)
            .then(function (response) {
                vm.lapsedAnnouncements = response.data;

                getNAnnouncements();
            }, function (responseError) {
                alert(responseError.config.url + ": " + responseError.statusText);
            });
    }

    function getNAnnouncements() {
        announcementService.getNAnnouncements(1)
            .then(function (response) {
                console.log(response);
                vm.announcementTitle    = response.data[0].title;
                vm.announcementDesc     = response.data[0].description;
            }, function (responseError) {
                alert(responseError.config.url + ": " + responseError.statusText);
            });
    }
});