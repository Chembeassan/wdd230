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
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.classList.toggle('nav-active');
    
    // Change hamburger to X when active
    hamburger.textContent = navLinks.classList.contains('nav-active') ? '✖' : '☰';
}
const toggleButton = document.getElementById('theme-toggle');
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });