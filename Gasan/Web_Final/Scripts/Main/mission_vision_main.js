var municipalityRef = firebase.database().ref('details');
var mission = document.getElementById('mission-details');
var vision = document.getElementById('vision-details');

municipalityRef.on('value', function (data) {
    mission.innerHTML = data.val().mission;
    vision.innerHTML = data.val().vision;
});