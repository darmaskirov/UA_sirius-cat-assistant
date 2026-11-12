(() => {
    const slider = document.getElementById('scaleSlider');
    const cat = document.getElementById('cat-container');
    const update = () => { cat.style.transform = 'scale(' + slider.value + ')'; };
    slider.addEventListener('input', update);
    update();
})();
