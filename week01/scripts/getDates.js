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

function toggleMenu() {
    const navList = document.querySelector('nav ul');
    const hamburger = document.querySelector('.hamburger');

    // Toggle the 'active' class on both elements
    navList.classList.toggle('active');
    hamburger.classList.toggle('active');
}
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('registration-form');
    
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    form.addEventListener('submit', function(event) {
        if (passwordInput.value !== confirmPasswordInput.value) {
            event.preventDefault(); // Prevent form submission
            alert("Passwords do not match. Please try again.");
            passwordInput.value = ''; // Clear password fields
            confirmPasswordInput.value = '';
            passwordInput.focus(); // Focus back on the first password field
        }
    });

    // Update the displayed rating value based on range input
    const ratingInput = document.getElementById('page-rating');
    const ratingValueDisplay = document.getElementById('rating-value');

    ratingInput.addEventListener('input', function() {
        ratingValueDisplay.textContent = ratingInput.value; // Display current value
    });
});
