function accordionTeam() {
  const workers = document.querySelectorAll('.worker');
  const teamAccord = document.querySelector('.team__accordion');

  teamAccord.addEventListener('click', e => {
    e.preventDefault();
    workTeam(e); 
  })

  function workTeam(e) {
    const target = e.target;
    const item = target.parentNode;
    const content = target.nextElementSibling;
    const contentHeight = content.firstElementChild.clientHeight;

    if (target.classList.contains('worker__name-link')) {   

      for (let i of workers) {
        if (i != item) {
          i.classList.remove('is-active');
          i.lastElementChild.style.height = 0;
        }
      }
  
      if (!item.classList.contains('is-active')) {
        item.classList.add('is-active');
        content.style.height = contentHeight + 'px';
      } else {
        item.classList.remove('is-active');
        content.style.height = 0;
      }
    }
  }
}

export default accordionTeam;