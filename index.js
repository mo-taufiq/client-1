const volumeUP = "fa-volume-up";
const volumeMute = "fa-volume-off";

const volumeButton = document.querySelector(".volume-button");
const volumeButtonIcon = document.querySelector(".volume-button i");

const sounds = [
  "mixkit-typewriter-soft-hit-1366.wav",
  "mixkit-typewriter-soft-click-1125.wav",
  "mixkit-hard-typewriter-click-1119.wav",
];
const deleteSound = "mixkit-typewriter-soft-click-1125.wav";
const spaceSound = "mixkit-typewriter-hit-1362.wav";
let keystrokeSound = null;

let isMute = true;

const writerAnimationTexts = [
  "Anda ingin menyumbang? klik atau pindai kode QR dibawah.",
  "Hasil dari sumbangan akan diberikan kepada orang yang membutuhkan. Dan kebetulan saya lagi butuh.",
];
const writerAnimationEl = document.querySelector(".typewrite");

let isTextRunning = false;

const setFullYear = () => {
  const el = document.querySelector(".full-year");
  el.innerHTML = new Date().getFullYear();
};

const generateRandomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const playSoundEffect = (name) => {
  if (isMute) {
    return;
  }

  if (name === "") {
    let rand = generateRandomNumberBetween(0, 2);
    name = sounds[rand];
  }

  keystrokeSound = new Audio(`./assets/sounds/${name}`);
  keystrokeSound.play();
};

function WriterAnimation(
  element,
  texts,
  rangeWriteSpeed,
  deleteSpeed,
  deleteDelay,
  callback
) {
  this.element = element;
  this.texts = texts;
  this.rangeWriteSpeed = rangeWriteSpeed;
  this.deleteSpeed = deleteSpeed;
  this.deleteDelay = deleteDelay;
  this.idxText = 0;
  this.idxChar = 0;
  this.fullText = "";
  this.isDelete = false;
  this.play = false;

  this.writer = () => {
    if (this.idxChar < this.fullText.length && !this.isDelete) {
      const char = this.fullText.charAt(this.idxChar);
      this.element.innerHTML += this.fullText.charAt(this.idxChar);
      let soundName = "";
      if (char === " ") {
        soundName = spaceSound;
      }
      playSoundEffect(soundName);
      this.idxChar++;

      if (this.idxChar == this.fullText.length) {
        setTimeout(this.writer, this.deleteDelay);
        this.isDelete = true;
        this.play = true;
      } else {
        let rand = generateRandomNumberBetween(
          this.rangeWriteSpeed[0],
          this.rangeWriteSpeed[1]
        );
        setTimeout(this.writer, rand);
      }
    } else if (this.isDelete) {
      this.fullText = this.element.innerHTML;
      this.element.innerHTML = this.fullText.substring(
        0,
        this.fullText.length - 1
      );
      if (this.play) {
        playSoundEffect(deleteSound);
        this.play = false;
      }
      this.idxChar--;

      if (this.idxChar == 0) {
        this.idxText++;
        if (this.idxText == texts.length) {
          this.idxText = 0;
        }
        this.fullText = this.texts[this.idxText];
        this.isDelete = false;
        setTimeout(this.writer, this.deleteSpeed);
      } else {
        setTimeout(this.writer, this.deleteSpeed);
      }
    }
  };

  this.startWriting = () => {
    this.idxChar = 0;
    this.idxText = 0;
    this.fullText = this.texts[this.idxText];
    this.writer();
  };

  this.doSomething = callback;
}

const writerAnimation = new WriterAnimation(
  writerAnimationEl,
  writerAnimationTexts,
  [80, 150],
  10,
  4000,
  () => {}
);

const inViewport = (element) => {
  var bb = element.getBoundingClientRect();
  return !(bb.top + 60 > innerHeight || bb.bottom < 0);
};

setFullYear();
if (inViewport(writerAnimationEl) && !isTextRunning) {
  isTextRunning = true;
  writerAnimation.startWriting();
}
document.addEventListener("scroll", () => {
  if (inViewport(writerAnimationEl) && !isTextRunning) {
    isTextRunning = true;
    writerAnimation.startWriting();
  }

  if (inViewport(writerAnimationEl)) {
    if (volumeButton.classList.contains("d-none")) {
      volumeButton.classList.remove("d-none");
    }
  } else {
    if (!volumeButton.classList.contains("d-none")) {
      volumeButton.classList.add("d-none");
    }
  }
});

volumeButton.addEventListener("click", (event) => {
  if (volumeButtonIcon.classList.contains(volumeUP)) {
    volumeButtonIcon.classList.remove(volumeUP);
    volumeButtonIcon.classList.add(volumeMute);
    isMute = true;
  } else {
    volumeButtonIcon.classList.remove(volumeMute);
    volumeButtonIcon.classList.add(volumeUP);
    isMute = false;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  window.scrollTo(0, 0);
  const el = document.querySelector(".container");
  el.classList.add("rise");
});
