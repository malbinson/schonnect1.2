var announcementSheet = "https://docs.google.com/spreadsheets/d/1St1XPAGUI-7qQtP0eVgiuGMxzf_l9uAAPbh4kZIKC28/edit#gid=825329481";

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var options = {
    date: new Date(),
    mode: 'date'
};

var displayDate = "";

$(document).ready(function () {
    $("#formattedDate").hide();
    setTimeout(function () {
        $('#bottom').addClass("enter");
        $("#clock").css("opacity", "1");
    }, 500);
    
    $('.chooseDate,.circlechoice').on("click", function () {
        $('#searchArea').hide();
        options.date = new Date();
        datePicker.show(options, onSuccess, onError);
        //var xDate = new Date()
        //xDate.setDate(xDate.getDate()-4)
        //onSuccess(xDate);
    });
    
    $('#announcements').on('click', function (event) {
        var aId = event.target.id.substring(2);
        $(".spinner-loader").addClass("grow");
       sheetrock({
        url: announcementSheet,
        query: "SELECT A, B, C, D, E WHERE A CONTAINS \"" + aId + "\"",
        callback: displayAnnouncement,
        reset: true
       });        
      });
    
    $("#searchBox").keypress(function(event){
        if(event.keyCode == 13){
            displayDate="";
            var searchTerm = $(this).val().toUpperCase();
            sheetrock({
                url: announcementSheet,
                query: "SELECT A, B WHERE UPPER(B) CONTAINS '" + searchTerm + "' OR UPPER(E) CONTAINS '" + searchTerm + "'",
                callback: displayAnnouncements, 
                reset: true
            });
        }
    });    
});

var backButton = function() {

    if($("#top1").hasClass("enter")) {
        $('#bottom').show();
        $('#back a').attr("href", '../index.html');
    }
    else if($("#top2").hasClass("enter")) {
        $('#bottom').show();
        $('#top1').removeClass("exit");
        $('#top1').addClass("enter");
        $('#top2').removeClass("enter");
        $('#top2').addClass("exitRight");
        $("#formattedDate").hide();
        setTimeout(function () {
            $('#moreChoices').empty();
            $(".titleBox").empty();
            $("#searchArea").show();
            $(".chooseDate").show();
            $(".circlechoice").show();
            $(".circlechoice").removeClass("moveUp");
            $(".circlechoice i").removeClass("moveRight");
        },500);
    }
    else if($("#top3").hasClass("enter")) {
        $("#formattedDate").removeClass("moveLeft");
        $("#formattedDate").addClass("moveRight");
        $('#top2').removeClass("exitLeft");
        $('#top2').addClass("enter");
        $('#top3').removeClass("enter");
        $('#top3').addClass("exitRight");
    }
};

var displayAnnouncement = function(error, options, response) {   
    console.log(response);
    $('#descriptionTitle').empty();
    $('#descriptionContent').empty();
    
    $('#top2').addClass("exitLeft");    
    $('#top2').removeClass("enter");
    $('#top3').removeClass("exitRight");

    $(".spinner-loader").removeClass("grow");
    $('#formattedDate').addClass("moveLeft");

    $(".titleBox").html("<span id='backBox'><a onClick='backButton()'><img src='../img/back.png' width='55'/></a></span><span id='innerSpan'>" + displayDate + "</span><span id='rightBox'></span>");

    var header = response.raw.table.rows[0].c[1].v;
    var startDate = response.raw.table.rows[0].c[2].f;
    var endDate = response.raw.table.rows[0].c[3].f;
    var description = response.raw.table.rows[0].c[4].v;
    $('#descriptionTitle').html(  
        "<table><tr><td>" + header + "</td></tr><tr><td class='announcementDates'>" + formatedDate(startDate) + " to " + formatedDate(endDate) +    "</td></tr></table>"
    );
    $('#descriptionContent').html(description);
    $('#top3').addClass("enter");

    //wtf is this?
    var headHeight=document.getElementById('descriptionTitle').offsetHeight;
    var descTop=document.getElementById('descriptionContent').offsetTop;
    if(headHeight>descTop)
    {
        document.getElementById('descriptionContent').offsetHeight = document.getElementById('descriptionContent').offsetHeight - headHeight - descTop;
        document.getElementById('descriptionContent').offsetTop = headHeight;
    }        
    // ??
    
    $(".spinner-loader").removeClass("grow");
}

var displayAnnouncements = function(error, options, response) {
    console.log(response);
    $('#bottom').hide();
    $("#searchArea").hide();
    $(".circlechoice").hide();
    $(".chooseDate").hide();
    
    $('#top1').addClass("exitRight");
    $('#top1').removeClass("enter");
    $('#top2').addClass("enter");    
    $('#top2').removeClass("exitRight");
    
    $(".titleBox").html("<span id='backBox'><a onClick='backButton()'><img src='../img/back.png' width='55'/></a></span><span id='innerSpan'><div id='displayDate'></div></span><span id='rightBox'><a href='../index.html'><img src='../img/home.png' width='55'/></a></span>");
    
    if(displayDate.length<1) {
        displayDate = "ANNOUNCEMENT"
    }
    $("#displayDate").html(displayDate);


    $("#announcements").empty();
    
    if(response.rows.length<=1) {
        $("#announcements").append("No Matching Announcements");
    }

    for (var i = 1; i < response.rows.length; i++) {
        $("#announcements").append("<a id='a1" + response.rows[i].cells.name + "'><div id='d1" + response.rows[i].cells.id + "'><div id='d2" + response.rows[i].cells.id + "' class='wordscontainer'>" + response.rows[i].cells.name + "</div><div id='d3" + response.rows[i].cells.id + "' class='rightcontainer'><i id='i1" + response.rows[i].cells.id + "' class='fa fa-chevron-right'></i></div></div></a>");
    }   
    $("#formattedDate").show();

}

function onSuccess(date) {
    var month = date.getMonth()+1
    var day = date.getDate();    
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }        
    var queryDate = date.getFullYear() + "-" + month + "-" + day;
    displayDate = months[date.getMonth()] + " " + date.getDate() + ", " +  date.getFullYear();

    //document.getElementById("chosendate").value = queryDate;    
    if (!$(".circlechoice").hasClass("moveUp")) {
        $(".circlechoice").addClass("moveUp");
        $(".circlechoice i").addClass("moveRight");
        setTimeout(function () {
            //$("#formattedDate").css("opacity", "1");
        }, 1000);
    }

    $('#formattedDate').removeClass("moveLeft");
    $('#top1').removeClass("exit");
    $('#top2').removeClass("enter");
    $(".spinner-loader").addClass("grow");

    sheetrock({
        url: announcementSheet,
        query: "SELECT A, B WHERE C <= date '" + queryDate + "' and date '" + queryDate + "' <= D",
        callback: displayAnnouncements,
        reset: true
    });

    $(".spinner-loader").removeClass("grow");
}

function formatedDate(x) {
    var unedited = x;
    var yearmonthday = unedited.split("-");
    if (yearmonthday[2][0] == "0") {
        yearmonthday[2] = yearmonthday[2][1]
    }
    if (yearmonthday[1][0] == "0") {
        yearmonthday[1] = yearmonthday[1][1]
    }
    var edited = yearmonthday[1] + "/" + yearmonthday[2] + "/" + yearmonthday[0];

    return edited;

}

function onError(error) { // Android only
    $('#searchArea').show(); 
}
