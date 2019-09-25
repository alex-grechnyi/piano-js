window.addEventListener('load', () => {
    const keys = document.querySelectorAll('.key');
    const playButton = document.querySelector('.play');
    const song = ['Semicolon', 'KeyP', 'Semicolon', 'KeyP', 'Semicolon', 'KeyJ', 'KeyL', 'KeyK', 'KeyH'];
    const piano = new Piano(playButton, song);
    bindDemoPlayListener();
    bindClickListener(keys);
    bindKeyDownListener();
    bindKeyUpListener();

    function bindDemoPlayListener() {
        playButton.addEventListener('click', (e) => {
            piano.demoPlay(e);
        });
    }

    function bindClickListener (keys) {
        for (let i = 0; i < keys.length; i++) {
            let key;
            keys[i].addEventListener('mousedown', function (e) {
                key = e.target;
                piano.playNote(key);
            });
            keys[i].addEventListener('mouseup', function () {
                piano.removeActiveClass(key);
            });
        }
    }

    function bindKeyDownListener() {
        document.addEventListener('keydown', function (e) {
            const key = document.querySelector(`.key[data-key="${e.code}"]`);
            if (key === null) return;
            piano.playNote(key);
        });
    }

    function bindKeyUpListener() {
        document.addEventListener('keyup', function (e) {
            const key = document.querySelector(`.key[data-key="${e.code}"]`);
            if (key === null)return;
            piano.removeActiveClass(key);
        });
    }
});