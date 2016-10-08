app.controller('AnnouncementController', function ($timeout) {
    var vm = this;
    var announcementRef = firebase.database().ref('announcements');

    function checkExpiration(date, duration) {
        var expiryDate = moment(date);
        var currentDate = moment();
        
        return currentDate.isAfter(expiryDate.add(duration, 'h'));
    }

    announcementRef.orderByChild('isExpired').equalTo(false).on('value', function (data) {
        $timeout(function () {
            data.forEach(function (childData) {
                if (checkExpiration(childData.val().updatedAt, childData.val().duration)) {
                    firebase.database().ref('announcements/' + childData.key).update({
                        isExpired: true
                    });
                }
            });

            vm.currentAnnouncements = data.val();
        });
    });

    announcementRef.orderByChild('isExpired').equalTo(true).on('value', function (data) {
        $timeout(function () {
            vm.lapsedAnnouncements = data.val();
        });
    });

    vm.parseDate = function (unixTimestamp) {
        var date = moment(unixTimestamp).format("MMMM DD, YYYY (hh:mm a)");

        //console.log('dapat ', moment(unixTimestamp).add(2, 'h').format("MMMM DD, YYYY (hh:mm a)"));
        //console.log('ngayon ', moment().format("MMMM DD, YYYY (hh:mm a)"));

        //console.log(moment().isAfter(moment(unixTimestamp).add(2, 'h')));

        return date;
    }
});