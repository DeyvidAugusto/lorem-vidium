const API_KEY = "0a5670fe15bf27ff26d20f707806c967";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const list = document.querySelector('div.movie-list');
const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query="`;

getMovies(API_URL)
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
          showMovies(data.results);
})
}

function showMovies(data) {
    list.innerHTML = "";

    data.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-list-item');
        movieEl.innerHTML = `
        <img class="movie-list-item-img" src="${IMG_URL}${movie.poster_path}" alt="${movie.title}"/> 

        <span class="movie-list-item-title">
            ${movie.title}
        </span>
        <span class="hidden-id">
            ${movie.id}
        </span>
        <button class="movie-list-item-button">
            Watch
        </button>`

    list.appendChild(movieEl);
    })
}