$(function () {
    // variables
    var mode = 0;  // app mode
    var timeCounter = 0; // time counter
    var lapCounter = 0; // lap counter
    var action;  // variable for setInterval
    var lapNumber = 0; // Number of laps

    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;
    // minutes,secondes,centiseconds for time and lap

    // on app load show start and lap buttons
    hideShowButtons("#startButton", "#lapButton");

    // Click on start button
    $('#startButton').click(function () {
        // mode on
        mode = 1;
        // show stop and lap buttons
        hideShowButtons("#stopButton", "#lapButton");
        // start counter
        startAction();
    });


    // click on stop button
    $("#stopButton").click(function () {
        // show resume and reset buttons
        hideShowButtons("#resumeButton", "#resetButton");
        // stop counter
        clearInterval(action);

    });

    // click on resume button
    $("#resumeButton").click(function () {
        // show stop and lap buttons
        hideShowButtons("#stopButton", "#lapButton");
        // start counter
        startAction();
    });


    // click on reset button
    $("#resetButton").click(function () {
        // reload the page
        location.reload();
    });

    // click on lap button
    $("#lapButton").click(function () {
        // if mode is on 
        if (mode) {
            // stop action
            clearInterval(action);
            // reset lap and print lap details
            lapCounter = 0;
            addLap();
            // start action
            startAction();
        }

    });



    // functions
    // hideShowButtons to show two buttons
    function hideShowButtons(x, y) {
        $(".control").hide();
        $(x).show();
        $(y).show();
    }

    // start the counter
    function startAction() {
        action = setInterval(function () {
            timeCounter++;
            if (timeCounter == 100 * 60 * 100) {
                timeCounter = 0;
            }
            lapCounter++;
            if (lapCounter == 100 * 60 * 100) {
                lapCounter = 0;
            }
            updateTime();
        }, 10);
    }

    // updateTime: converts counter to minutes sec centisec
    function updateTime() {
        // 1minute= 60*100centiseconds=6000centiseconds
        timeMinutes = Math.floor(timeCounter / 6000);
        // 1sec=100centiseconds
        timeSeconds = Math.floor((timeCounter % 6000) / 100);
        timeCentiseconds = (timeCounter % 6000) % 100;
        $('#timeminute').text(format(timeMinutes));
        $('#timesecond').text(format(timeSeconds));
        $('#timecentisecond').text(format(timeCentiseconds));

        // 1minute= 60*100centiseconds=6000centiseconds
        lapMinutes = Math.floor(lapCounter / 6000);
        // 1sec=100centiseconds
        lapSeconds = Math.floor((lapCounter % 6000) / 100);
        lapCentiseconds = (lapCounter % 6000) % 100;
        $('#lapminute').text(format(lapMinutes));
        $('#lapsecond').text(format(lapSeconds));
        $('#lapcentisecond').text(format(lapCentiseconds));
    }

    // format Number
    function format(number) {
        if (number < 10) {
            return '0' + number;
        } else {
            return number;
        }
    }

    // addLap function: print lap details inside the lap box
    function addLap() {
        lapNumber++;
        var myLapDetails =
            '<div class="lap">' +

            '<div class="lapTimeTitle">' +
            'Lap' + lapNumber +
            '</div>' +

            '<div class="lapTime">' +
            '<span>' + format(lapMinutes) + '</span>' +
            ':<span>' + format(lapSeconds) + '</span>' +
            ':<span>' + format(lapCentiseconds) + '</span>'
        '</div>'

        '</div>';
        $(myLapDetails).prependTo("#laps");
    }
});