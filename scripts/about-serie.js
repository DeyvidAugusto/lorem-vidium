function getSerieId() {
    return localStorage.getItem('selectedSerieId');
}

const API_KEY = "0a5670fe15bf27ff26d20f707806c967";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}/discover/tv?sort_by=popularity.desc&api_key=${API_KEY}`;
const MOVIE_URL = `${BASE_URL}/tv`;
const list = document.querySelector('div.search-movie-list');
const listCast = document.querySelector('div.search-cast-list');
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const serieId = getSerieId();

getSerieDetails(serieId);

function getSerieDetails(id) {
    fetch(`${MOVIE_URL}/${id}?api_key=${API_KEY}`).then(res => res.json()).then(data => {
        showSerieDetail(data);
    });
}

function showSerieDetail(movie) {
    list.innerHTML = "";

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie-detail');
    movieEl.innerHTML = `
    <img class="movie-detail-img" src="${IMG_URL}${movie.poster_path}" alt="${movie.title}"/> 

    <h2 class="movie-detail-title">
        ${movie.name}
    </h2>
    <p class="movie-detail-overview">
        ${movie.overview}
    </p>`;

    list.appendChild(movieEl);
}

getMovieCredits(serieId);

function getMovieCredits(id) {
    fetch(`${MOVIE_URL}/${id}/credits?api_key=${API_KEY}`).then(res => res.json()).then(data => {
        showMovieCredits(data);
    });
}

function showMovieCredits(movie) {
    listCast.innerHTML = "";
    movie.cast.forEach(castMember => {
        if(castMember.known_for_department == "Acting") {
            const castEl = document.createElement('div');
            castEl.classList.add('movie-detail-cast');
            castEl.innerHTML = `
            <img class="movie-cast-img" src="${IMG_URL}${castMember.profile_path}" alt="${castMember.name}"/> 

            <h2 class="movie-cast-name">
                ${castMember.name}
            </h2>`;
            listCast.appendChild(castEl);
        }
    });
}
