const musicContainer = document.querySelector('.music-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const audio = document.querySelector('#audio');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');


//Song titles

const songs = ['Hit_It', 'Ongoing_Thing', 'Takeover_SMANG'];


//Keep track of songs 

let songIndex= 2;

//Initially load song info DOM from
loadSong(songs[songIndex]);

//Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src= `assets/music/${song}.mp3`;
    cover.src= `assets/img/${song}.png`;
}

function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong(){
    audio.pause();
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
}


//Event Listeners

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying){
        pauseSong();
    }
    else {
        playSong();
    }
})