function accordionMenu() {
  const menuItems = document.querySelectorAll('.menu__item');
  const menuAccord = document.querySelector('.menu__accordion');

  menuAccord.addEventListener('click', event => {
    let target = event.target.parentNode;
    let content = target.nextElementSibling;
    let item = target.parentNode;

    const tarWidth = target.clientWidth;
    const windowWidth = document.documentElement.clientWidth;
    const layoutContentWidth = 520;
    const breakpointPhone = 480;
    const closeMenuWidth = tarWidth * menuItems.length;
    const openMenuWidth = closeMenuWidth + layoutContentWidth;

    if (event.target.classList.contains('menu__title')) {
      moveMenu();
    }

    target = event.target;
    content = target.nextElementSibling;
    item = target.parentNode;

    if (target.classList.contains('menu__link')) {
      moveMenu();
    }

    function moveMenu() {
      for (const iterator of menuItems) {
        if (iterator != item) {
          iterator.classList.remove('is-active');
          iterator.lastElementChild.style.width = 0;
          menuAccord.style.transform = `translateX(0)`;
        }
      }

      if (item.classList.contains('is-active')) {
        item.classList.remove('is-active');
        content.style.width = 0;
      } else {
        item.classList.add('is-active');

        if (windowWidth > breakpointPhone && windowWidth < openMenuWidth) {
          content.style.width = windowWidth - closeMenuWidth + 'px';
        } else if (windowWidth <= breakpointPhone) {
          let num;

          for (let i = 0; i < menuItems.length; i++) {
            if (menuItems[i] === item) {
              num = menuItems.length - (i + 1);
            }
          }

          menuAccord.style.transform = `translateX(${tarWidth * num}px)`;
          content.style.width = windowWidth - tarWidth + 'px';
        } else {
          content.style.width = 520 + 'px';
        }
      }
    }
  });
}

export default accordionMenu;
