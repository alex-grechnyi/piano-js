class Piano {
    constructor(elem, song) {
        this.elem = elem;
        this.song = song;
        this.isEnd = false;
        this.counter = 0;
        this.currentKey = null;
        this.currentNote = null;
    }

    demoPlay(e) {
        this.counter = 0;
        this.isEnd = false;
        console.log(this.counter);
        console.log(this.currentKey);
        this.elem = e.target;
        this.elem.disabled = true;
        this.getKey();
        this.currentNote = new Audio(`../audio/${this.song[this.counter]}.mp3`);
        this.currentNote.play();
        this.currentNote.addEventListener('pause', () => this.next()
        );
        this.addActiveClass(this.currentKey);
        //force active class removing
        setTimeout(() => {
            this.removeActiveClass(this.currentKey);
        },570);

        const pause = setInterval(() => {
            this.isEnd && clearInterval(pause);
            this.counter += 1;
            this.currentNote.pause();
            this.getKey();
            this.removeActiveClass(this.currentKey);
        }, 580);
    }

    next() {
        if (this.isEnd) return;
        this.addActiveClass(this.currentKey);
        this.currentNote.src = `../audio/${this.song[this.counter]}.mp3`;
        this.currentNote.play();
        const removeActiveClassInterval = setInterval(() => {
            this.getKey();
            this.removeActiveClass(this.currentKey);
            this.isEnd && clearInterval(removeActiveClassInterval);
        }, 560);
        if (this.counter > this.song.length-2) {
            this.isEnd = true;
            this.elem.disabled = false;
        }
    }

    playNote(key) {
        const currentNoteKey = key.getAttribute('data-key');
        const currentNote = new Audio(`../audio/${currentNoteKey}.mp3`);
        currentNote.play();
        this.addActiveClass(key);
    };

    getKey(song = this.song, counter = this.counter) {
        this.currentKey = document.querySelector(`.key[data-key="${song[counter]}"]`);
    }

    addActiveClass(key) {
        key.classList.add('key-active');
    };

    removeActiveClass(key) {
        key.classList.remove('key-active');
    };
}