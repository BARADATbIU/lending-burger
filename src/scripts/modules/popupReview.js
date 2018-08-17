import renderPopup from './renderPopup';

function popupReview() {
  const reviews = document.querySelector('.reviews__list');

  reviews.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn--review')) {
      const head = e.target.parentNode.firstElementChild.textContent;
      const text =
        e.target.previousElementSibling.firstElementChild.textContent;

      renderPopup(head, text);
    }
  });
}

export default popupReview;
