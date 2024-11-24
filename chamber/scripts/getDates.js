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
