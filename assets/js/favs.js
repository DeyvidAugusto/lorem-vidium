const favsList = document.getElementById('favs-list');
const user = AUTH.getCurrentUser();

if (!user) {
    favsList.innerHTML = `
        <div class="empty-state">
            <p>Você precisa estar logado para ver seus favoritos.</p>
            <a href="login.html" class="empty-state-link">Fazer Login</a>
        </div>
    `;
} else {
    renderFavorites();
}

function renderFavorites() {
    const favs = AUTH.getFavorites();
    favsList.innerHTML = '';

    if (favs.length === 0) {
        favsList.innerHTML = `
            <div class="empty-state">
                <p>Sua lista de favoritos está vazia.</p>
                <a href="movies-page.html" class="empty-state-link">Explorar filmes</a>
            </div>
        `;
        return;
    }

    favs.forEach(fav => {
        const item = document.createElement('div');
        item.classList.add('search-movie-list-item');
        item.innerHTML = `
            <img class="serch-movie-list-item-img" src="${IMG_URL}${fav.poster_path}" alt="${fav.title}"/>
            <span class="fav-type-badge">${fav.type === 'movie' ? 'Filme' : 'Série'}</span>
            <span class="search-movie-list-item-title">${fav.title}</span>
            <button class="search-movie-list-item-button watch-btn"
                    data-id="${fav.id}" data-type="${fav.type}">Watch</button>
            <button class="remove-fav-btn"
                    data-id="${fav.id}" data-type="${fav.type}" title="Remover dos favoritos">♥</button>
        `;
        favsList.appendChild(item);
    });
}

favsList.addEventListener('click', function(e) {
    const watchBtn = e.target.closest('.watch-btn');
    const removeBtn = e.target.closest('.remove-fav-btn');

    if (watchBtn) {
        const { id, type } = watchBtn.dataset;
        if (type === 'movie') {
            localStorage.setItem('selectedMovieId', id);
            window.location.href = 'about.html';
        } else {
            localStorage.setItem('selectedSerieId', id);
            window.location.href = 'about-serie.html';
        }
    }

    if (removeBtn) {
        const id = parseInt(removeBtn.dataset.id);
        const type = removeBtn.dataset.type;
        AUTH.removeFavorite(id, type);
        renderFavorites();
    }
});
