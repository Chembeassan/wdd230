// Add this at the top of your JavaScript file
const city = 'Lilongwe';
const apiKey = '6119501e5883fefcc88a06bd40847c46';

// Function to fetch weather data
function fetchWeatherData(city, apiKey) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => response.json());
}

// Function to display the last modified date
function displayLastModifiedDate() {
  const lastModifiedElement = document.getElementById("lastModified");
  const lastModified = new Date(document.lastModified);
  lastModifiedElement.textContent = lastModified.toDateString();
}

// Function to display a welcome message or last visit message
function displayWelcomeMessage() {
  if (!localStorage.getItem("lastVisit")) {
    document.getElementById("message").textContent = "Welcome to the Lilongwe Chamber of Commerce's discovery portal! 🏛️ Explore the vibrant business community of Lilongwe, uncover economic opportunities, and stay updated on the latest events and initiatives. If you have any inquiries or require assistance, don't hesitate to contact our dedicated team. Let's together foster business growth and prosperity in Lilongwe!";
  } else {
    const lastVisit = parseInt(localStorage.getItem("lastVisit"));
    const currentDate = Date.now();
    const timeDifference = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));

    if (timeDifference === 1) {
      document.getElementById("message").textContent = "You last visited 1 day ago.";
    } else if (timeDifference < 1) {
      document.getElementById("message").textContent = "Back so soon! Awesome!";
    } else {
      document.getElementById("message").textContent = "You last visited " + timeDifference + " days ago.";
    }
  }
}

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

// Call the function to fetch and display weather data
fetchWeatherData(city, apiKey)
  .then(data => displayWeatherData(data));

// Call the function to display the last modified date
displayLastModifiedDate();

// Call the function to display the welcome message or last visit message
displayWelcomeMessage();

// Call the function with grid view as the default
displayMembers(true);
        // JavaScript code for showing the banner on specific days
        const banner = document.querySelector('.meet-and-greet-banner');
        const closeBannerButton = document.getElementById('closeBanner');
        const now = new Date();
        const dayOfWeek = now.getDay();

        if (dayOfWeek >= 1 && dayOfWeek <= 3) {
            // It's Monday, Tuesday, or Wednesday, so show the banner
            banner.style.display = 'block';

            // Add an event listener to the close button
            closeBannerButton.addEventListener('click', function () {
                banner.style.display = 'none';
            });
        }