document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = form.elements['email'].value.trim();
        const password = form.elements['password'].value;

        const result = AUTH.login(email, password);
        if (result.ok) {
            window.location.href = 'index.html';
        } else {
            alert(result.msg);
        }
    });
});
