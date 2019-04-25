$(document).ready(function() {
    
    var config = {
      apiKey: "AIzaSyAG8kdddQOHcue9Uk-v0w8m4tlE2bSqBpM",
      authDomain: "test-app-beta-1.firebaseapp.com",
      databaseURL: "https://test-app-beta-1.firebaseio.com",
      projectId: "test-app-beta-1",
      storageBucket: "test-app-beta-1.appspot.com",
      messagingSenderId: "863709623134"
    };
    firebase.initializeApp(config);
    var database =firebase.database();


    //capture button click
    $("#addTrain").on("click", function (event){
        event.preventDefault();
    //grab values from the text boxes
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();
    //push data
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency:  frequency
        });
    });

    //firebase return the data
    database.ref().on("child_added",function (childSnapshot){
        var newTrain = childSnapshot.val().trainName;
        var newDestination = childSnapshot.val().destination;
        var newFirstTrain = childSnapshot.val().firstTrain;
        var newFrequency = childSnapshot.val().frequency;

        //first time(push back 1,year)
        var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1,"years");
        //current time
        var currentTime = moment();
        //different between times
        var diffTime = moment().diff(moment(startTimeConverted),"minutes");
        //time apart(remainder)
        var tRemainder = diffTime % newFrequency;
        //minute untill train
        var tMinutesTillTrain = newFrequency - tRemainder;
        //next train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var catchTrain = moment(nextTrain).format("HH:mm");

        //Display on page
        $("#all-display").append(
            ' <tr><td>' + newTrain + ' </td><td>' + newDestination + ' </td><td>' + newFrequency +' </td><td>' + catchTrain + ' </td><td>' + tMinutesTillTrain + ' </td></tr>'
        );

        //clear input
        $("#trainName, #destination, #firstTrain, #frequency").val("");
        return false;
    },
        //handle errors
        function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
    });
});
 