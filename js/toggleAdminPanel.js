(() => {
    const panel = document.getElementById('admin-panel');
    const button = document.getElementById('closeAdm');
    if (!panel || !button) return;
    button.addEventListener('click', () => {
        panel.hidden = !panel.hidden;
        button.setAttribute('aria-expanded', String(!panel.hidden));
        button.textContent = panel.hidden ? 'Показати панель' : 'ADM';
    });
})();
