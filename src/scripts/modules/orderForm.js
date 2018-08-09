import renderPopup from './renderPopup';

function orderForm() {
  const form = document.querySelector('#order-form');

  form.addEventListener('submit', getResponse);

  function getResponse(e) {
    e.preventDefault();

    const url = form.getAttribute('action');
    const type = form.getAttribute('method');
    const formData = new FormData(form);
    const sadSmile = '┌∩┐(◕_◕)┌∩┐';
    const hapSmile = '(｡◕‿◕｡)';

    fetch(url, {method: type, body: formData})
      .then(checkStatus)
      .then(response => response.json())
      .then(data => {
        renderPopup(data.name, data.mes);
      })
      .catch(error => {
        renderPopup(sadSmile, error);
      });
  }

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
}

export default orderForm;

