document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registration-form');

    registrationForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(registrationForm);
        const data = Object.fromEntries(formData.entries());
        data.events = formData.getAll('events');

        // Ensure at least one event is selected
        if (data.events.length === 0) {
            alert('Please select at least one event.');
            return;
        }

        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbyYuYBuYzVsVX1Tr2pzHm07wCQAdB8ylxzNlhtvfLCceW6Bg6SPx58M4S8ukLl2RZQ5/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                window.location.href = 'success.html';
            } else {
                alert('Error submitting form. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting form. Please try again.');
        }
    });
});
