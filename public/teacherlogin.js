document.getElementById('teacherLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = event.target.email.value;
    const password = event.target.password.value;
    
    fetch('/teacherlogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (response.status === 200) {
            window.location.href = 'teacherscreen.html'; // Redirect to teacher's dashboard
        } else {
            alert('Invalid email or password');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
