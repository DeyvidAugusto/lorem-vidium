const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const API_URL2 = `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${API_KEY}`;
const list = document.querySelector('div.movie-list');
const list2 = document.querySelector('div.movie-list2');

getMovies(API_URL);
function getMovies(url) {
    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
        })
        .then(data => showMovies(data.results))
        .catch(error => console.error('Error fetching movies:', error));
}

function showMovies(data) {
    list.innerHTML = '';
    data.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-list-item');
        movieEl.innerHTML = `
            <img class="movie-list-item-img" src="${IMG_URL}${movie.poster_path}" alt="${movie.title}"/>
            <span class="movie-list-item-title">${movie.title}</span>
            <span class="hidden-id">${movie.id}</span>
            <button class="movie-list-item-button">Watch</button>
        `;
        list.appendChild(movieEl);
    });
}

getMovies2(API_URL2);
function getMovies2(url) {
    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
        })
        .then(data => showMovies2(data.results))
        .catch(error => console.error('Error fetching movies:', error));
}

function showMovies2(data) {
    list2.innerHTML = '';
    data.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-list-item2');
        movieEl.innerHTML = `
            <img class="movie-list-item-img2" src="${IMG_URL}${movie.poster_path}" alt="${movie.title}"/>
            <span class="movie-list-item-title2">${movie.title}</span>
            <span class="hidden-id2">${movie.id}</span>
            <button class="movie-list-item-button2">Watch</button>
        `;
        list2.appendChild(movieEl);
    });
}

/* Carrossel - Novidades */
const leftArrow = document.querySelectorAll('.l-arrow');
const rightArrow = document.querySelectorAll('.r-arrow');
const movieList = document.querySelectorAll('.movie-list');

rightArrow.forEach((arrow, i) => {
    const listWidth = movieList[i].getBoundingClientRect().width;
    arrow.addEventListener('click', () => {
        movieList[i].scrollTo({ left: movieList[i].scrollLeft + listWidth, behavior: 'smooth' });
    });
});

leftArrow.forEach((arrow, i) => {
    const listWidth = movieList[i].getBoundingClientRect().width;
    arrow.addEventListener('click', () => {
        movieList[i].scrollTo({ left: movieList[i].scrollLeft - listWidth, behavior: 'smooth' });
    });
});

/* Carrossel - Popular */
const leftArrow2 = document.querySelectorAll('.l-arrow2');
const rightArrow2 = document.querySelectorAll('.r-arrow2');
const movieList2 = document.querySelectorAll('.movie-list2');

rightArrow2.forEach((arrow, i) => {
    const listWidth = movieList2[i].getBoundingClientRect().width;
    arrow.addEventListener('click', () => {
        movieList2[i].scrollTo({ left: movieList2[i].scrollLeft + listWidth, behavior: 'smooth' });
    });
});

leftArrow2.forEach((arrow, i) => {
    const listWidth = movieList2[i].getBoundingClientRect().width;
    arrow.addEventListener('click', () => {
        movieList2[i].scrollTo({ left: movieList2[i].scrollLeft - listWidth, behavior: 'smooth' });
    });
});

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('movie-list-item-button')) {
        const movieId = e.target.parentElement.querySelector('.hidden-id').textContent.trim();
        localStorage.setItem('selectedMovieId', movieId);
        window.location.href = 'about.html';
    }
});

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('movie-list-item-button2')) {
        const movieId = e.target.parentElement.querySelector('.hidden-id2').textContent.trim();
        localStorage.setItem('selectedMovieId', movieId);
        window.location.href = 'about.html';
    }
});
