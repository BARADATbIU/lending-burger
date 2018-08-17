function renderPopup(head, text) {
  const template = document
    .querySelector('#overlay')
    .content.querySelector('.popup__open');

  const modal = template.cloneNode(true);
  const popupClose = modal.querySelector('#popup-close');

  modal.querySelector('.popup__head').textContent = head;
  modal.querySelector('.popup__text > p').textContent = text;

  document.body.appendChild(modal);

  popupClose.addEventListener('click', e => {
    e.preventDefault();
    document.body.removeChild(modal);
  });
}

export default renderPopup;
