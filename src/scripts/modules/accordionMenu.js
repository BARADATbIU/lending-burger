function accordionMenu() {
  const menuItems = document.querySelectorAll('.menu__item');
  const menuAccord = document.querySelector('.menu__accordion');

  menuAccord.addEventListener('click', e => { 
    e.preventDefault();
    workMenu(e);
  });
  
  function workMenu(e) {
    let target = e.target.parentNode;
    let content = target.nextElementSibling;
    let item = target.parentNode;
    let tarWidth = target.clientWidth;
    const curWidth = document.documentElement.clientWidth;

    if (e.target.classList.contains('menu__title')) {
      moveMenu();
    }

    target = e.target;
    content = target.nextElementSibling;
    item = target.parentNode;
    tarWidth = target.clientWidth;

    if (target.classList.contains('menu__link')) {   
      moveMenu();    
    }

    function moveMenu() {
      for (let i of menuItems) {
        if (i != item) {
          i.classList.remove('is-active');
          i.lastElementChild.style.width = 0;
        }
      }

      if (!item.classList.contains('is-active')) {
        
        item.classList.add('is-active');

        let num;

        for (let i = 0; i < menuItems.length; i++) {
          if (menuItems[i] == item) {
            num = (menuItems.length - 1) - i; 
          }
        }

        if (curWidth > 480 && curWidth < 720) {
          content.style.width = curWidth - tarWidth * menuItems.length + 'px';     
        } else if (curWidth <= 480) {
          e.currentTarget.style.transform = `translateX(${tarWidth * num}px)`;
          content.style.width = curWidth - tarWidth + 'px';
          
        } else {
          content.style.width = 520 + 'px';
        }
      } else {
        item.classList.remove('is-active');
        content.style.width = 0;
        e.currentTarget.style.transform = `translateX(0)`;
      }
    }
  }
}

export default accordionMenu;