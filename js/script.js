// SiriusCat interactions: one small public API.
(() => {
    const container = document.getElementById('cat-container');
    const cat = container.querySelector('.cat');
    const bubble = container.querySelector('.speech-bubble');
    const paw = document.getElementById('paw');
    const pupils = container.querySelectorAll('.pupil');
    const timers = {};

    function schedule(name, callback, duration) {
        clearTimeout(timers[name]);
        timers[name] = setTimeout(callback, duration);
    }
    function say(message = 'Мяу!', duration = 3500) {
        bubble.textContent = message;
        bubble.style.display = 'block';
        schedule('speech', () => { bubble.style.display = 'none'; }, duration);
    }
    function interact() {
        container.classList.add('active');
        say('Мяу!');
        schedule('active', () => container.classList.remove('active'), 1800);
    }
    function wave() {
        paw.style.display = 'block';
        paw.classList.remove('wave-once');
        void paw.offsetWidth;
        paw.classList.add('wave-once');
        schedule('paw', () => {
            paw.style.display = 'none';
            paw.classList.remove('wave-once');
        }, 2200);
    }
    function talk() {
        container.classList.add('talking');
        cat.classList.add('talking');
        say('Мяу! Я тебе слухаю.', 3000);
        schedule('talking', () => {
            container.classList.remove('talking');
            cat.classList.remove('talking');
        }, 3000);
    }
    function animate() {
        cat.classList.remove('second-animation');
        void cat.offsetWidth;
        cat.classList.add('second-animation');
        schedule('animation', () => cat.classList.remove('second-animation'), 2000);
    }
    container.addEventListener('click', interact);
    container.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            interact();
        }
    });
    document.getElementById('talk-button').addEventListener('click', talk);
    document.getElementById('animation-button').addEventListener('click', animate);
    document.getElementById('showPawButton').addEventListener('click', wave);

    document.addEventListener('pointermove', (event) => {
        if (event.pointerType === 'touch') return;
        const rect = container.getBoundingClientRect();
        const x = Math.max(-10, Math.min(10, event.clientX - rect.left - rect.width / 2));
        const y = Math.max(-10, Math.min(10, event.clientY - rect.top - rect.height / 2));
        pupils.forEach((pupil) => {
            pupil.style.transform = 'translate(calc(-50% + ' + x + 'px), calc(-50% + ' + y + 'px))';
        });
    });
    window.Sirius = Object.freeze({ say, interact, wave, talk, animate });
})();
