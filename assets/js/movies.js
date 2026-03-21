const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const list = document.querySelector('div.search-movie-list');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const current = document.getElementById('current');

let currentPage = 1;
let nextPage = 2;
let prevPage = 0;
let lastUrl = '';
let totalPages = 100;

const selectedGenre = [];

getMovies(API_URL);

function getMovies(url) {
    lastUrl = url;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.results.length !== 0) {
                showMovies(data.results);
                currentPage = data.page;
                nextPage = currentPage + 1;
                prevPage = currentPage - 1;
                totalPages = data.total_pages;
                current.innerHTML = currentPage;

                prev.classList.toggle('disable', currentPage <= 1);
                next.classList.toggle('disable', currentPage >= totalPages);
            } else {
                list.innerHTML = "<h1 class='no-results'>No Results Found</h1>";
            }
        });
}

function showMovies(data) {
    list.innerHTML = '';
    data.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('search-movie-list-item');
        movieEl.innerHTML = `
            <img class="serch-movie-list-item-img" src="${IMG_URL}${movie.poster_path}" alt="${movie.title}"/>
            <span class="search-movie-list-item-title">${movie.title}</span>
            <span class="hidden-id">${movie.id}</span>
            <button class="search-movie-list-item-button">Watch</button>
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

const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
];

const tagEl = document.getElementById('tags');
setGenre();

function setGenre() {
    tagEl.innerHTML = '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            const idx = selectedGenre.indexOf(genre.id);
            if (idx === -1) {
                selectedGenre.push(genre.id);
            } else {
                selectedGenre.splice(idx, 1);
            }
            fetch(`${API_URL}&with_genres=${encodeURI(selectedGenre.join(','))}`)
                .then(res => res.json())
                .then(data => showMovies(data.results));
            highlightSelection();
        });
        tagEl.appendChild(t);
    });
}

function highlightSelection() {
    document.querySelectorAll('.tag').forEach(tag => tag.classList.remove('highlight'));
    selectedGenre.forEach(id => document.getElementById(id).classList.add('highlight'));
}

prev.addEventListener('click', () => {
    if (prevPage > 0) pageCall(prevPage);
});

next.addEventListener('click', () => {
    if (nextPage <= totalPages) pageCall(nextPage);
});

function pageCall(page) {
    const urlSplit = lastUrl.split('?');
    const queryParams = urlSplit[1].split('&');
    const key = queryParams[queryParams.length - 1].split('=');
    if (key[0] !== 'page') {
        getMovies(lastUrl + '&page=' + page);
    } else {
        key[1] = page.toString();
        queryParams[queryParams.length - 1] = key.join('=');
        getMovies(urlSplit[0] + '?' + queryParams.join('&'));
    }
}
