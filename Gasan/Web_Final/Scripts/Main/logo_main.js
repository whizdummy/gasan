var municipalityLogo = document.getElementById('municipality-logo');

firebase.database().ref('details/imageUrl').on('value', function (data) {
    municipalityLogo.src = data.val();
});