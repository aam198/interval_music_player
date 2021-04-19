const musicContainer = document.querySelector('.music-container');
const title = document.querySelector('#title');
const currentTime = document.querySelector('.current-time');
const duration = document.querySelector('.duration');
const duration2 = document.querySelector('#duration2');
const cover = document.querySelector('#cover');
const audio = document.querySelector('#audio');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const slider = document.querySelector('#slider');


//Song titles

const songs = ['Hit_It', 'Ongoing_Thing', 'Takeover_SMANG'];


//Keep track of songs 

let songIndex= 2;

//Initially load song info DOM from
loadSong(songs[songIndex]);

//Update song details
function loadSong(song) {
    title.innerText = song;
    duration.innerText= audio.duration;
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
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

audio.onloadeddata = function () {
    progress.max = audio.duration
    var ds = parseInt(audio.duration % 60)
    var dm = parseInt((audio.duration / 60) % 60)
    duration2.innerHTML =  dm + ':' + ds
    duration.innerHTML =("0"+ dm) + ':' + ds
}

audio.ontimeupdate = function () { 
    progress.value = audio.currentTime 
}

audio.addEventListener('timeupdate', function () {
    const minute = Math.floor(audio.currentTime / 60);
    const second = Math.floor(audio.currentTime % 60);
    
    currentTime.innerHTML =
      ("0" + minute).substr(-2) + ":" + ("0" + second).substr(-2);
}, false)



function prevSong(){
    songIndex--

    if (songIndex < 0){
        songIndex = songs.length -1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    songIndex++

    if (songIndex > songs.length -1){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();

}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration)* 100;

    progress.style.width = `${progressPercent}%`;

}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width)* duration;
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

//Change the song events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress )

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)

duration.addEventListener('loadedmetada', function(){
    duration.setAttribute('data-time', duration.duration);
})
