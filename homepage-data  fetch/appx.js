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

document.addEventListener('DOMContentLoaded', function() {
  const formDataArray = JSON.parse(localStorage.getItem('serviceFormData')) || [];
  const container = document.getElementById('dataContainer');
  const searchInput = document.getElementById('searchInput');

  // Function to display entries
  function displayEntries() {
      container.innerHTML = ''; // Clear existing content

      formDataArray.forEach(formData => {
          const dataDiv = document.createElement('div');
          dataDiv.classList.add('data-entry');

          dataDiv.innerHTML = `
              <img src="${formData.picture}" alt="Uploaded Image">
              <div class="data-info">
                  <h1>${formData.service} <br></h1> <h4>by ${formData.username}</h4>
                  <h3>₹ ${formData.price}</h3>
                  <p><strong>Address:</strong> ${formData.address}</p>
                  <p><strong>Contact No:</strong> ${formData.contact}</p>
                  <p><strong>Description:</strong> ${formData.desc}</p>
              </div>
          `;

          container.appendChild(dataDiv);
      });
  }

  // Initial display of all entries
  displayEntries();

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
});

