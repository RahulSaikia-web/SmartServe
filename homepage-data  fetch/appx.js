const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')

function toggleSidebar(){
  sidebar.classList.toggle('close')
  toggleButton.classList.toggle('rotate')

  closeAllSubMenus()
}

function toggleSubMenu(button){

  if(!button.nextElementSibling.classList.contains('show')){
    closeAllSubMenus()
  }

  button.nextElementSibling.classList.toggle('show')
  button.classList.toggle('rotate')

  if(sidebar.classList.contains('close')){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')
  }
}

function closeAllSubMenus(){
  Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show')
    ul.previousElementSibling.classList.remove('rotate')
  })
}


//Fetch information from database ( Start)
let serviceProvider = [];
let toAppend = document.getElementById("dataContainer"); // Make sure this matches your HTML element ID


  // Initial display of all entries
  displayEntries();
function displayEntries() {
  fetch("") // Replace 'YOUR_API_URL_HERE' with your actual API endpoint
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
        serviceProvider = json;

      // Clear previous content (if any)
      toAppend.innerHTML = "";

      // Append provider information
      for (let infos of serviceProvider) {
        toAppend.innerHTML += `
           <img src="${infos.img}" alt="Uploaded Image">
              <div class="data-info">
                  <h1>${infos.service_type} <br></h1> <h4>by ${infos.username}</h4>
                  <h3>₹ ${infos.price}</h3>
                  <p><strong>Address:</strong> ${infos.city}</p>
                  <p><strong>Contact No:</strong> ${infos.contact_phone}</p>
                  <p><strong>Description:</strong> ${infos.bio}</p>
              </div>
        `;
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}


  // Search functionality
  searchInput.addEventListener('input', function() {
      const keyword = searchInput.value.trim().toLowerCase();

      // Get all data entries
      const entries = container.querySelectorAll('.data-entry');

      entries.forEach(entry => {
          const service = entry.querySelector('h1').textContent.toLowerCase();
          const username = entry.querySelector('h4').textContent.toLowerCase();
          const address = entry.querySelector('p').textContent.toLowerCase(); // Get the address from the first <p> tag

          // Check if any field contains the keyword
          if (
              service.includes(keyword) ||
              username.includes(keyword) ||
              address.includes(keyword) // Match keyword in address
          ) {
              entry.classList.remove('hidden'); // Show matching entry
          } else {
              entry.classList.add('hidden'); // Hide non-matching entry
          }
      });
  });

