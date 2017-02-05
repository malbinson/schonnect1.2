var backButton = function() {

    if($("#top1").hasClass("enter")) {
        $('#back a').attr("href", '../index.html');
    }
    else if($("#top2").hasClass("enter")) {
        $('#top1').removeClass("exit");
        $('#top1').addClass("enter");
        $('#top2').removeClass("enter");
        $('#top2').addClass("exitRight");
        setTimeout(function () {
            $('#moreChoices').empty();
            $(".titleBox").empty();
        },500);
    }
    else if($("#top3").hasClass("enter")) {
        $('#top2').removeClass("exitLeft");
        $('#top2').addClass("enter");
        $('#top3').removeClass("enter");
        $('#top3').addClass("exitRight");
    }
};

var eventDate;
var header;

var categorySheet = "https://docs.google.com/spreadsheets/d/1St1XPAGUI-7qQtP0eVgiuGMxzf_l9uAAPbh4kZIKC28/edit#gid=1";
var eventSheet = "https://docs.google.com/spreadsheets/d/1St1XPAGUI-7qQtP0eVgiuGMxzf_l9uAAPbh4kZIKC28/edit#gid=2";

$(document).ready(function () {
    $(".spinner-loader").addClass("grow");
    $("#cover").hide();
    $("#alertContainer").hide();
    $('#bottom').addClass("enter");


    
    sheetrock({
      url: categorySheet,
      query: "select A,B",
      callback: displayCategories,
      reset: true
    });
    
    $('#categoryChoices').on('click', function (event) {
        $(".spinner-loader").addClass("grow");        
        var query;        
        header =  $(event.target).text();
        
        if($(event.target).text() == "All") {
            query = "SELECT B,F,G,K"; 
        }
        else{
            query = "SELECT B,F,G,K WHERE J = " + event.target.id;
        }
        
        sheetrock({
           url: eventSheet,
           query: query,
           callback: displayEvents, 
           reset: true
        });    
    });  
    
    $("#searchBox").keyup(function(event){
        if(event.keyCode == 13){
            var searchTerm = $(this).val().toUpperCase();
            header = searchTerm;

            sheetrock({
               url: eventSheet,
               query: "SELECT B,F,G,K WHERE UPPER(D) CONTAINS '" + searchTerm + "' OR UPPER(B) CONTAINS '" + searchTerm + "'",
               callback: displayEvents,
               reset: true
            });
        }
    });
    
    $("#moreChoices").on('click', function (event) {
        $(".spinner-loader").addClass("grow");
        var eventid = event.target.id;
        var trueid = eventid.substring(0,eventid.length-2);
        
        sheetrock({
           url: eventSheet,
           query: "SELECT B, C, D, F, G, H WHERE K CONTAINS '" + eventid + "'",
           callback: displayEvent,
           reset: true
        });
    });    

    $("#cover").on("click", function () {
        $("#cover").removeClass("show");
        $("#alertContainer").removeClass("show");
        setTimeout(function () {
            $("#cover").hide();
            $("#alertContainer").hide();
        },500);
    });

    
});


var displayCategories = function (error, options, response) {
        if (!error) {
          for (i = 1; i < response.rows.length; i++) {
            $("#categoryChoices").append("<a class='categoryChoices'><div id='" + i + "'><div class='wordscontainer' id='" + response.rows[i].cells.CategoryId + "'>" + response.rows[i].cells.Category + "</div><div class='rightcontainer'><i class='fa fa-chevron-right'></i></div></div></a>");
          }
        }
    
    $(".spinner-loader").removeClass("grow");

};

var displayEvents = function (error, options, response) {
    console.log(response);
    $('#top1').addClass("exit");
    $('#top1').removeClass("enter");
    $('#top2').addClass("enter");
    $('#top2').removeClass("exitRight");
    $(".titleBox").append("<span id='backBox'><a onClick='backButton()'><img src='../img/back.png' width='40'/></a></span><span id='innerSpan'>" + header.toUpperCase() + "</span><span id='rightBox'></span>");  
    if (response.rows.length <= 1) {
        $("#moreChoices").append("<div id='noEvents'>There Are No Matching Events</div>")
    } else {
        for (i = 1; i < response.rows.length; i++) {
            var eventName = response.rows[i].cells.EventName;
            var eventId = response.rows[i].cells.eventid;
            var date = response.rows[i].cells.EventDate;
            var time = response.rows[i].cells.EventStartTime;
            var re = /[^(]+/;
            var strippedName = re.exec(eventName);
            $("#moreChoices").append(" \
            <table class='choices' id='" + eventId + "'> \
                <tr> \
                    <td class='eventNameTable' id='" + eventId + "'>" + strippedName + "</td> \
                    <td class='arrowTable' rowspan='2'><i id='" + eventId + "' class='fa fa-chevron-right'></i></td> \
                </tr> \
                <tr> \
                    <td class='eventDateTable' id='" + eventId + "'>" + date + " at " + time + "</td> \
                </tr> \
            </table> \
            ");
        }
    }            
  $(".spinner-loader").removeClass("grow");      
};   

var displayEvent = function (error, options, response) {
    console.log(response);
    eventDate = response.rows[1].cellsArray[3];
    eventTime = response.rows[1].cellsArray[4];
    eventName = response.rows[1].cellsArray[0];
    var re = /[^(]+/;
    var strippedName = re.exec(eventName);

    $("#detailTitle").html("<span id='backBox'><a onClick='backButton()'><img src='../img/back.png' width='40'/></a></span><span id='innerSpan'>EVENT DETAIL</span><span id='rightBox'></span>");

//    $("#alertTitle div").html("<span id='backBox'><a onClick='backButton()'><img src='../img/back.png' width='55'/></a></span><span id='innerSpan'>EVENT DETAIL</span><span id='rightBox'></span>");
    $("#name").html(strippedName);
    $("#where").html(response.rows[1].cellsArray[1]);
    $("#when").html(eventDate + "<br>" + response.rows[1].cellsArray[4] + " to " + response.rows[1].cellsArray[5]);
    $("#descriptionContent").html(response.rows[1].cellsArray[2]);
    $('#top2').addClass("exitLeft");
    $('#top2').removeClass("enter");
    $('#top3').addClass("enter");
    $('#top3').removeClass("exitRight");
    $(".spinner-loader").removeClass("grow");
};    

var openCover = function () {
    $("#cover").show();
    $("#alertContainer").show();
    setTimeout(function () {
        $("#cover").addClass("show");
        $("#alertContainer").addClass("show");
    }, 250);
};


// Set Alerts
var alarms = ["-", "-", "-", "-", "-", "-", "-", "-"];

toggleAlert = function (x) {
    var alertDate = new Date(eventDate);
    alertDate.setHours(eventTime.substring(0,eventTime.indexOf(":")));
    if(eventTime.indexOf("PM")!=-1 && eventTime.substring(0,2)!=12) { 
        alertDate.setHours(alertDate.getHours()+12); 
    }
    if(eventTime.indexOf("AM")!=-1 && eventTime.substring(0,2)==12) { 
        alertDate.setHours(0); 
    }
    alertDate.setMinutes(eventTime.substring(eventTime.indexOf(":")+1,eventTime.indexOf(":")+3));

    var newDate = new Date();
    if (x == "1Hour") {
        newDate = new Date(alertDate - 3600000);
        console.log("alarm date: " + newDate);
        if (alarms[0] == "-") {
            alarms[0] = newDate;
        } else {
            alarms[0] = "-";
        }
    }
    else if (x == "2Hours") {
        newDate = new Date(alertDate - 2 * 3600000);
        console.log("alarm date: " + newDate);
        if (alarms[1] == "-") {
            alarms[1] = newDate;
        } else {
            alarms[1] = "-";
        }
    }
    else if (x == "3Hours") {
        newDate = new Date(alertDate - 3 * 3600000);
        console.log("alarm date: " + newDate);
        if (alarms[2] == "-") {
            alarms[2] = newDate;
        } else {
            alarms[2] = "-";
        }
    }
    else if (x == "4Hours") {
        newDate = new Date(alertDate - 4 * 3600000);
        console.log("alarm date: " + newDate);
        if (alarms[3] == "-") {
            alarms[3] = newDate;
        } else {
            alarms[3] = "-";
        }
    }
    else if (x == "5Hours") {
        newDate = new Date(alertDate - 5 * 3600000);
        console.log("alarm date: " + newDate);
        if (alarms[4] == "-") {
            alarms[4] = newDate;
        } else {
            alarms[4] = "-";
        }
    }
    else if (x == "1Day") {
        newDate = new Date(alertDate);
        newDate.setDate(alertDate.getDate()-1);
        console.log("alarm date: " + newDate);
        if (alarms[5] == "-") {
            alarms[5] = newDate;
        } else {
            alarms[5] = "-";
        }
    }
    else if (x == "2Days") {
        newDate = new Date(alertDate);
        newDate.setDate(alertDate.getDate()-2);
        console.log("alarm date: " + newDate);
        if (alarms[6] == "-") {
            alarms[6] = newDate;
        } else {
            alarms[6] = "-";
        }
    }
    else if (x == "3Days") {
        newDate = new Date(alertDate);
        newDate.setDate(alertDate.getDate()-3);
        console.log("alarm date: " + newDate);
        if (alarms[7] == "-") {
            alarms[7] = newDate;
        } else {
            alarms[7] = "-";
        }
    }
};

setAlerts = function () {
    $(".spinner-loader").addClass("grow");
    var alertTimes = ["1 Hour","2 Hours","3 Hours","4 Hours","5 Hours","1 Day","2 Days","3 Days"];
    for(var x=0; x<alarms.length; x++) {
        if (alarms[x] != "-") {
            cordova.plugins.notification.local.schedule({
                title: $("#name").text() + " Begins In " + alertTimes[x],
                text: $("#where").text(),
                icon: "file://res/ios/icons/icon-small@2x.png",
                at: alarms[x]
            });
        }
    }
    $(".spinner-loader").removeClass("grow");
    $("#alertContainer").removeClass("show");
    $("#cover").removeClass("show");
    setTimeout(function () {
        $("#cover").hide();
        $("#alertContainer").hide();
    },500);

};
