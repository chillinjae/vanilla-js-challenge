var x = document.getElementById("js-weather");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const lat = Math.ceil(position.coords.latitude);
    const lon = Math.ceil(position.coords.longitude);
    let url =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat.toString() +
        "&lon=" +
        lon.toString() +
        "&appid=7a2fec40a2ca2fed17070fc2199dcafb";

    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onload = function () {
        console.log(request);
        if (request.status === 200) {
            console.log(JSON.parse(request.response));
            const country = JSON.parse(request.response)["sys"]["country"];
            const weatherMain = JSON.parse(request.response)["weather"]["0"][
                "main"
            ];
            const icon = JSON.parse(request.response)["weather"]["0"]["icon"];
            const temp = Math.round(
                JSON.parse(request.response)["main"]["temp"] - 273.15
            );
            x.innerHTML =
                "<img class='weather-icon' src='https://openweathermap.org/img/wn/" +
                icon +
                ".png' />" +
                "<div class='temp'>" +
                temp +
                "°C" +
                "</div>" +
                "<div class='country'>" +
                country +
                "</div>" +
                "<div class='weatherMain'>" +
                weatherMain +
                "</div>";
        } else {
            console.log(`error ${request.status} ${request.statusText}`);
        }
    };
}

function init() {
    getLocation();
}

init();
