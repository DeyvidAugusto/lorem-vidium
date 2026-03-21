const API_KEY = "0a5670fe15bf27ff26d20f707806c967";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const list = document.querySelector('div.search-movie-list');
const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query="`;

function getPesquisa() {
    return localStorage.getItem('pesquisa');
}

getMovies(SEARCH_URL + getPesquisa());
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results);
    })
}

function showMovies(data) {
    list.innerHTML = "";

    data.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('search-movie-list-item');
        movieEl.innerHTML = `
        <img class="serch-movie-list-item-img" src="${IMG_URL}${movie.poster_path}" alt="${movie.title}"/> 
        
        <span class="search-movie-list-item-title">
        ${movie.title}
        </span> 
        <button class="search-movie-list-item-button">
        Watch
        </button>
        <span class="hidden-id">
        ${movie.id}</span>`

        list.appendChild(movieEl);
    })
};


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

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('search-movie-list-item-button')) {
      const movieId = e.target.parentElement.querySelector('.hidden-id').textContent;
      localStorage.setItem('selectedMovieId', movieId);
      window.location.href = 'about.html';
    }
  });

  document.getElementById('nav-ball').addEventListener('click', function (e) {
    e.stopPropagation(); 
    const menu = document.getElementById('nav-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', function(e) {
    const navBall = document.getElementById('nav-ball');
    const menu = document.getElementById('nav-menu');
    if (menu.style.display === 'block' && !navBall.contains(e.target) && !menu.contains(e.target)) {
        menu.style.display = 'none';
    }
});