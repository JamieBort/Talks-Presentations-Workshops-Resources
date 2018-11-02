// from: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_win_settimeout_clock
// which is from: https://www.w3schools.com/jsref/met_win_settimeout.asp

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    console.log(h + ":" + m + ":" + s);
    setTimeout(function () { startTime() }, 1000);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

startTime();