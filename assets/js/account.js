const user = AUTH.getCurrentUser();
const container = document.getElementById('account-content');

if (!user) {
    container.innerHTML = `
        <div class="empty-state">
            <p>Você não está logado.</p>
            <a href="login.html" class="empty-state-link">Fazer Login</a>
        </div>
    `;
} else {
    const favs = AUTH.getFavorites();
    container.innerHTML = `
        <div class="account-card">
            <img src="assets/img/Profile-PNG-Photo.png" class="account-avatar" alt="Avatar">
            <h2 class="account-username">${user.username}</h2>
            <p class="account-email">${user.email}</p>
            <div class="account-stats">
                <div class="account-stat">
                    <span class="stat-value">${favs.length}</span>
                    <span class="stat-label">Favoritos</span>
                </div>
            </div>
            <div class="account-actions">
                <a href="favs.html" class="account-btn">Ver Favoritos</a>
                <button class="account-btn account-btn-danger" id="logout-btn">Sair da Conta</button>
            </div>
        </div>
    `;
    document.getElementById('logout-btn').addEventListener('click', () => AUTH.logout());
}
