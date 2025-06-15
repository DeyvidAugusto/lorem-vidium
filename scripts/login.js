document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = form.elements['email'].value;
        const password = form.elements['password'].value;

        fetch(`http://localhost:3000/users?email=${email}&password=${password}`)
            .then(response => response.json())
            .then(users => {
                if (users.length > 0) {
                    alert('Login successful!');
                    // Redirecionar para a página inicial
                    window.location.href = 'index.html';
                } else {
                    alert('Invalid email or password!');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
