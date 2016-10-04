function checkAuthUser() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.href = "http://localhost:64680/maintenance";
        } else {
            console.log('Not signed in!');
        }
    });
}

function adminLoginOnSubmit() {
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var loginButton = document.getElementById('contact-submit');

    loginButton.disabled = true;

    firebase.auth().signInWithEmailAndPassword(username.value.trim(), password.value.trim()).catch(function (error) {
        alert(error.message);
        loginButton.disabled = false;
    });

    checkAuthUser();
}

function logoutOnClick() {
    firebase.auth().signOut().then(function () {
        window.location.href = "http://localhost:64680/adminaccount";
    }, function (error) {
        console.log(error);
    });
}