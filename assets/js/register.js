document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = form.elements['username'].value.trim();
        const email = form.elements['email'].value.trim();
        const password = form.elements['password'].value;
        const confirmPassword = form.elements['confirm-password'].value;

        if (!username || !email || !password) {
            alert('Preencha todos os campos.');
            return;
        }
        if (password !== confirmPassword) {
            alert('As senhas não coincidem.');
            return;
        }

        const result = AUTH.register(username, email, password);
        if (result.ok) {
            alert('Conta criada com sucesso! Faça o login.');
            window.location.href = 'login.html';
        } else {
            alert(result.msg);
        }
    });
});
