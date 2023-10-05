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
