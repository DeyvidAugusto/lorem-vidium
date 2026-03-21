(function() {
    // ── Avatar dropdown ───────────────────────────────────
    document.getElementById('nav-ball').addEventListener('click', function(e) {
        e.stopPropagation();
        const menu = document.getElementById('nav-menu');
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function(e) {
        const navBall = document.getElementById('nav-ball');
        const menu = document.getElementById('nav-menu');
        if (menu.style.display === 'block' && !navBall.contains(e.target) && !menu.contains(e.target)) {
            menu.style.display = 'none';
        }
    });

    const menu = document.getElementById('nav-menu');
    const user = AUTH.getCurrentUser();

    if (user) {
        const userHeader = document.createElement('div');
        userHeader.className = 'menu-user-header';
        userHeader.textContent = user.username;
        menu.insertBefore(userHeader, menu.firstChild);
    }

    const logoutLink = menu.querySelector('a[href="homepage.html"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            AUTH.logout();
        });
    }

    // ── Mobile hamburger + drawer ─────────────────────────
    const toggle = document.getElementById('nav-toggle');
    const drawer = document.getElementById('nav-drawer');

    if (toggle && drawer) {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggle.classList.toggle('open');
            drawer.classList.toggle('open');
        });

        document.addEventListener('click', function(e) {
            if (drawer.classList.contains('open') &&
                !toggle.contains(e.target) &&
                !drawer.contains(e.target)) {
                toggle.classList.remove('open');
                drawer.classList.remove('open');
            }
        });

        const drawerForm = drawer.querySelector('form');
        if (drawerForm) {
            drawerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const query = this.elements.pesquisa.value.trim();
                if (query) {
                    localStorage.setItem('pesquisa', query);
                    window.location.href = 'results.html';
                }
            });
        }
    }

    // ── Active link highlight ─────────────────────────────
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .nav-drawer-links a').forEach(function(link) {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
})();
