
// Initialized Firebase
var config = {
    apiKey: "AIzaSyDFhHNigeUTGXONg4Og88QbsebaNZCY5iw",
    authDomain: "trainschedulardb.firebaseapp.com",
    databaseURL: "https://trainschedulardb.firebaseio.com",
    projectId: "trainschedulardb",
    storageBucket: "trainschedulardb.appspot.com",
    messagingSenderId: "962474536939"
};
firebase.initializeApp(config);

// Saved the database object in a variable

var database = firebase.database();

console.log("database" + database);
// On click submit button adds train to the list

$("#submit").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#inputTrainName").val();
    var destination = $("#inputDestination").val();
    // var firstTrainTime = $("#inputTime").val();
    var frequency = $("#inputFrequency").val();

    console.log(trainName);
    console.log(destination);
    // console.log(firstTrainTime);
    console.log(frequency);

    database.ref().push({
        "trainName": trainName,
        "destination": destination,
        // "firstTrainTime": firstTrainTime,
        "frequency": frequency,
    }, function () {
        console.log("did this run??????");
    });
})

database.ref().on("child_added", function (snapshot) {
    var value = snapshot.val();
    //snapshot.val().empName
    var tName = $("<tr>");
    var tdestination = $("<tr>");
    var tFrequency = $("<tr>");
    // display the value using text attribute
    tName.text(snapshot.val().trainName);
    tdestination.text(snapshot.val().destination);
    tFrequency.text(snapshot.val().frequency);

    // var erole = $("<tr>")
    $("#train-time").append(tName);
    $("#desti-nation").append(tdestination);
    $("#frequ-ency").append(tFrequency);
})



