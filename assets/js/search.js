const frmPesquisa = document.querySelector('form');
frmPesquisa.onsubmit = (ev) => {
    ev.preventDefault();
    const query = ev.target.pesquisa.value;
    if (!query) {
        alert('Preencha o campo de pesquisa!');
        return;
    }
    localStorage.setItem('pesquisa', query);
    window.location.href = 'results.html';
};
