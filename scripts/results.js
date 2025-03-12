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

const apiKey = "201bb061";

function getPesquisa() {
return localStorage.getItem('pesquisa');
}

function carregaLista(json) {
const lista = document.querySelector('div.search-movie-list');
lista.innerHTML = "";
json.Search.forEach((element) => {
console.log(element);

let item = document.createElement('div');
item.classList.add('search-movie-list-item');

item.innerHTML = `<img class="serch-movie-list-item-img" src="${element.Poster}" alt=""/> <span class="search-movie-list-item-title">${element.Title}</span> <button class="search-movie-list-item-button">Assistir</button>`;

lista.appendChild(item);
});
};

document.addEventListener('DOMContentLoaded', () => {
const pesquisa = getPesquisa();
if (pesquisa) {
fetch(`http://www.omdbapi.com/?s=${pesquisa}&apikey=${apiKey}`)
.then(result => result.json())
.then(json => carregaLista(json));
}
});