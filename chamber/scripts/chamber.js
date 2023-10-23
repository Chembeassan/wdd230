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

  // Function to fetch and display the 3-day forecast
function display3DayForecast() {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const forecastData = data.list; // This contains the forecast for several time intervals

      // Extract the temperature data for the next 3 days
      const threeDayForecast = forecastData.slice(0, 8 * 3); // Assuming 8 data points per day

      // Display the 3-day forecast in your HTML
      for (let i = 0; i < 3; i++) {
        const temp = (threeDayForecast[i * 8].main.temp - 273.15).toFixed(2); // Convert Kelvin to Celsius
        document.getElementById(`day${i + 1}Temp`).textContent = `${temp}°C`;
      }
    });
}

// Call the function to fetch and display the 3-day forecast
display3DayForecast();




const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

// Check if this is the user's first visit
if (!localStorage.getItem("lastVisit")) {
  document.getElementById("message").textContent = "Welcome to the Lilongwe Chamber of Commerce's discovery portal! 🏛️ Explore the vibrant business community of Lilongwe, uncover economic opportunities, and stay updated on the latest events and initiatives. If you have any inquiries or require assistance, don't hesitate to contact our dedicated team. Let's together foster business growth and prosperity in Lilongwe!";
} else {
  // Get the last visit date from localStorage
  const lastVisit = parseInt(localStorage.getItem("lastVisit"));

  // Get the current date in milliseconds
  const currentDate = Date.now();

  // Calculate the difference in days
  const timeDifference = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));

  if (timeDifference === 1) {
      document.getElementById("message").textContent = "You last visited 1 day ago.";
  } else if (timeDifference < 1) {
      document.getElementById("message").textContent = "Back so soon! Awesome!";
  } else {
      document.getElementById("message").textContent = "You last visited " + timeDifference + " days ago.";
  }
}

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


// Function to fetch and display member data
function displayMembers(gridView) {
  fetch('data/members.json') // Relative path to the JSON file
    .then((response) => response.json())
    .then((jsonData) => {
      const membersContainer = document.getElementById('members-container');
      membersContainer.innerHTML = ''; // Clear previous data

      jsonData.members.forEach((member) => {
        const memberCard = document.createElement('div');
        memberCard.className = gridView ? 'member-card grid' : 'member-card list';

        // Populate memberCard with data from JSON
        memberCard.innerHTML = `
          <img src="images/${member.image}" alt="${member.name}">
          <h2>${member.name}</h2>
          <p>Address: ${member.address}</p>
          <p>Phone: ${member.phone}</p>
          <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
          <p>Membership Level: ${member.membershipLevel}</p>
          <p>Additional Information: ${member.otherInfo}</p>
        `;

        membersContainer.appendChild(memberCard);
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

// Call the function with grid view as default
displayMembers(true);

