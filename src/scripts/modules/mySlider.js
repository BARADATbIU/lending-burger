function mySlider() {
    
  const next = document.querySelector('.scroll-btn--next');
  const prev = document.querySelector('.scroll-btn--prev');
  const list = document.querySelector('.slider__list');
  const items = list.querySelectorAll('.slider__item');

  next.addEventListener('click', moveNext);
  prev.addEventListener('click', movePrev);

  let num = 2;
  
  function moveNext() {

    num++;
    if (num > items.length) num = 1;

    setOrder();
    list.classList.remove('is-reverse');
    moveItem();
  }

  function movePrev() {

    num--;
    if (num === 0) num = items.length;
    
    setOrder();
    list.classList.add('is-reverse');
    moveItem();    
  }

  function setOrder() {
    let key = num;

    for (let i of items) {
      i.style.order = key;
      key++;
      if (key > items.length) key = 1;
    }
  }

  function moveItem() {
    list.classList.remove('is-move');

    setTimeout(() => {
      list.classList.add('is-move');
    }, 50);    
  }
}

export default mySlider;