document.getElementById('studentRegisterForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const Pnumber = document.querySelector('input[name="Pnumber"]').value;
    const password = document.querySelector('input[name="password"]').value;

    fetch('/studentregister', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, Pnumber, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);  // Display the response message
        } else if (data.error) {
            alert('Error: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred: ' + error.message);
    });
});
