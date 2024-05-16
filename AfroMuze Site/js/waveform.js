//must get element
const canvas = document.getElementById('waveformCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

//preloading
let audioContext;
let audioElement = new Audio('music/sagacite.mp3');
let audioSource;
let analyser;
let bufferLength;
let dataArray;
let isPlaying = false;

function initAudio() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  audioSource = audioContext.createMediaElementSource(audioElement);
  analyser = audioContext.createAnalyser();
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  analyser.fftSize = 2048;
  audioSource.connect(analyser);
  audioSource.connect(audioContext.destination);
}

//rendering waveform
function renderWaveform() {
  ctx.clearRect(0, 0, width, height);

  analyser.getByteTimeDomainData(dataArray);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#ffffff';
  ctx.beginPath();

  const sliceWidth = width * 1.0 / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = v * height / 2;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

    x += sliceWidth;
  }


  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();

  requestAnimationFrame(renderWaveform);
}

function togglePlayback() {
  if (!audioContext) {
    initAudio();
  }

  if (isPlaying) {
    audioElement.pause();
  } else {
    audioElement.play();
  }

  isPlaying = !isPlaying;
}

document.addEventListener('click', togglePlayback);

audioElement.addEventListener('ended', () => {
  isPlaying = false;
});

audioElement.addEventListener('play', () => {
  requestAnimationFrame(renderWaveform);
});

document.body.addEventListener('click', () => {
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
});