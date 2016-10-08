firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(firebase.auth().currentUser.uid);

        $('li.user-auth-group').hide();
    } else {
        $('li.user-auth-group').show();
        $('li.dropdown').hide();
    }
});

function adminLoginOnSubmit() {
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var loginButton = document.getElementById('contact-submit');

    loginButton.disabled = true;

    firebase.auth().signInWithEmailAndPassword(username.value.trim(), password.value.trim()).then(function () {
        var user = firebase.auth().currentUser;

        if (user) {
            firebase.database().ref('users/' + user.uid).once('value', function (data) {
                if (data.val().isAdmin) {
                    $('li.user-auth-group').hide();

                    window.location.href = appSettings.basePath + "maintenance";
                }
            });
        }
    }).catch(function (error) {
        swal('Error', error.message, 'error');
        loginButton.disabled = false;
    });
}

function logoutOnClick() {
    firebase.auth().signOut().then(function () {
        window.location.href = appSettings.basePath + "adminaccount";
    }, function (error) {
        console.log(error);
    });
}