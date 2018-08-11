
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


// On click submit button adds train to the list
$("#submit").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#inputTrainName").val();
    var destination = $("#inputDestination").val();
    var firstTrainTime = $("#inputTime").val();
    var frequency = $("#inputFrequency").val();

    console.log("Train Name : " + trainName);
    console.log("Train Destination : " + destination);
    console.log("First Train time : " + firstTrainTime);
    console.log(" Frequency : " + frequency);

    database.ref().push({
        "trainName": trainName,
        "destination": destination,
        "firstTrainTime": firstTrainTime,
        "frequency": frequency,
    }, function () {
    });
})

database.ref().on("child_added", function (snapshot) {

    var firstTrainTime = snapshot.val().firstTrainTime;
    var frequency = snapshot.val().frequency;

    var convFirstTrainTime = moment(firstTrainTime, "HH:mm");
    console.log("The First train time now is:" + convFirstTrainTime);

    var currentTime = moment();
    console.log("The time now is:" + currentTime);


    var difference = moment().diff(moment(convFirstTrainTime), "minutes");
    console.log("The time difference is:" + difference);


    var remainder = difference % frequency;
    //console.log("Minutes Away: " + remainder);

    //Minute untill next train to arrive
    var minsTillNextTrain = frequency - remainder;
    console.log("Minutes till next train:" + minsTillNextTrain);

    // Next train time
    var nextTrainTime = moment().add(minsTillNextTrain, "minutes");
    var nextTrainArrival = nextTrainTime.format("HH:mm");

    console.log("Next train arrival: " + nextTrainArrival)

    //creating rows for each train input
    var tName = $("<tr>");
    var tdestination = $("<tr>");
    var tFrequency = $("<tr>");
    var tnextArrival = $("<tr>");
    var tMinAway = $("<tr>");

    // display the value using text attribute
    tName.text(snapshot.val().trainName);
    tdestination.text(snapshot.val().destination);
    tFrequency.text(snapshot.val().frequency);
    tnextArrival.text(nextTrainArrival);
    tMinAway.text(minsTillNextTrain);


    // Append the result to display
    $("#train-time").append(tName);
    $("#desti-nation").append(tdestination);
    $("#frequ-ency").append(tFrequency);
    $("#next-arrival").append(tnextArrival);
    $("#min-away").append(tMinAway);
})



