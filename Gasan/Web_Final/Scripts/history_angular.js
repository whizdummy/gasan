app.controller('HistoryController', function ($http, appSettings) {
    var vm = this;
    vm.isToggled = false;
    vm.toggleMessage = "Add";

    $(document).ready(function () {
        $('#history_div').hide();
    });

    vm.toggleHistoryFormOnClick = function (isToggled) {
        if (!isToggled) {
            $('#history_div').fadeIn();

            vm.isToggled = true;
            vm.toggleMessage = "Close";
        } else {
            $('#history_div').fadeOut();

            vm.isToggled = false;
            vm.toggleMessage = "Add";
        }
    }
});