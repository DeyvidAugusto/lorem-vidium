const SERIE_URL = `${BASE_URL}/tv`;
const list = document.querySelector('div.search-movie-list');
const listCast = document.querySelector('div.search-cast-list');
const serieId = localStorage.getItem('selectedSerieId');

getSerieDetails(serieId);
getSerieCredits(serieId);

function getSerieDetails(id) {
    fetch(`${SERIE_URL}/${id}?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => showSerieDetail(data));
}

function showSerieDetail(serie) {
    list.innerHTML = '';
    const serieEl = document.createElement('div');
    serieEl.classList.add('movie-detail');
    serieEl.innerHTML = `
        <img class="movie-detail-img" src="${IMG_URL}${serie.poster_path}" alt="${serie.name}"/>
        <h2 class="movie-detail-title">${serie.name}</h2>
        <div class="detail-actions">
            <button class="fav-btn" id="fav-btn"></button>
        </div>
        <p class="movie-detail-overview">${serie.overview}</p>
    `;
    list.appendChild(serieEl);

    /* ── Botão de favoritos ─── */
    const favBtn = document.getElementById('fav-btn');
    const currentUser = AUTH.getCurrentUser();

    if (!currentUser) {
        favBtn.textContent = '♡ Favoritar';
        favBtn.disabled = true;
        favBtn.title = 'Faça login para favoritar';
    } else {
        updateFavBtn(favBtn, serie.id, 'serie');
        favBtn.addEventListener('click', () => {
            if (AUTH.isFavorite(serie.id, 'serie')) {
                AUTH.removeFavorite(serie.id, 'serie');
            } else {
                AUTH.addFavorite({ id: serie.id, title: serie.name, poster_path: serie.poster_path, type: 'serie' });
            }
            updateFavBtn(favBtn, serie.id, 'serie');
        });
    }
}

function updateFavBtn(btn, id, type) {
    const isFav = AUTH.isFavorite(id, type);
    btn.textContent = isFav ? '♥ Favoritado' : '♡ Favoritar';
    btn.classList.toggle('favorited', isFav);
}

function getSerieCredits(id) {
    fetch(`${SERIE_URL}/${id}/credits?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => showSerieCredits(data));
}

function showSerieCredits(credits) {
    listCast.innerHTML = '';
    credits.cast.forEach(castMember => {
        if (castMember.known_for_department === 'Acting') {
            const castEl = document.createElement('div');
            castEl.classList.add('movie-detail-cast');
            const imageUrl = castMember.profile_path
                ? `${IMG_URL}${castMember.profile_path}`
                : 'assets/img/Placeholder.jpg';
            castEl.innerHTML = `
                <img class="movie-cast-img" src="${imageUrl}" alt="${castMember.name}"/>
                <h2 class="movie-cast-name">${castMember.name}</h2>
            `;
            listCast.appendChild(castEl);
        }
    });
}
