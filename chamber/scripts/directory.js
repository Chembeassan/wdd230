
document.addEventListener('DOMContentLoaded', function() {
    const memberList = document.getElementById('member-list');
    
    // Fetch member data from JSON file
    fetch('data/members.json')
      .then(response => response.json())
      .then(data => {
          displayMembers(data);
      });

    function displayMembers(members) {
      members.forEach(member => {
          if (member.name) { // Ensure name exists to avoid displaying empty entries
              const section = document.createElement('section');
              section.innerHTML = `
                  <img src="${member.image || 'default-image.png'}" alt="${member.name}" />
                  <h3>${member.name}</h3>
                  <p>${member.address || 'Address not available'}</p>
                  <p>${member.phone || 'Phone not available'}</p>
                  <a href="${member.website || '#'}" target="_blank">Website</a>
              `;
              memberList.appendChild(section);
          }
      });
    }

    // Toggle between grid and list views
    document.getElementById('grid').addEventListener('click', function() {
      memberList.className = 'grid';
      // Additional styling for grid can be added in CSS
    });

    document.getElementById('list').addEventListener('click', function() {
      memberList.className = 'list';
      // Additional styling for list can be added in CSS
    });
});
