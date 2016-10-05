var municipalityLogo = document.getElementById('municipality-logo');
var storage = firebase.storage();
var storageRef = storage.ref('images/logo.jpg');

storageRef.getDownloadURL()
    .then(function (data) {
        municipalityLogo.src = data;
    }).catch(function (error) {
        alert(error.message);
    });