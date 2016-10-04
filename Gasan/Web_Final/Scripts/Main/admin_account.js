function adminLoginOnSubmit() {
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var loginButton = document.getElementById('contact-submit');

    loginButton.disabled = true;

    firebase.auth().signInWithEmailAndPassword(username.value.trim(), password.value.trim()).then(function (user) {
        window.location.href = "http://localhost:64680/maintenance";
    }).catch(function (error) {
        alert(error.message);
        loginButton.disabled = false;
    });
}

function logoutOnClick() {
    firebase.auth().signOut().then(function () {
        window.location.href = "http://localhost:64680/adminaccount";
    }, function (error) {
        console.log(error);
    });
}