(() => {
    const button = document.getElementById('theme-icon');
    try {
        if (localStorage.getItem('sirius-theme') === 'light') document.body.classList.add('light-mode');
    } catch (_) { /* Local storage may be unavailable. */ }

    function update() {
        const light = document.body.classList.contains('light-mode');
        button.textContent = light ? 'Увімкнути темну тему' : 'Увімкнути світлу тему';
        button.setAttribute('aria-pressed', String(light));
    }
    button.addEventListener('click', () => {
        const light = document.body.classList.toggle('light-mode');
        try { localStorage.setItem('sirius-theme', light ? 'light' : 'dark'); }
        catch (_) { /* Not persistent in private mode. */ }
        update();
    });
    update();
})();
