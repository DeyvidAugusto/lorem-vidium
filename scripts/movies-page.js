const frmPesquisa = document.querySelector('form');
frmPesquisa.onsubmit = (ev) => {
    ev.preventDefault();
    const pesquisa = ev.target.pesquisa.value;

    if (pesquisa == "") {
        alert("Preencha o campo de pesquisa!");
        return;
    }

    localStorage.setItem('pesquisa', pesquisa);
    window.location.href = 'results.html';
};

const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTU2NzBmZTE1YmYyN2ZmMjZkMjBmNzA3ODA2Yzk2NyIsIm5iZiI6MTc0MTU3ODk5OS45NTIsInN1YiI6IjY3Y2U2MmY3M2MyNTQ0NDg4MmUyZjhkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dHsp_9eBOPLWVI6SvGd2Q2KhY_GDuvhlMOsT-dnFJno'
    }
};

function getPesquisa() {
    return localStorage.getItem('pesquisa');
}

function carregaLista(json) {
    const lista = document.querySelector('div.search-movie-list');
    lista.innerHTML = "";
    json.results.forEach((element) => {
        console.log(element);

        let item = document.createElement('div');
        item.classList.add('search-movie-list-item');

        item.innerHTML = `<img class="serch-movie-list-item-img" src="https://image.tmdb.org/t/p/original${element.poster_path}" alt=""/> <span class="search-movie-list-item-title">${element.title}</span> <button class="search-movie-list-item-button">Assistir</button>`;

        lista.appendChild(item);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const pesquisa = getPesquisa();
    if (pesquisa) {
        fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc', options)
            .then(res => res.json())
            .then(res => carregaLista(res))
    }
});