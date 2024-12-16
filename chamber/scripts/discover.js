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

// Find the span element with the id "lastModified"
var lastModifiedSpan = document.getElementById("lastModified");

// Update the content of the span element with the current date
lastModifiedSpan.textContent = getCurrentDate();