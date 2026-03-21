const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`;
const list = document.querySelector('div.search-movie-list');

getMovies(SEARCH_URL + localStorage.getItem('pesquisa'));

function getMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => showMovies(data.results));
}

function showMovies(data) {
    list.innerHTML = '';
    data.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('search-movie-list-item');
        movieEl.innerHTML = `
            <img class="serch-movie-list-item-img" src="${IMG_URL}${movie.poster_path}" alt="${movie.title}"/>
            <span class="search-movie-list-item-title">${movie.title}</span>
            <button class="search-movie-list-item-button">Watch</button>
            <span class="hidden-id">${movie.id}</span>
        `;
        list.appendChild(movieEl);
    });
}

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('search-movie-list-item-button')) {
        const movieId = e.target.parentElement.querySelector('.hidden-id').textContent.trim();
        localStorage.setItem('selectedMovieId', movieId);
        window.location.href = 'about.html';
    }
});
