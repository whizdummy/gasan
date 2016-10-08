app.controller('BannerController', function ($timeout) {
    var vm = this;

    firebase.database().ref('details/bannerUrl').on('value', function (data) {
        $timeout(function () {
            vm.bannerUrl = data.val();
            console.log(vm.bannerUrl);
        });
    });
});