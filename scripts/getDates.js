// Get the current year and populate it in the first paragraph of the footer
const currentYear = new Date().getFullYear();
document.querySelector('footer p:first-child span').textContent = currentYear;

// Get the last modified date and populate it in the second paragraph of the footer
const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last Modified: ${lastModified}`;
