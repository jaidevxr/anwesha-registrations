document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    var formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      college: document.getElementById('college').value,
      events: Array.from(document.querySelectorAll('input[name="events"]:checked')).map(function(checkbox) {
        return checkbox.value;
      }),
      query: document.getElementById('query').value
    };
  
    // Convert the data to a query string
    var formBody = Object.keys(formData).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(formData[key]))).join('&');
  
    fetch('https://script.google.com/macros/s/AKfycbwslK5yFAbRjnJYDx0Wwgh-8hsdjaTvl7vJY9qCKasmzQFUQEMMIEXHXeCaVCV5I37E/exec', {
      method: 'POST',
      mode: 'no-cors', // This line is important for CORS
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody
    })
    .then(function(response) {
      // Since we're using no-cors, we can't access the response body
      // So we'll just assume it's successful if we get here
      window.location.href = 'success.html';
    })
    .catch(function(error) {
      console.error('Error:', error);
      alert('Error submitting the form. Please try again later.');
    });
  });