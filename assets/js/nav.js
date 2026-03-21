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
