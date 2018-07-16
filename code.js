$(document).ready(function() {
  var min = 25; //default start time
  var breakMin = 5; //default break time
  var startTime = min * 60; //this is the variable that gets decremented every second
  var startTime2 = startTime; //store the time amount to restore startTime back to right amount when break is over
  var breakTime = breakMin * 60;
  var sec = "00"; // just for looks
  var start = ""; // variable for setInterval
  var flip = 1; // a switch that marks if the timer is running or not
  var count = 2; // lets the "count" function know in conjunction with the "isEven" function which time amount (breakTime or Starttime2) to set startTime to
  var percentage; // value to put into the progress bar element
  var time = new Date();
  var seconds = time.getSeconds();

  $(".timer").html(min + ":" + sec);
  $(".breakMin").html(breakTime / 60);
  $(".sessMin").html(min);

  $(".brIn").click(function() {
    if (flip == 1) {
      breakMin++;
      $(".breakMin").html(breakMin);
      breakTime = breakMin * 60;
    }
  });

  $(".brDec").click(function() {
    if (flip == 1) {
      if (breakMin > 1) {
        breakMin--;
        $(".breakMin").html(breakMin);
        breakTime = breakMin * 60;
      }
    }
  });

  $(".sessIn").click(function() {
    if (flip == 1) {
      min++;
      $(".sessMin").html(min);
      $(".timer").html(min + ":" + sec);
      startTime = min * 60;
      startTime2 = startTime;
    }
  });
  $(".sessDec").click(function() {
    if (flip == 1) {
      if (min > 1) {
        min--;
        $(".sessMin").html(min);
        $(".timer").html(min + ":" + sec);
        startTime = min * 60;
        startTime2 = startTime;
      }
    }
  });

  function isEven(n) {
    return n % 2 === 0;
  }

  function counter() {
    var min = startTime / 60;
    min = Math.floor(min);
    var sec = startTime % 60;
    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }
    $(".timer").html(min + ":" + sec);

    startTime--;

    $(".progress").css("width", percentage);

    if (startTime === 0) {
      var wav =
        "https://notificationsounds.com/soundfiles/2421fcb1263b9530df88f7f002e78ea5/file-39_martian-gun.mp3";
      var audio = new Audio(wav);
      audio.play();
    }

    if (startTime === 0 && isEven(count)) {
      startTime = breakTime;
      count++;
    }
    if (startTime === 0 && !isEven(count)) {
      startTime = startTime2;
      count++;
    }
    if (isEven(count)) {
      percentage = 100 - startTime / startTime2 * 100;
      percentage = percentage.toString() + "%";
    }
    if (!isEven(count)) {
      percentage = 100 - startTime / breakTime * 100;
      percentage = percentage.toString() + "%";
    }
  }

  function timeCorrection() {
    var checkTime = new Date();
    var checkSeconds = checkTime.getSeconds();
    if (checkSeconds !== seconds) {
      counter();
      time = new Date();
      seconds = time.getSeconds();
    }
  }

  $(".start").click(function() {
    if (flip == 1) {
      start = setInterval(timeCorrection, 100);
      flip++;
    }
  });
  $(".end").click(function() {
    if (flip == 2) {
      clearInterval(start);
      flip--;
    }
  });
  $(".reset").click(function() {
    startTime = startTime2;
    count = 2;
    $(".timer").html(min + ":" + sec);
  });
});
//known bugs
