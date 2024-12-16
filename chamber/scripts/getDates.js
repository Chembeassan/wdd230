// Get the current year
const yearSpan = document.getElementById('year');
const currentYear = new Date().getFullYear();
if (yearSpan) {
    yearSpan.textContent = currentYear;
}

// Get the last modified date
const lastModified = document.getElementById('lastModified');
if (lastModified) {
    const modifiedDate = document.lastModified;
    lastModified.textContent = `Last updated: ${modifiedDate}`;
}

document.addEventListener("DOMContentLoaded", function() {
    const visitMessage = document.getElementById('visit-message');

    // Get last visit date from localStorage
    const lastVisit = localStorage.getItem('lastVisit');
    
    // Store current date in milliseconds
    const currentDate = Date.now();
    
    // Update localStorage with the current visit date
    localStorage.setItem('lastVisit', currentDate);
    
    // Determine the message to display based on the last visit date
    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (daysSinceLastVisit < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitMessage.textContent = `You last visited ${daysSinceLastVisit} ${daysSinceLastVisit === 1 ? 'day' : 'days'} ago.`;
        }
    }

    // Lazy loading images
    const images = document.querySelectorAll('.main-content img');
    
    images.forEach(img => {
        img.src = img.dataset.src; // Set source from data-src attribute
        img.onload = () => img.classList.add('loaded'); // Add loaded class after image loads
        img.setAttribute('loading', 'lazy'); // Enable lazy loading
    });

    // Set current date and time as a timestamp for join.html
    const timestampInput = document.getElementById('timestamp');
    
    if (timestampInput) {
        const timestampDate = new Date();
        timestampInput.value = timestampDate.toISOString(); // Store in ISO format
    }

    // Fetch member data from JSON file for the directory page
    fetch('data/members.json')
      .then(response => response.json())
      .then(data => {
          displayMembers(data);
      })
      .catch(error => console.error('Error fetching member data:', error));

    // Function to display members in specified format
    function displayMembers(members) {
        const memberDirectory = document.getElementById('member-directory');
        memberDirectory.innerHTML = ''; // Clear previous content
        
        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('member-card');
            
            card.innerHTML = `
                ${member.image ? `<img src="${member.image}" alt="${member.name} logo" />` : ''}
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>Phone: ${member.phone}</p>
                ${member.website ? `<p><a href="${member.website}" target="_blank">Website</a></p>` : ''}
                ${member.description ? `<p>${member.description}</p>` : ''}
            `;
            
            memberDirectory.appendChild(card);
        });
     }

     // Toggle between grid and list views
     document.getElementById('grid-view').addEventListener('click', function() {
         const memberDirectory = document.getElementById('member-directory');
         memberDirectory.classList.remove('list-view');
         memberDirectory.classList.add('grid-view');
     });
     

     document.getElementById('list-view').addEventListener('click', function() {
         const memberDirectory = document.getElementById('member-directory');
         memberDirectory.classList.remove('grid-view');
         memberDirectory.classList.add('list-view');
     });

     // Search functionality for members
     const searchInput = document.getElementById('search-input');
     searchInput.addEventListener('input', function() {
         const filter = searchInput.value.toLowerCase();
         const memberCards = document.querySelectorAll('.member-card');

         memberCards.forEach(card => {
             const memberName = card.querySelector('h3').textContent.toLowerCase();
             if (memberName.includes(filter)) {
                 card.style.display = ''; // Show card
             } else {
                 card.style.display = 'none'; // Hide card
             }
         });
     });
});
const apiKey = '089d466540585d5b33a138a4b7014e40'; // Replace with your actual OpenWeatherMap API key
const city = 'Blantyre'; // Chamber location
const units = 'metric'; // Use 'imperial' for Fahrenheit

// Function to fetch current weather data
async function fetchCurrentWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error('Error fetching current weather:', error);
    }
}

// Function to display current weather data
function displayCurrentWeather(data) {
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    document.getElementById('temperature').textContent = `Temperature: ${temperature} °C`;
    document.getElementById('weather-description').textContent = `Condition: ${description}`;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Fetch forecast data after displaying current weather
    fetchForecast();
}

// Function to fetch 3-day forecast data
async function fetchForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

// Function to display forecast data
function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = ''; // Clear previous content

    // Iterate through the forecast data (every 8th entry corresponds to the same time of day)
    for (let i = 0; i < data.list.length; i += 8) {
        const forecastItem = document.createElement('div');
        const dateTime = new Date(data.list[i].dt * 1000); // Convert Unix timestamp to Date
        const dateString = dateTime.toLocaleDateString(); // Format date

        const temp = Math.round(data.list[i].main.temp);
        const iconCode = data.list[i].weather[0].icon;

        forecastItem.innerHTML = `
            <h4>${dateString}</h4>
            <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon">
            <p>Temp: ${temp} °C</p>
            <p>Condition: ${data.list[i].weather[0].description}</p>
        `;
        
        forecastContainer.appendChild(forecastItem);
    }
}

// Call the fetchCurrentWeather function when the DOM is loaded
document.addEventListener("DOMContentLoaded", fetchCurrentWeather);
document.addEventListener("DOMContentLoaded", function() {
   const today = new Date();
   const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
   const banner = document.getElementById('meet-greet-banner');

   // Show banner on Monday (1), Tuesday (2), or Wednesday (3)
   if (dayOfWeek >= 1 && dayOfWeek <= 3) {
       banner.style.display = 'block';
   }

   // Close banner functionality
   document.getElementById('close-banner').addEventListener('click', function() {
       banner.style.display = 'none';
   });
});
