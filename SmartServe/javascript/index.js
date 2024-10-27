let list = document.getElementById("list");
let filter = document.querySelector(".filter");
let serviceProvider = [
  {
    id: 1,
    title: "Rahul Saikia",
    role: "Plumber",
    rating: 2,
    availability: "yes",
    area: "d",
    image: "../img/1.jpg",
  },
  {
    id: 2,
    title: "Ankur Basumatary",
    role: "Plumber",
    rating: 3,
    availability: "yes",
    area: "d",
    image: "../img/2.jpg",
  },
  {
    id: 3,
    title: "Ankur Basumatary",
    role: "Plumber",
    rating: 4,
    availability: "yes",
    area: "d",
    image: "../img/3.jpg",
  },
];
filter.addEventListener("click", function (event)  {
    event.preventDefault();
    // let valueFilter = event.target.elements;
    SearchFilter = serviceProvider.filter((card) => {
      if (card.rating.valueOf != '') {
        if (card.rating != card.rating.valueOf) {
          return false;
        }
      }
      if (card.area.valueOf != "") {
          if (card.area != card.area.valueOf) {
            return false;
          }
        }
        return true
    })
    ShowService(SearchFilter)
  })

let SearchFilter = serviceProvider;
ShowService(SearchFilter);
function ShowService(serviceProvider) {
  serviceProvider.forEach((card) => {
    let newCard = document.createElement("div");
    newCard.classList.add("card");

    let newImage = new Image();
    newImage.src = card.image;
    newImage.style.height = "200px";
    newImage.style.width = "200px";

    newCard.appendChild(newImage);

    let newTitle = document.createElement("div");
    newTitle.classList.add("title");
    newTitle.innerText = card.title;
    newCard.appendChild(newTitle);

    let newRole = document.createElement("div");
    newRole.classList.add("role");
    newRole.innerText = card.role;
    newCard.appendChild(newRole);

    let newRating = document.createElement("div");
    newRating.classList.add("rating");
    newRating.innerText = card.rating;
    newCard.appendChild(newRating);

    list.appendChild(newCard);
  });
}

