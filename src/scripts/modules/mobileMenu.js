function mobileMenu() {
  const navTrigger = document.querySelector(".nav-trigger");
  const trigger = document.querySelector(".nav-trigger__link");
  const navMobile = document.querySelector(".nav-mobile");
  const navItems = navMobile.querySelectorAll(".nav-mobile__item");

  trigger.addEventListener("click", toggleClass);

  for (const iterator of navItems) {
    iterator.addEventListener("click", e => {
      toggleClass(e);
    });
  }
  function toggleClass(e) {
    e.preventDefault();
    navTrigger.classList.toggle("is-active");
    navMobile.classList.toggle("is-active");
  }
}

export default mobileMenu;
