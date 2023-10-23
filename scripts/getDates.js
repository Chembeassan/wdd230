
// Add this at the top of your JavaScript file
const city = 'Lilongwe';
const apiKey = '6119501e5883fefcc88a06bd40847c46';

// Function to fetch weather data
function fetchWeatherData(city, apiKey) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => response.json());
}


// Function to fetch and display weather data
function displayWeatherData(data) {
  const weatherDescription = data.weather[0].description;
  const temperatureKelvin = data.main.temp;
  const temperatureCelsius = (temperatureKelvin - 273.15).toFixed(2); // Convert Kelvin to Celsius

  // Display the weather information in your HTML
  document.querySelector('.weather-card h2').textContent = 'Weather Forecast';
  document.querySelector('.weather-card p:first-of-type').textContent = `Today's Weather: ${weatherDescription}`;
  document.querySelector('.weather-card p:last-of-type').textContent = `Temperature: ${temperatureCelsius}°C`;
}

// Call the function to fetch and display weather data
fetchWeatherData(city, apiKey)
  .then(data => displayWeatherData(data));

// Store the current date in localStorage
localStorage.setItem("lastVisit", Date.now().toString());
// Function to get the current date in the format "DD Month YYYY"
function getCurrentDate() {
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString(undefined, options);
}

// Find the span element with the id "lastModified" within the footer
var lastModifiedSpan = document.getElementById("lastModified");

// Update the content of the span element with the current date
lastModifiedSpan.textContent = getCurrentDate();

// Visit counter using localStorage
let visitCounter = parseInt(localStorage.getItem('visitCounter')) || 0;
visitCounter++;
localStorage.setItem('visitCounter', visitCounter);
document.getElementById('visitCounter').textContent = visitCounter;
