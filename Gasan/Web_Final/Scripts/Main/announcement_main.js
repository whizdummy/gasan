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
            }, function (responseError) {
                alert(responseError.config.url + ": " + responseError.statusText);
            });
    }
});