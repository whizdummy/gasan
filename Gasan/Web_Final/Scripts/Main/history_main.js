app.controller('HistoryController', function ($timeout) {
    var vm = this;

    firebase.database().ref('histories').on('value', function (data) {        
        $timeout(function () {
            vm.histories = data.val();
        });
    });
});