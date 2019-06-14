// Defining a baseURL and key to as part of the request URL

var baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
var key = "API-KEY";
var url;

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
searchForm.addEventListener("submit", submitSearch);
nextBtn.addEventListener("click", nextPage);
previousBtn.addEventListener("click", previousPage);

function nextPage(e) {
  pageNumber++;
  fetchResults(e);
}

function previousPage(e) {
  if (pageNumber > 0) {
    pageNumber--;
  } else {
    return;
  }
  fetchResults(e);
}

function submitSearch(e) {
  pageNumber = 0;
  fetchResults(e);
}

function fetchResults(e) {
  // Use preventDefault() to stop the form submitting
  e.preventDefault();

  // Assemble the full URL
  //   https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=YOUR-API-KEY-HERE&page=0&q=cats
  // &fq=document_type:("article")&begin_date=20170301&end_date=20170312
  // https://developer.nytimes.com/docs/articlesearch-product/1/overview
  url =
    baseURL +
    "?api-key=" +
    key +
    "&page=" +
    pageNumber +
    "&q=" +
    searchTerm.value +
    '&fq=document_type:("article")';

  if (startDate.value !== "") {
    url += "&begin_date=" + startDate.value;
  }

  if (endDate.value !== "") {
    url += "&end_date=" + endDate.value;
  }

  // Use fetch() to make the request to the API
  fetch(url)
    .then(function(result) {
      return result.json();
    })
    .then(function(json) {
      displayResults(json);
    });
}

function displayResults(json) {
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }

  let articles = json.response.docs;

  if (articles.length === 10) {
    nav.style.display = "block";
  } else {
    nav.style.display = "none";
  }

  if (articles.length === 0) {
    let para = document.createElement("p");
    para.textContent = "No results returned.";
    section.appendChild(para);
  } else {
    for (let i = 0; i < articles.length; i++) {
      let article = document.createElement("article");
      let heading = document.createElement("h2");
      let link = document.createElement("a");
      let img = document.createElement("img");
      let para1 = document.createElement("p");
      let para2 = document.createElement("p");
      let clearfix = document.createElement("div");

      let current = articles[i];
      console.log(current);

      link.href = current.web_url;
      link.textContent = current.headline.main;
      para1.textContent = current.snippet;
      para2.textContent = "Keywords: ";
      for (let j = 0; j < current.keywords.length; j++) {
        let span = document.createElement("span");
        span.textContent += current.keywords[j].value + " ";
        para2.appendChild(span);
      }

      if (current.multimedia.length > 0) {
        img.src = "http://www.nytimes.com/" + current.multimedia[0].url;
        img.alt = current.headline.main;
      }

      clearfix.setAttribute("class", "clearfix");

      article.appendChild(heading);
      heading.appendChild(link);
      article.appendChild(img);
      article.appendChild(para1);
      article.appendChild(para2);
      article.appendChild(clearfix);
      section.appendChild(article);
    }
  }
}
