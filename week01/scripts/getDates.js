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
