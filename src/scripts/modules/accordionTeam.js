function accordionTeam() {
  const workers = document.querySelectorAll(".worker");
  const teamAccord = document.querySelector(".team__accordion");

  teamAccord.addEventListener("click", event => {
    const target = event.target;
    const worker = target.parentNode;
    const content = target.nextElementSibling;
    const contentHeight = content.firstElementChild.clientHeight;

    if (target.classList.contains("worker__name-link")) {
      for (const iterator of workers) {
        if (iterator !== worker) {
          iterator.classList.remove("is-active");
          iterator.lastElementChild.style.height = 0;
        }
      }

      if (worker.classList.contains("is-active")) {
        worker.classList.remove("is-active");
        content.style.height = 0;
      } else {
        worker.classList.add("is-active");
        content.style.height = contentHeight + "px";
      }
    }
  });
}

export default accordionTeam;
