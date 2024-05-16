//must get element
const canvas = document.getElementById('waveformCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

//preloading
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const audioElement = new Audio('music/sagacite.mp3');
const audioSource = audioContext.createMediaElementSource(audioElement);
const analyser = audioContext.createAnalyser();
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

analyser.fftSize = 2048; // FFT size (frequency resolution)
audioSource.connect(analyser);
audioSource.connect(audioContext.destination);

//rendering waveform
function renderWaveform() {
  ctx.clearRect(0, 0, width, height);
  
  analyser.getByteTimeDomainData(dataArray);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#ffffff';
  ctx.beginPath();
  
  const sliceWidth = width * 1.0 / bufferLength;
  let x = 0;
  for(let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = v * height / 2;
    
    if(i === 0) {
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

renderWaveform();

//play audio after click & pause too
let isPlaying = false;
function togglePlayback() {
  if (isPlaying) {
    audioElement.pause();
  } else {
    audioElement.play();
  }
  isPlaying = !isPlaying; 
}

document.addEventListener('click', togglePlayback);

function handleSongEnd() {
  togglePlayback(); // Toggle playback state
}

audioElement.addEventListener('ended', handleSongEnd);
