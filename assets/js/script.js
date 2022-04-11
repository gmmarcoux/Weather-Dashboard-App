// API key
var apiKey = "b566228dcf229bc737a4cc14f0b4f362";

// current date
var currentdate = moment().format("[(]M[/]D[/]YYYY[)]");

// array 
var searchhistory = [];

// const for search side
const inputcity = document.querySelector("#inputcity");
const searchbtn = document.querySelector("#searchbtn");
const previoussearch = document.querySelector("#searchlist");

// const for weather side
const currentcityname = document.querySelector("#cityname");
const currenttemp = document.querySelector("#temperature");
const currentwindspeed = document.querySelector("#windspeeds");
const currenthumidity = document.querySelector("#humidity");
const currentUV = document.querySelector("#uvindex");

const fiveday = document.querySelector(".forecast");

// click event listener for the search btn 
$("#searchbtn").on("click", function(event) {
    event.preventDefault ();

    var city = inputcity.value.trim();
    if (!inputcity.value) {
        alert("Type a City")
        return
    } else {
        getcityweather(city);
        get5dayforecast(city);
        inputcity.value = "";
    }

    console.log('last searched: ${inputcity}');
    addsearchhistory();
});

// local storage
var loadsearches = function() {
    if (JSON.parse(localStorage.getItem("history"), searchhistory)) {
        searchhistory = localhistory;
        localhistory = JSON.parse(localStorage.getItem("history", searchhistory));
    } else {
        searchhistory = [];
    }
};

createhistoryitem();

// past search
var pastsearches = function(pastsearches) {

    previoussearch = document.createElement("button");
    previoussearch.textContent = pastsearches;
    previoussearch.classList = "w-100 btn-warning d-flex p-2";
    previoussearch.setAttribute("data-city", pastsearches);
    previoussearch.setAttribute("type", "submit");

    previoussearch.appendChild(pastsearches);
    searchbtn(inputcity.value);
};


// get weather in a city
var getcityweather = function(city) {
    var apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={APIkey}';

    fetch(apiURL).then(function(response){
        response.json().then(function(data){
            weather(data, city);
        });
    });
};

// display current weather
var weather = function(city, temp, wind, humidity, uvi) {

    currentcityname.textContent = city + "" + currentdate;
    inputcity.value= "";

    currenttemp.textContent = "Temperature: " + temp + "°F"
    currentwindspeed.textContent = "Wind: " + wind + "mph";
    currenthumidity.textContent = "Humidity: " + humidity + "%";
    
    currentUV.textContent = uvi;
    // changes the color of the UVIndex based on bootstraps' badges
    if (uvi <= 3) {
        currentUV.className = "badge bg-success";
    } else if (uvi <= 6) {
        currentUV.className = "badge bg-warning";
    } else {
        currentUV.className = "badge bg-danger";
    }
};

// 5-day forecast 
var get5dayforecast = function(city) {
    var apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={APIkey}';

    fetch(apiURL).then(function(response){
        response.json().then(function(data){
            forecastdisplay(data);
        });
    });
};

// display 5-day

var forecastdisplay = function(weather) {
    fiveday.textContent = ""

    var forecast = weather.list;
        for(var i = 5; i < forecast.length; i = i + 8) {
            var daily = forecast[i];

            // date
            var forecastdate = document.createElement("h7")
            forecastdate.textContent = moment.unix(daily.dt).format("MM D, YYYY");
            forecastdate.classList = "card-header text-center";

            fiveday.appendChild(forecastdate);

            // temperature
            var forecasttemp = document.createElement("span")
            forecasttemp.textContent = daily.main.temp + "°F";
            forecasttemp.classList = "card-body text-left";

            fiveday.appendChild(forecasttemp);

            // winds
            var forecastwind = document.createElement("span")
            forecastwind.textContent = daily.main.wind.speed;
            forecastwind.classList = "card-body text-left";

            fiveday.appendChild(forecastwind);

            // humidity 
            var forecasthumid = document.createElement("span")
            forecasthumid.textContent = daily.main.humidity;
            forecasthumid.classList = "card-body text-left";

            fiveday.appendChild(forecasthumid);
        }

}