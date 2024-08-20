console.log("hello");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

// Song data array
let songs = [
  {
    songName: "Salam e Ishq",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Salam e Ishq 2",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "Salam e Ishq 3",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Salam e Ishq 4",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Salam e Ishq 5",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Salam e Ishq 6",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Salam e Ishq 7",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Salam e Ishq 8",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Salam e Ishq 9",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "Salam e Ishq 10",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];

// Update song items UI
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause button
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    updateUIForPlay();
  } else {
    audioElement.pause();
    updateUIForPause();
  }
});

// Listen to events for progress bar
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// Function to reset all play buttons
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

// Update UI for play state
const updateUIForPlay = () => {
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  gif.style.opacity = 1;
};

// Update UI for pause state
const updateUIForPause = () => {
  masterPlay.classList.remove("fa-pause-circle");
  masterPlay.classList.add("fa-play-circle");
  gif.style.opacity = 0;
};

// Handle individual song play button
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element, index) => {
    element.addEventListener("click", (e) => {
      if (songIndex !== index || audioElement.paused) {
        makeAllPlays();
        songIndex = index;
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        updateUIForPlay();
      } else {
        audioElement.pause();
        e.target.classList.remove("fa-pause-circle");
        e.target.classList.add("fa-play-circle");
        updateUIForPause();
      }
    });
  }
);

// Handle next button
document.getElementById("next").addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  playSongByIndex();
});

// Handle previous button
document.getElementById("previous").addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSongByIndex();
});

// Play song by song index
const playSongByIndex = () => {
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  updateUIForPlay();
};
