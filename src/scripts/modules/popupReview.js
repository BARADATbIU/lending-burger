import renderPopup from './renderPopup';

function popupReview() {
  const reviews = document.querySelector('.reviews__list');

  reviews.addEventListener('click', function (e) { 
    if (e.target.classList.contains('btn--review')) {
      const that = this;
      const head = that.querySelector('.review__head').textContent;    
      const text = that.querySelector('.review__text').textContent;

      renderPopup(head, text);
     } 
  })
}

export default popupReview;