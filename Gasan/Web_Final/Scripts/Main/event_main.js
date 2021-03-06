﻿app.controller('EventController', function ($timeout) {
    var vm = this;

    // Current and upcoming events
    firebase.database().ref('events').orderByChild('isExpired').equalTo(false).on('value', function (data) {
        $timeout(function () {
            vm.currentEvents = data.val();
        });
    });

    // Past events
    firebase.database().ref('events').orderByChild('isExpired').equalTo(true).on('value', function (data) {
        $timeout(function () {
            vm.pastEvents = data.val();
        });
    });

    vm.parseDate = function (date) {
        return moment(date).format('MMMM DD, YYYY');
    };

    vm.joinEvent = function (joinType, id) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log('logged in!');
            } else {
                window.location.href = appSettings.basePath + '/useraccount';
            }
        });
    }
});