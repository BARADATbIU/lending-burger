import renderPopup from './renderPopup';

function orderForm() {
  const form = document.querySelector('#order-form');

  form.addEventListener('submit', getResponse);

  function getResponse(e) {
    e.preventDefault();

    const url = form.getAttribute('action');
    const type = form.getAttribute('method');
    const myHeaders = new Headers({
      'X-Requested-With': XMLHttpRequest
    });

    const formData = {
      name: form.name.value,
      phone: form.phone.value,
      comment: form.comment.value,
      to: 'fuckYeah@send.ru'
    };

    const sadSmile = '┌∩┐(◕_◕)┌∩┐';
    const hapSmile = '(｡◕‿◕｡)';

    fetch(url, { method: type, body: formData, headers: myHeaders })
      .then(checkStatus)
      .then(response => response.json())
      .then(data => {
        renderPopup(hapSmile, data.message);
      })
      .catch(error => {
        renderPopup(sadSmile, error);
      });
  }

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}

export default orderForm;
