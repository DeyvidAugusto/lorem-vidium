const AUTH = {
    /* ── Usuários ─────────────────────────────── */
    getUsers() {
        return JSON.parse(localStorage.getItem('lv_users') || '[]');
    },
    saveUsers(users) {
        localStorage.setItem('lv_users', JSON.stringify(users));
    },
    register(username, email, password) {
        const users = this.getUsers();
        if (users.find(u => u.email === email)) return { ok: false, msg: 'Este e-mail já está cadastrado.' };
        users.push({ username, email, password });
        this.saveUsers(users);
        return { ok: true };
    },
    login(email, password) {
        const user = this.getUsers().find(u => u.email === email && u.password === password);
        if (!user) return { ok: false, msg: 'E-mail ou senha incorretos.' };
        localStorage.setItem('lv_session', JSON.stringify({ username: user.username, email: user.email }));
        return { ok: true };
    },
    logout() {
        localStorage.removeItem('lv_session');
        window.location.href = 'homepage.html';
    },

    /* ── Sessão ───────────────────────────────── */
    getCurrentUser() {
        const s = localStorage.getItem('lv_session');
        return s ? JSON.parse(s) : null;
    },

    /* ── Favoritos ────────────────────────────── */
    getFavorites() {
        const user = this.getCurrentUser();
        if (!user) return [];
        return JSON.parse(localStorage.getItem(`lv_favs_${user.email}`) || '[]');
    },
    saveFavorites(favs) {
        const user = this.getCurrentUser();
        if (!user) return;
        localStorage.setItem(`lv_favs_${user.email}`, JSON.stringify(favs));
    },
    addFavorite(item) {
        const favs = this.getFavorites();
        if (!this.isFavorite(item.id, item.type)) {
            favs.push(item);
            this.saveFavorites(favs);
        }
    },
    removeFavorite(id, type) {
        this.saveFavorites(this.getFavorites().filter(f => !(f.id === id && f.type === type)));
    },
    isFavorite(id, type) {
        return this.getFavorites().some(f => f.id === id && f.type === type);
    }
};
