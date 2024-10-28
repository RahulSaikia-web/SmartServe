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
  const filterOptions = document.getElementById('filterOptions');
  const nestedFilterPrice = document.getElementById('nestedFilterPrice');
  const nestedFilterAvailability = document.getElementById('nestedFilterAvailability');
  const nestedFilterRating = document.getElementById('nestedFilterRating');

  // Function to display entries
  function displayEntries(entries) {
      container.innerHTML = ''; // Clear existing content

      entries.forEach(formData => {
          const dataDiv = document.createElement('div');
          dataDiv.classList.add('data-entry');

          dataDiv.innerHTML = `
              <img src="${formData.picture}" alt="Uploaded Image">
              <div class="data-info">
                  <h1>${formData.service} <br></h1>
                  <h4>by ${formData.username}</h4>
                  <h3>₹ ${formData.price}</h3>
                  <p><strong>Address:</strong> ${formData.address}</p>
                  <p><strong>Contact No:</strong> ${formData.contact}</p>
                  <p><strong>Ratings:</strong> ${formData.ratings} Stars</p>
                  <p><strong>Availability:</strong> ${formData.availability}</p>
                  <p><strong>Description:</strong> ${formData.desc}</p>
              </div>
          `;

          container.appendChild(dataDiv);
      });
  }

  // Function to filter entries based on search and selected filters
  function filterEntries() {
      const keyword = searchInput.value.trim().toLowerCase();
      const selectedFilter = filterOptions.value;
      const priceOption = nestedFilterPrice.value;
      const availabilityOption = nestedFilterAvailability.value;
      const ratingOption = nestedFilterRating.value;

      let filteredEntries = formDataArray;

      // Filter by search keyword
      filteredEntries = filteredEntries.filter(entry => {
          const service = entry.service.toLowerCase();
          const username = entry.username.toLowerCase();
          const address = entry.address.toLowerCase();

          return (
              service.includes(keyword) ||
              username.includes(keyword) ||
              address.includes(keyword
          ));
      });

      // Apply additional filters
      if (selectedFilter === 'price' && priceOption) {
          if (priceOption === 'lowToHighPrice') {
              filteredEntries.sort((a, b) => a.price - b.price);
          } else if (priceOption === 'highToLowPrice') {
              filteredEntries.sort((a, b) => b.price - a.price);
          }
      }

      if (selectedFilter === 'availability' && availabilityOption) {
          filteredEntries = filteredEntries.filter(entry => entry.availability === availabilityOption);
      }

      if (selectedFilter === 'rating' && ratingOption) {
          if (ratingOption === 'lowToHighRating') {
              filteredEntries.sort((a, b) => a.ratings - b.ratings);
          } else if (ratingOption === 'highToLowRating') {
              filteredEntries.sort((a, b) => b.ratings - a.ratings);
          }
      }

      displayEntries(filteredEntries); // Display filtered entries
  }

  // Initial display of all entries
  displayEntries(formDataArray);

  // Search functionality
  searchInput.addEventListener('input', filterEntries);
  
  // Dropdown filter logic
  filterOptions.addEventListener('change', function() {
      // Hide all nested filters initially
      const nestedFilters = document.querySelectorAll('.nested-filter');
      nestedFilters.forEach(filter => filter.classList.add('hidden'));

      // Show the relevant nested filter based on the selected option
      if (this.value === 'price') {
          nestedFilterPrice.classList.remove('hidden');
      } else if (this.value === 'availability') {
          nestedFilterAvailability.classList.remove('hidden');
      } else if (this.value === 'rating') {
          nestedFilterRating.classList.remove('hidden');
      }

      // Call filterEntries when the filter is changed
      filterEntries();
  });

  // Nested filter options change events
  nestedFilterPrice.addEventListener('change', filterEntries);
  nestedFilterAvailability.addEventListener('change', filterEntries);
  nestedFilterRating.addEventListener('change', filterEntries);
});

