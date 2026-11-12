(() => {
    const phrases = [
        'Час перевірити, чи все на своїх місцях.',
        'Я спокійний, але спостерігаю за всім.',
        'Година тиші, не турбуйте мене.',
        'Мій хвіст завжди в русі.',
        'Чую звук, цікаво, що це?',
        'Це місце виглядає зручним для відпочинку.'
    ];
    document.getElementById('say-something-button').addEventListener('click', () => {
        window.Sirius.say(phrases[Math.floor(Math.random() * phrases.length)], 6000);
    });
})();
