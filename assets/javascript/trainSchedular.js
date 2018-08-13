
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

$("#add-train").on("click", function () {
    $('#exampleModalCenter').modal();
    $("#inputTrainName").val(" ");
    $("#inputDestination").val(" ");
    $("#inputTime").val(" ");
    $("#inputFrequency").val(" ");

})

// On click submit button adds train to the list
$("#submit").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#inputTrainName").val();
    var destination = $("#inputDestination").val();
    var firstTrainTime = $("#inputTime").val();
    var frequency = $("#inputFrequency").val();

    var trainEntry = {
        "trainName": trainName,
        "destination": destination,
        "firstTrainTime": firstTrainTime,
        "frequency": frequency,
    };

    console.log("Train Entry:" + trainEntry);

    database.ref().push(trainEntry, function () {
        console.log("Successful Entry");
    });
})

database.ref().on("child_added", function (snapshot) {
    var firstTrainTime = snapshot.val().firstTrainTime;
    var frequency = snapshot.val().frequency;

    var convFirstTrainTime = moment(firstTrainTime, "HH:mm");
    //console.log("The First train time now is:" + convFirstTrainTime);

    var currentTime = moment();
    //console.log("The time now is:" + currentTime);


    var difference = moment().diff(moment(convFirstTrainTime), "minutes");
    //console.log("The time difference is:" + difference);

    var remainder = difference % frequency;
    //console.log(remainder);

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
    var updateBtnRow = $("<tr>");
    var tUpdate = $("<button>");
    tUpdate.attr('id', snapshot.key);
    updateBtnRow.append(tUpdate);

    // var tDelete = $("<button>");

    // display the value using text attribute
    tName.text(snapshot.val().trainName);
    tdestination.text(snapshot.val().destination);
    tFrequency.text(snapshot.val().frequency);
    tnextArrival.text(nextTrainArrival);
    tMinAway.text(minsTillNextTrain);
    tUpdate.text("Update");
    //tDelete.text("Delete");

    $("#inputTrainName").val(snapshot.val().trainName);
    $("#inputDestination").val(snapshot.val().destination);
    $("#inputTime").val(snapshot.val().firstTrainTime);
    $("#inputFrequency").val(snapshot.val().frequency);


    // Append the result to display
    $("#train-time").append(tName).append("<br>");
    $("#desti-nation").append(tdestination).append("<br>");
    $("#frequ-ency").append(tFrequency).append("<br>");
    $("#next-arrival").append(tnextArrival).append("<br>");
    $("#min-away").append(tMinAway).append("<br>");
    //$("#update-train").append(updateBtnRow).append("<br>");
    // $("#delete-train").append(tDelete);
    // $("#" + snapshot.key).on("click", function () {
    //     $("#inputTrainName").val(snapshot.val().trainName);
    //     $("#inputDestination").val(snapshot.val().destination);
    //     $("#inputTime").val(snapshot.val().firstTrainTime);
    //     $("#inputFrequency").val(snapshot.val().frequency);
    //     $("#exampleModalCenter").modal();
    // });

})

// $document().on("click", "#tUpdate", function () {
//     alert("Cannot delete now !!");
// })

