const stars = document.querySelectorAll('.star');
const ratingValueDisplay = document.getElementById('rating-value');
let rating = 0;

stars.forEach(star => {
    star.addEventListener('mouseover', () => {
        resetStars();
        highlightStars(star.dataset.value);
    });

    star.addEventListener('click', () => {
        rating = star.dataset.value;
        ratingValueDisplay.textContent = `Rating: ${rating}`;
    });

    star.addEventListener('mouseout', () => {
        resetStars();
        highlightStars(rating);
    });
});

function highlightStars(rating) {
    stars.forEach(star => {
        if (star.dataset.value <= rating) {
            star.classList.add('selected');
        }
    });
}

function resetStars() {
    stars.forEach(star => star.classList.remove('selected'));
}
