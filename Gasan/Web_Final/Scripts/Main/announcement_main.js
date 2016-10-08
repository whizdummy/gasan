app.controller('AnnouncementController', function ($timeout) {
    var vm = this;
    var announcementRef = firebase.database().ref('announcements');

    announcementRef.orderByChild('isExpired').equalTo(false).on('value', function (data) {
        $timeout(function () {
            vm.currentAnnouncements = data.val();
        });
    });

    announcementRef.orderByChild('isExpired').equalTo(true).on('value', function (data) {
        $timeout(function () {
            vm.lapsedAnnouncements = data.val();
        });
    });

    vm.parseDate = function (unixTimestamp) {
        var date = moment(unixTimestamp).format("MMMM DD, YYYY");
        console.log(date);

        return date;
    }
});