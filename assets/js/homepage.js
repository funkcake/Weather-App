var userFormEl = document.querySelector("#user-form");
var languageButtonsEl = document.querySelector("#history");
var nameInputEl = document.querySelector("#city");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);

    // clear old content
    repoContainerEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
};

var buttonClickHandler = function(event) {
  // get the language attribute from the clicked element
  var language = event.target.getAttribute("data-language");

  if (language) {
    getFeaturedRepos(language);

    // clear old content
    repoContainerEl.textContent = "";
  }
};

// var button = $('<button>');
// button.class = "";
// button.text = "";

// button.append($(''));

var getUserRepos = function(city) {
  // format the github api url
  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&units=Imperial&appid=937ac5ea0c06bed7e77eb635c0541631";

  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          let city = data.city.name;
          console.log(city);
          console.log(data);
          console.log(data.list[0].main);
          
          displayRepos(data, city);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
};

var displayRepos = function(data, searchTerm) {

  let display = $("#repos-container");
  let temp = $('<h3></h3>');
  let high = $('<h3></h3>');
  let low = $('<h3></h3>');
  let wind =$('<h3></h3>');
  let hum = $('<h3></h3>');

  temp.text("Current: " + data.list[0].main.temp + " F");
  repoSearchTerm.textContent = searchTerm;
  display.append(temp);
  high.text("High:    " + data.list[0].main.temp_max + " F");
  display.append(high);
  low.text("Low:     " + data.list[0].main.temp_min + " F");
  display.append(low);
  wind.text("Wind:     " + data.list[0].wind.speed + " MPH");
  display.append(wind);
  hum.text("Humidity:     " + data.list[0].main.humidity + "%");
  display.append(hum);
  };

// add event listeners to form and button container
userFormEl.addEventListener("submit", formSubmitHandler);
//languageButtonsEl.addEventListener("click", buttonClickHandler);
