app.controller('OfficialController', function ($timeout) {
    var vm = this;
    var officialList = [];

    firebase.database().ref('officials').on('value', function (data) {
        officialList = [];

        data.forEach(function (childData) {
            var detail = childData.val();

            firebase.database().ref('positions/' + detail.position).once('value', function (snapshot) {
                $timeout(function () {
                    officialList.push({
                        id: childData.key,
                        firstName: detail.firstName,
                        middleName: detail.middleName,
                        lastName: detail.lastName,
                        imageUrl: detail.imageUrl,
                        description: detail.description,
                        position: snapshot.val().name
                    });
                });
            });
        });

        $timeout(function () {
            vm.officials = officialList;
        });
    });
});