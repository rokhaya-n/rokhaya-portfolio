document.addEventListener('DOMContentLoaded', function () {
  //grab audio
  var audioPlayer = document.getElementById('audioPlayer');

  //grab play pause elements
  var click2play = document.querySelector('.click2play');
  var click2pause = document.querySelector('.click2pause');

  audioPlayer.addEventListener('play', function () {
      click2play.style.display = 'none';
      click2pause.style.display = 'block';
  });

  audioPlayer.addEventListener('pause', function () {
      click2pause.style.display = 'none';
      click2play.style.display = 'block';
  });

  function togglePlay() {
      if (audioPlayer.paused) {
          audioPlayer.play();
      } else {
          audioPlayer.pause();
      }
  }

  document.addEventListener('click', togglePlay);
});
