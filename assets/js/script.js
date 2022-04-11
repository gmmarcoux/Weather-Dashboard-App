// API key
var apiKey = "b566228dcf229bc737a4cc14f0b4f362";

// current date
var currentdate = moment().format("[(]M[/]D[/]YYYY[)]");

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

// 