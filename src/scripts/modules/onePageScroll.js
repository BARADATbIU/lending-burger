function onePageScroll() {
  const wrapper = document.querySelector('.wrapper');
  const content = wrapper.querySelector('.main-content');
  const pages = content.querySelectorAll('.page');
  const points = document.querySelectorAll('.nav-points__item');
  const dataScrollto = document.querySelectorAll('[data-scroll-to]');

  let inScroll = false;

  addNavigation();

  wheel();

  keyPush();
  
  if (isMobileDevice()) swipe();
  
  function moveToPage(numPage) {

    const position = `${numPage * (-100)}%`;

    if (inScroll) return;

    inScroll = true;

    addClass(pages);  

    content.style.transform = `translateY(${position})`;

    setTimeout(() => {
      inScroll = false;
      addClass(points);
    }, 1000); //transition + 300(инерция скролла)

    function addClass(obj) {
      obj[numPage].classList.add('is-active');
      for (const item of obj) {
        if (item != obj[numPage])
          item.classList.remove('is-active');
      }
    }      
  }

  function addNavigation() {
    for (const iter of dataScrollto) {
      iter.addEventListener('click', e => {
        e.preventDefault();
        moveToPage(iter.dataset.scrollTo);
      })    
    }
  }

  function wheel() {
    document.addEventListener('wheel', e => {
      const direct = e.deltaY > 0 ? 'up' : 'down';
      
      scrollToPage(direct);
    })
  }

  function keyPush() {
    document.addEventListener('keydown', e => {
      switch (e.keyCode) {
        case 40:
        scrollToPage('up');
          break;
        case 38:
        scrollToPage('down');
          break;
        default:
          break;
      }
    })
  }

  function definePage(obj) {
    for (let i = 0; i < obj.length; i++) {
      let iter = obj[i];
      if (iter.classList.contains('is-active')){
        return {
          iterIndex: i,
          iterActive: iter,
          iterNext: iter.nextElementSibling,
          iterPrev: iter.previousElementSibling
        }
      }   
    }
  }

  function scrollToPage(direct) {
    let page = definePage(pages);
    
    if (direct === 'up' && page.iterNext) {
      let numPage = page.iterIndex + 1;
      
      moveToPage(numPage);
    }

    if (direct === 'down' && page.iterPrev) {
      let numPage = page.iterIndex - 1;
      moveToPage(numPage);
    }
  }

  function swipe() {
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', e => {
      touchStartY = e.changedTouches[0].screenY;      
    }, false);

    wrapper.addEventListener('touchmove', e => e.preventDefault());

    document.addEventListener('touchend', e => {
      touchEndY = e.changedTouches[0].screenY;
      let direct = swipeDirect();
      scrollToPage(direct);
    }, false);

    function swipeDirect() {
      let dif = touchStartY - touchEndY;      
      if (dif > 100) {
        return 'up';
      } else if (dif < - 100) {
        return  'down';
      }
    }
  }

  function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  }
}

export default onePageScroll;