const songTitle = document.querySelector('.song-title');
const artist = document.querySelector('.song-artist');
const prev = document.querySelector('.prev');
const playPause = document.querySelector('.play-pause');
const next = document.querySelector('.next');
const audio = document.querySelector('audio');
const image = document.querySelector('img');
const progress = document.querySelector('.progress');   
const progressContainer = document.querySelector('.progress-container')

//initialize song list by nesting objects 
 const songList = [
    {
        path: "assets/songs/and-so-it-begins.mp3",
        songName: "And So It Begins",
        artist: "Artificial.Music",
        image: "assets/img/1.png"
    },
    {
        path: "assets/songs/bedtime-after-a-coffee.mp3",
        songName: "Bedtime After a Coffee",
        artist: "Barradeen",
        image: "assets/img/2.png"
    },
    {
        path: "assets/songs/coral.mp3",
        songName: "Coral",
        artist: "LiQWYD",
        image: "assets/img/3.png"
    },
    {
        path: "assets/songs/dreams-come-true.mp3",
        songName: "Dreams Come True",
        artist: "Purrple Cat",
        image: "assets/img/4.png"
    },
    {
        path: "assets/songs/equinox.mp3",
        songName: "Equinox",
        artist: "Purrple Cat",
        image: "assets/img/5.png"
    },
    {
        path: "assets/songs/fragile.mp3",
        songName: "Fragile",
        artist: "Keys of Moon",
        image: "assets/img/6.jpg"
    },
    {
        path: "assets/songs/herbal-tea.mp3",
        songName: "Herbal Tea",
        artist: "Artificial.Music",
        image: "assets/img/7.png"
    },
    {
        path: "assets/songs/japan.mp3",
        songName: "Japan",
        artist: "Uniq",
        image: "assets/img/8.png"
    },
    {
        path: "assets/songs/water-wood-and-stone.mp3",
        songName: "Water Wood and Stone",
        artist: "Audionautix",
        image: "assets/img/9.png"
    },
    {
        path: "assets/songs/you-know-why.mp3",
        songName: "You Know Why",
        artist: "Loyalty Freak Music",
        image: "assets/img/10.jfif"
    }
 ];


 //Play track 
 let songPlaying = false;

 function playSong() {
     songPlaying = true;
     audio.play();
     playPause.classList.add("active");
     playPause.innerHTML = '<i class="bx bx-pause"></i>';
 }

 //Pause track 
function pauseSong() {
    songPlaying = false;
    audio.pause();
    playPause.classList.remove("active");
    playPause.innerHTML = "<i class='bx bx-play'></i>";
}

audio.addEventListener('ended',nextSong);

//Call pause or play function on click
playPause.addEventListener("click", () => (songPlaying ?
pauseSong() : playSong()));



//Update songName, audio and artist 
function loadSong(songList) {
    image.src = songList.image;
    songTitle.textContent = songList.songName;
    audio.src = songList.path;
    artist.textContent = songList.artist;
}

let i = 0;

//Play previous tracks
function prevSong() {
    if(i > 0) {
        i--;
        loadSong(songList[i]);
        playSong();
    } else {
        i = songList.length-1;
        loadSong(songList[i]);
        playSong();

    }
}

//Play next tracks
function nextSong() { 
    if(i < songList.length -1) {
        i++;
        loadSong(songList[i]);
        playSong()

    } else{
        i = 0;
        loadSong(songList[i]);
        playSong();
    }
}

//update progress on click
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
  
    audio.currentTime = (clickX / width) * duration;
  }

//update progress bar based on song length
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }
loadSong(songList[i]);


//event listeners
next.addEventListener("click", nextSong);   
prev.addEventListener("click", prevSong);   

audio.addEventListener('timeupdate',updateProgress)

progressContainer.addEventListener('click',setProgress)
