document.getElementById('registration-form').addEventListener('submit', function(e) {
  e.preventDefault();

  var name = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();
  var phone = document.getElementById('phone').value.trim();
  var college = document.getElementById('college').value.trim();
  var events = Array.from(document.querySelectorAll('input[name="events"]:checked'));

  // Check if any required field is empty or no event is selected
  if (name === "" || email === "" || phone === "" || college === "" || events.length === 0) {
      alert("Please fill in all the required fields and select at least one event.");
      return;  // Prevent submission if validation fails
  }

  var formData = {
    name: name,
    email: email,
    phone: phone,
    college: college,
    events: events.map(function(checkbox) {
      return checkbox.value;
    }),
    query: document.getElementById('query').value
  };
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
    window.location.href = 'success.html';
  })
  .catch(function(error) {
    console.error('Error:', error);
    alert('Error submitting the form. Redirecting to Google Docs form for manual submission.');
    window.location.href = 'https://github.com/iamharshit188/';
  });
});
