 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD3T32cFyZWG60ol0ZraQrCuhu04oWsOJg",
    authDomain: "bootcamp-f5592.firebaseapp.com",
    databaseURL: "https://bootcamp-f5592.firebaseio.com",
    projectId: "bootcamp-f5592",
    storageBucket: "bootcamp-f5592.appspot.com",
    messagingSenderId: "988083039861"
  };
  firebase.initializeApp(config);

// Assumptions
    var tFrequency = 3;
    var now = moment()
    console.log(now);
    
    var database = firebase.database();

    // Time is 3:30 AM
    var firstTime = "03:30";
    var lastime="12.30"

    setInterval(function(){
        $('.current-time').html(moment().format('dddd, MMMM D YYYY, h:mm:ss A'))
    }, 1000);
    //User input on click
    $("#add-user").on("click", function (event) {
        event.preventDefault();
        $("#name-input").empty();
        $("#destination-input").empty();
        $("#time-input").empty();
        $("#frequency-input").empty();
    
        var trainName = $("#name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTrain = $("#time-input").val().trim();
        var frequency = $("#frequency-input").val().trim();
    
        var firstTrainMoment = moment(firstTrain, "hh:mm A");
        var nowMoment = moment();
      
        var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, "minutes");
        var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
        var minutesAway = frequency - minutesSinceLastArrival;
      
        var nextArrival = nowMoment.add(minutesAway, "minutes");
        var formatNextArrival = nextArrival.format("hh:mm A");
        //console logging user inputs
        console.log(trainName);
        console.log(destination);
        console.log(firstTrain);
        console.log(frequency);
        console.log(formatNextArrival);
        console.log(minutesAway);
       
    
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            formatNextArrival: formatNextArrival,
            minutesAway: minutesAway,
        });
    
    });
        //Adding info to firebase
        database.ref().on("child_added", function (snapshot) {
            
            var tableItem = $("<tr>");
            var row = $("<td>")
    
            row = $("<td>" + snapshot.val().trainName + "</td>");
            tableItem.append(row);
    
            row = $("<td>" + snapshot.val().destination + "</td>");
            tableItem.append(row);
    
            row = $("<td>" + snapshot.val().frequency + "</td>");
            tableItem.append(row);
    
            row = $("<td>" + snapshot.val().formatNextArrival + "</td>")
            tableItem.append(row);
    
            row = $("<td>" + snapshot.val().minutesAway + "</td>")
            tableItem.append(row);
    
            $("#dataRow").append(tableItem);
    
        }, function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        
    }); 