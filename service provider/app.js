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

// JavaScript to toggle views and active classes
document.getElementById("profilelist").addEventListener("click", function() {
  console.log("Profile clicked");
  
  // Show Profile section and hide Orders section
  document.getElementById("Profile").style.display = "block";
  document.getElementById("Orders").style.display = "none";

  // Set active class on profilelist and remove from orderlist
  document.getElementById("profilelist").classList.add("active");
  document.getElementById("orderlist").classList.remove("active");
});

document.getElementById("orderlist").addEventListener("click", function() {
  console.log("Orders clicked");

  // Show Orders section and hide Profile section
  document.getElementById("Orders").style.display = "block";
  document.getElementById("Profile").style.display = "none";

  // Set active class on orderlist and remove from profilelist
  document.getElementById("orderlist").classList.add("active");
  document.getElementById("profilelist").classList.remove("active");
});

//for profile form
let isEditing = false;
function enableEditing() {
    if (!isEditing) {
        // Show input fields and hide spans
        document.querySelector('.username').style.display = 'block';
        document.querySelector('.email').style.display = 'block';
        document.querySelector('.dob').style.display = 'block';
        document.querySelector('.services').style.display = 'block';
        document.querySelector('.username-span').style.display = 'none';
        document.querySelector('.email-span').style.display = 'none';
        document.querySelector('.dob-span').style.display = 'none';
        document.querySelector('.services-span').style.display = 'none';

        // Fill input fields with current values
        document.querySelector('.username').value = document.querySelector('.username-span').textContent;
        document.getElementById('email').value = document.querySelector('.email-span').textContent;
        document.getElementById('dob').value = document.querySelector('.dob-span').textContent;
        document.getElementById('services').value = document.querySelector('.services-span').textContent;

        // Enable inputs and show file input
        document.querySelector('.username').disabled = false;
        document.getElementById('email').disabled = false;
        document.getElementById('dob').disabled = false;
        document.getElementById('services').disabled = false;
        document.getElementById('file-input').disabled = false;

        // Enable save button
        document.getElementById('save-button').style.opacity = 1;
        document.getElementById('save-button').style.pointerEvents = 'auto';
        isEditing = true;
    }
}

function saveChanges() {
    document.querySelector('.username').disabled = true;
    document.getElementById('email').disabled = true;
    document.getElementById('dob').disabled = true;
    document.getElementById('services').disabled = true;
    document.getElementById('file-input').disabled = true;

    // Hide input fields and update spans
    document.querySelector('.username').style.display = 'none';
    document.querySelector('.email').style.display = 'none';
    document.querySelector('.dob').style.display = 'none';
    document.querySelector('.services').style.display = 'none';
    document.querySelector('.username-span').textContent = document.querySelector('.username').value;
    document.querySelector('.email-span').textContent = document.getElementById('email').value;
    document.querySelector('.dob-span').textContent = document.getElementById('dob').value;
    document.querySelector('.services-span').textContent = document.getElementById('services').value;
    document.querySelector('.username-span').style.display = 'inline';
    document.querySelector('.email-span').style.display = 'inline';
    document.querySelector('.dob-span').style.display = 'inline';
    document.querySelector('.services-span').style.display = 'inline';
    document.getElementById('save-button').style.opacity = 0.5;
    document.getElementById('save-button').style.pointerEvents = 'none';
    isEditing = false;
}

function previewPhoto(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const photoPreview = document.getElementById('photo-preview');
        const deleteButton = document.getElementById('delete-photo');
        photoPreview.src = e.target.result;
        photoPreview.style.display = 'block';
        deleteButton.style.display = 'block'; // Show delete button
    };
    if (file) {
        reader.readAsDataURL(file);
    }
}

function deletePhoto(event) {
    const photoPreview = document.getElementById('photo-preview');
    const deleteButton = document.getElementById('delete-photo');
    document.getElementById('file-input').value = ""; // Clear file input
    photoPreview.src = ""; // Clear preview
    photoPreview.style.display = 'none'; // Hide preview
    deleteButton.style.display = 'none'; // Hide delete button
}