// Defining a baseURL and key to as part of the request URL

let baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
let key = "INSERT-YOUR-API-KEY-HERE";
let url;

// Grab references to all the DOM elements you'll need to manipulate

let searchTerm = document.querySelector(".search");
let startDate = document.querySelector(".start-date");
let endDate = document.querySelector(".end-date");
let searchForm = document.querySelector("form");
let submitBtn = document.querySelector(".submit");

let nextBtn = document.querySelector(".next");
let previousBtn = document.querySelector(".prev");

let section = document.querySelector("section");
let nav = document.querySelector("nav");

// Hide the "Previous"/"Next" navigation to begin with, as we don't need it immediately
nav.style.display = "none";

// define the initial page number and status of the navigation being displayed
let pageNumber = 0;
let displayNav = false;

// Event listeners to control the functionality
