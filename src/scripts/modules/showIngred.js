function showIngred() {
  const ingredBadge = document.querySelectorAll('.burger__badge--ingred');
  const burgerDrop = document.querySelectorAll('.burger__dropdown');
  const ingredClose = document.querySelectorAll('.modal__close--ingred');

  for (const i of ingredBadge) {
    i.addEventListener('mouseenter', remHidden);
    i.addEventListener('mouseleave', addHidden)
  }

  for (const i of ingredClose) {
    i.addEventListener('touchstart', addHidden);
  }

  function addHidden() {
    for (const i of burgerDrop) {
      i.classList.add('visually-hidden');
    }
  }

  function remHidden() {
    for (const i of burgerDrop) {
      i.classList.remove('visually-hidden');
    }
  }
}

export default showIngred;