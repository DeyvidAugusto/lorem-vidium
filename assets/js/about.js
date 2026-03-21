const MOVIE_URL = `${BASE_URL}/movie`;
const list = document.querySelector('div.search-movie-list');
const listCast = document.querySelector('div.search-cast-list');
const movieId = getMovieId();

getMovieDetails(movieId);
getMovieCredits(movieId);

function getMovieId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || localStorage.getItem('selectedMovieId');
}

function getMovieDetails(id) {
    fetch(`${MOVIE_URL}/${id}?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => showMovieDetail(data));
}

function showMovieDetail(movie) {
    list.innerHTML = '';
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie-detail');
    movieEl.innerHTML = `
        <img class="movie-detail-img" src="${IMG_URL}${movie.poster_path}" alt="${movie.title}"/>
        <h2 class="movie-detail-title">${movie.title}</h2>
        <div class="detail-actions">
            <button class="know-more" id="trailer-btn-${movie.id}">▶ Watch Trailer</button>
            <button class="fav-btn" id="fav-btn"></button>
        </div>
        <p class="movie-detail-overview">${movie.overview}</p>
    `;
    list.appendChild(movieEl);

    document.getElementById(`trailer-btn-${movie.id}`).addEventListener('click', () => openTrailerOverlay(movie));

    /* ── Botão de favoritos ─── */
    const favBtn = document.getElementById('fav-btn');
    const currentUser = AUTH.getCurrentUser();

    if (!currentUser) {
        favBtn.textContent = '♡ Favoritar';
        favBtn.disabled = true;
        favBtn.title = 'Faça login para favoritar';
    } else {
        updateFavBtn(favBtn, movie.id, 'movie');
        favBtn.addEventListener('click', () => {
            if (AUTH.isFavorite(movie.id, 'movie')) {
                AUTH.removeFavorite(movie.id, 'movie');
            } else {
                AUTH.addFavorite({ id: movie.id, title: movie.title, poster_path: movie.poster_path, type: 'movie' });
            }
            updateFavBtn(favBtn, movie.id, 'movie');
        });
    }
}

function updateFavBtn(btn, id, type) {
    const isFav = AUTH.isFavorite(id, type);
    btn.textContent = isFav ? '♥ Favoritado' : '♡ Favoritar';
    btn.classList.toggle('favorited', isFav);
}

const overlayContent = document.getElementById('overlay-content');

function openTrailerOverlay(movie) {
    fetch(`${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(videodata => {
            document.getElementById('myNav').style.width = '100%';
            document.getElementById('myNav').style.display = 'block';

            if (videodata.results.length > 0) {
                const embed = [];
                const dots = [];
                videodata.results.forEach((video, idx) => {
                    if (video.site === 'YouTube') {
                        embed.push(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${video.key}" title="${video.name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`);
                        dots.push(`<span class="dot">${idx + 1}</span>`);
                    }
                });
                overlayContent.innerHTML = `
                    <h1 class="no-results">${movie.original_title}</h1>
                    <br/>
                    ${embed.join('')}
                    <br/>
                    <div class="dots">${dots.join('')}</div>
                `;
                activeSlide = 0;
                showVideos();
            } else {
                overlayContent.innerHTML = '<h1 class="no-results">No trailer available</h1>';
            }
        });
}

function closeNav() {
    document.getElementById('myNav').style.display = 'none';
}

var activeSlide = 0;
var totalVideos = 0;

function showVideos() {
    const embedClasses = document.querySelectorAll('.embed');
    const dots = document.querySelectorAll('.dot');
    totalVideos = embedClasses.length;
    embedClasses.forEach((embedTag, idx) => {
        embedTag.classList.toggle('show', activeSlide === idx);
        embedTag.classList.toggle('hide', activeSlide !== idx);
    });
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', activeSlide === idx);
    });
}

const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

leftArrow.addEventListener('click', () => {
    activeSlide = activeSlide > 0 ? activeSlide - 1 : totalVideos - 1;
    showVideos();
});

rightArrow.addEventListener('click', () => {
    activeSlide = activeSlide < totalVideos - 1 ? activeSlide + 1 : 0;
    showVideos();
});

function getMovieCredits(id) {
    fetch(`${MOVIE_URL}/${id}/credits?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => showMovieCredits(data));
}

function showMovieCredits(movie) {
    listCast.innerHTML = '';
    movie.cast.forEach(castMember => {
        if (castMember.known_for_department === 'Acting') {
            const imageUrl = castMember.profile_path
                ? `${IMG_URL}${castMember.profile_path}`
                : 'assets/img/Placeholder.jpg';
            listCast.appendChild(createCastMember(castMember.name, imageUrl));
        }
    });
}

function createCastMember(name, imageUrl) {
    const castEl = document.createElement('div');
    castEl.classList.add('movie-detail-cast');

    const img = document.createElement('img');
    img.classList.add('movie-cast-img');
    img.src = imageUrl;
    img.alt = name;
    if (imageUrl.includes('Placeholder.jpg')) img.classList.add('placeholder-img');
    img.onerror = function() {
        this.src = 'assets/img/Placeholder.jpg';
        this.classList.add('placeholder-img');
    };

    const nameEl = document.createElement('h2');
    nameEl.classList.add('movie-cast-name');
    nameEl.textContent = name;

    castEl.appendChild(img);
    castEl.appendChild(nameEl);
    return castEl;
}
