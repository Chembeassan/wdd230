const baseURL = 'https://your-github-Chembeassan.github.io/wdd230/'; 
const linksURL = 'data/links.json';

// Function to fetch links data
async function getLinks() {
    try {
        const response = await fetch(linksURL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayLinks(data.weeks);
    } catch (error) {
        console.error('Error fetching links:', error);
    }
}

// Function to display links
function displayLinks(weeks) {
    const linksContainer = document.getElementById('learning-activities'); // Ensure this element exists in your HTML

    weeks.forEach(week => {
        const weekHeader = document.createElement('h3');
        weekHeader.textContent = week.week;
        linksContainer.appendChild(weekHeader);

        const list = document.createElement('ul');
        
        week.links.forEach(link => {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.href = baseURL + link.url;
            anchor.textContent = link.title;
            listItem.appendChild(anchor);
            list.appendChild(listItem);
        });

        linksContainer.appendChild(list);
    });
}

// Call getLinks function when the DOM is loaded
document.addEventListener("DOMContentLoaded", getLinks);
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const membersData = await response.json();
        displaySpotlightMembers(membersData);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

function displaySpotlightMembers(members) {
    const spotlightContainer = document.getElementById('spotlight-members'); // Ensure this element exists in your HTML
    spotlightContainer.innerHTML = ''; // Clear previous content

    // Filter members by Silver or Gold membership level
    const qualifiedMembers = members.filter(member => member.membershipLevel === 'Silver' || member.membershipLevel === 'Gold');

    // Randomly select 2-3 members
    const selectedMembers = [];
    
    while (selectedMembers.length < 3 && qualifiedMembers.length > 0) {
        const randomIndex = Math.floor(Math.random() * qualifiedMembers.length);
        selectedMembers.push(qualifiedMembers[randomIndex]);
        qualifiedMembers.splice(randomIndex, 1); // Remove selected member from array
    }

    selectedMembers.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card'); // Add styling class if needed
        
        memberCard.innerHTML = `
            <h4>${member.name}</h4>
            <p>${member.description}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            ${member.website ? `<p><a href="${member.website}" target="_blank">Visit Website</a></p>` : ''}
            ${member.image ? `<img src="${member.image}" alt="${member.name} logo" />` : ''}
        `;
        
        spotlightContainer.appendChild(memberCard);
    });
}

// Call getMembers function when the DOM is loaded
document.addEventListener("DOMContentLoaded", getMembers);
