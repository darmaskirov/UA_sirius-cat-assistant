// Optional browser speech recognition. No AI API or key is required.
(() => {
    const button = document.getElementById('voice-button');
    const status = document.getElementById('voice-status');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!button || !status) return;
    if (!SpeechRecognition) {
        button.disabled = true;
        status.textContent = 'Голосові команди недоступні в цьому браузері. Кнопки котика працюють без мікрофона.';
        return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'uk-UA';
    recognition.continuous = false;
    recognition.interimResults = false;
    let listening = false;
    function setListening(value) {
        listening = value;
        button.setAttribute('aria-pressed', String(value));
        button.textContent = value ? '🔴 Зупинити слухання' : '🎙 Голосові команди';
    }
    function run(commandText) {
        const command = commandText.toLocaleLowerCase('uk-UA').trim();
        if (/лапк|помах|лапою/.test(command)) {
            window.Sirius.wave();
            window.Sirius.say('Махаю лапкою! 🐾');
        } else if (/мурч/.test(command)) {
            document.getElementById('playButton-1').click();
            window.Sirius.say('Муррр...');
        } else if (/мяу|нявк/.test(command)) {
            document.getElementById('playButton').click();
            window.Sirius.say('Мяу!');
        } else if (/тем(у|а)|світл|темн/.test(command)) {
            document.getElementById('theme-icon').click();
            window.Sirius.say('Змінюю тему.');
        } else if (/анім|танцю/.test(command)) {
            window.Sirius.animate();
            window.Sirius.say('Дивись, як я вмію!');
        } else if (/привіт|вітаю/.test(command)) {
            window.Sirius.talk();
            window.Sirius.say('Привіт! Я Сіріус. 🐱');
        } else if (/скажи|розкаж/.test(command)) {
            document.getElementById('say-something-button').click();
        } else {
            window.Sirius.say('Я почув: ' + commandText + '. Цю команду ще не знаю.', 5500);
        }
    }
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim();
        status.textContent = 'Розпізнано: ' + transcript;
        if (transcript) run(transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = (event) => {
        setListening(false);
        status.textContent = event.error === 'not-allowed'
            ? 'Доступ до мікрофона заборонено. Дозволь доступ у браузері.'
            : 'Помилка розпізнавання: ' + event.error;
    };
    button.addEventListener('click', () => {
        try {
            if (listening) recognition.stop();
            else {
                recognition.start();
                setListening(true);
                status.textContent = 'Слухаю… Скажи «привіт», «мяу» або «зміни тему».';
            }
        } catch (_) {
            setListening(false);
            status.textContent = 'Не вдалося запустити розпізнавання. Спробуй ще раз.';
        }
    });
})();
