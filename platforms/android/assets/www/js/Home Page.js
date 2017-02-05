document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady(){
    if(navigator.connection.type == Connection.NONE) {
        alert("No Network");
    }
}    

$(document).ready(function() {
    $("#cover").hide();
    $("#scheduledContainer").hide();
    $('#announcementcircle').click(function(ev) {
        $('#calendarcircle').css("opacity", "0");
        $('#Title').css("opacity", "0");
        $('.name').fadeOut(1000);
        $("#bell").fadeOut(1000);
        $("#clearContainer").fadeOut(1000);
        $(this).addClass("change");
        setTimeout(function() {
            $("#clock").fadeIn(1000);
        },1000);

        var href = $(this).attr('href');
        setTimeout(function() {window.location = href}, 1000);
        return false;
    });
    $("#calendarcircle").click(function() {
        $("#everything_wrapper").css("opacity", "0");
        var href = $(this).attr('href');
        setTimeout(function() {window.location = href}, 1000);
        return false;
    });
    $("#cover").on("click", function () {
        $("#cover").removeClass("show");
        $("#scheduledContainer").removeClass("show");
        setTimeout(function () {
            $("#cover").hide();
            $("#scheduledContainer").hide();
        },500);
    });
});

    showSchedule = function () {
        $("#cover").show();
        $("#scheduledContainer").show();
        setTimeout(function () {
            $("#cover").addClass("show");
            $("#scheduledContainer").addClass("show");
        }, 250);
            cordova.plugins.notification.local.getScheduled(callbackOpts);
    };
    var callbackOpts = function (notifications) {
        console.log(notifications);
        showToast(notifications.length === 0 ? '- none -' : notifications.join(' ,'));
    };

    showToast = function (text) {
        setTimeout(function () {
            $("#scheduledContainer").text("Hello");
        }, 100);
    };


checkDevice = function () {

};