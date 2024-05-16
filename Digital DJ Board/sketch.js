//ARRAY VARS
let songs = []// array to hold songs
let songButtons = []; //buttons for songs
let songTitles; // object to hold song titles
let allSongs = 15; // no. of songs

//REGION STUFF:
//variables for region icons
let southam, africa, northam, asia, europe
//variables for regions
let nabut, sabut, afbut, asbut, eubut;

//ALBUM COVER STUFF:
let bigone;
//South America album covers
let soda, enanitos, abuelos;
//Africa
let youssou, vivi, magicSys;
//North America
let tate, nerPic, vMonet;
//Asia
let skyResto, maher, rapline;
//Europe
let alicia, tayc, sally;

//VARS FOR SONG MANIPILATION
let delay, distortion;
let amtD; // amt of delay
let amtDis // amt of distortion
//variables for sliders
let distortionSl, delaySl, speedSl; //IB for speed params: https://www.geeksforgeeks.org/p5-js-rate-function/amp/
//extra buttons
let pausebut; //resbut; maybe
//sound effects
let echoHorn, discStop, discScratch, doubleSnare;
let echoHornBut, discStopBut, discScratchBut, doubleSnareBut;

//saving song remix file variables, IB: https://p5js.org/examples/sound-record-save-audio.html
let recordRemix, saveRemix, recordSong, stopRecord;

//MUSIC VARS
//total duration of the song
let songsDuration = [];
let cTime = 0; // current time
let whatsPlaying = 14; // set super high so it won't interfere with songs 0-14

//spinning reccords object
let spinRec;

//let isRecording = false;
let recording = false;

function preload() {

  for (let i = 0; i < allSongs; i++) {
    songs[i] = loadSound('sounds/' + i + ".mp3");
    }
    songTitles = loadStrings('songNames.txt');
  
   //preloading region images
   southam = loadImage('images/southam.webp');
   africa = loadImage('images/africa.webp');
   northam = loadImage('images/northam.png');
   asia = loadImage('images/asia.gif');
   europe = loadImage('images/europe.png')
   bigone = loadImage('images/bigone.webp');
  
   //spinning records
   soda = loadImage('images/0soda.png');
   enanitos = loadImage('images/1enanitos.png');
   abuelos = loadImage('images/2abuelos.jpeg');
   youssou = loadImage('images/3youssou.png');
   vivi = loadImage('images/4viviane.png');
   magicSys = loadImage('images/5magicsystem.png');
   tate = loadImage('images/6tate.png');
   nerPic = loadImage('images/7nereyda.png');
   vMonet = loadImage('images/8jaguar.png');
   skyResto = loadImage('images/9sky.png');
   maher = loadImage('images/10mawlaya.png');
   rapline = loadImage('images/11ddaeng.png');
   alicia = loadImage('images/12alicia.png');
   tayc = loadImage('images/13tayc.png');
   sally = loadImage('images/14sally.png');

   //sound effects
   echoHorn = loadSound('sounds/echoHorn.mp3')
   discStop = loadSound('sounds/discStop.mp3')
   discScratch = loadSound('sounds/discScratch.mp3')
   doubleSnare = loadSound('sounds/doubleSnare.mp3')
  }

function setup() {
 createCanvas(1470, 750);

  //setting up record and save stuff and calling functions
  recordRemix = new p5.SoundRecorder();
  recordRemix.setInput(songs[whatsPlaying]);
  saveRemix = new p5.SoundFile();

  //button to start recording
  recordSong = createButton('Record Remix');
  recordSong.position(490, 600);
  recordSong.mousePressed(startRecording);

  //button to stop recording
  stopRecord = createButton('Stop Record & Save');
  stopRecord.position(820, 600);
  stopRecord.mousePressed(downloadRemix);

  //setting up all song buttons
  for (let i = 0; i < allSongs; i++) {
    songButtons[i] = createButton(songTitles[i]).mouseClicked(() => iWasClicked(i));
    songButtons[i].position(i * 100, -300);
  }

 //objects for spinning record class
 spinRec = new Record();

 //waveform
 fft = new p5.FFT();
 songs[whatsPlaying].amp(0.2);

   //distortion slider
  distortion = new p5.Distortion
  distortionSl = createSlider(0, 100, 0);
  distortionSl.position(830, 175);
  distortionSl.style('transform', 'rotate(270deg)');
  distortionSl.style('height', '300px');
  distortionSl.size(330);

  //delay slider
  delay = new p5.Delay();
  delaySl = createSlider(0, 100, 0);
  delaySl.position(955, 175);
  delaySl.style('transform', 'rotate(270deg)');
  delaySl.style('height', '300px');
  delaySl.size(330);

  //speed slider
  speedSl = createSlider(0.1, 2, 1, 0.01);
  speedSl.position(1080, 175);
  speedSl.style('transform', 'rotate(270deg)');
  speedSl.style('height', '300px');
  speedSl.size(330);

 //setting up region buttons
 //south america buttons
 sabut = createButton("SouthAm")
 sabut.position(160, 220);
 sabut.mousePressed(saPlaylist)

 //africa buttons
 afbut = createButton("Africa")
 afbut.position(330, 220);
 afbut.mousePressed(afPlaylist);

  //north american buttons
  nabut = createButton("NorthAm")
  nabut.position(470, 220);
  nabut.mousePressed(naPlaylist);

 //asia buttons
 asbut = createButton("Asia")
 asbut.position(655, 220);
 asbut.mousePressed(asiaPlaylist);

 //eur buttons
 eubut = createButton("Eur")
 eubut.position(820, 220);
 eubut.mousePressed(euPlaylist);

 //sound effect buttons
 echoHornBut = createButton("Echo Horn");
 echoHornBut.position(1040, 630);
 echoHornBut.mousePressed(playEchoHorn);
 discStopBut = createButton("Disc Stop");
 discStopBut.position(1190, 630);
 discStopBut.mousePressed(playDiscStop);
 discScratchBut = createButton("Disc Scratch");
 discScratchBut.position(1040, 590);
 discScratchBut.mousePressed(playDiscScratch);
 doubleSnareBut = createButton("Double Snare");
 doubleSnareBut.position(1170, 590);
 doubleSnareBut.mousePressed(playDoubleSnare);

 //pause button
 pausebut = createButton("⏸️");
 pausebut.position(695, 600);
 pausebut.mousePressed(pauseSong);

}

 //record and download remix functions
 function startRecording() {
 if (recordSong.mousePressed) {
   recordRemix.record(songs[whatsPlaying])
    //isRecording = true;
    recording = true;
    console.log('Now Recording..');
  }
 }
function downloadRemix() {
   if (stopRecord.mousePressed) {
   recordRemix.stop();
   //FIX TITLE OF DOWNLOAD
   saveSound(songs[whatsPlaying], '(songs[whatsPlaying])' + 'Remix');
   //isRecording = false;
   recording = false;
   console.log('Recording Stopped');
  }
 }


 //FUNCTIONS TO PLAY SOUND EFFECTSA

   //echo horn
   function playEchoHorn() {
    if (echoHornBut.mousePressed) {
      echoHorn.play();
    } else {
      echoHorn.pause();
    }
  }

    //disc stop
    function playDiscStop() {
    if (discStopBut.mousePressed) {
      discStop.play();
    } else {
      discStop.pause();
    }
  }

    //disc scratch
    function playDiscScratch() {
      if (discScratchBut.mousePressed) {
        discScratch.play();
      } else {
        discScratch.pause();
      }
    }

    //disc scratch
    function playDoubleSnare() {
      if (doubleSnareBut.mousePressed) {
        doubleSnare.play();
      } else {
        doubleSnare.pause();
      }
    }

//REGIONAL PLAYLIST FUNCTIONS:

  function saPlaylist() {
    //positioning all south america buttons
    songButtons[0].position(220,300)
    songButtons[1].position(500,300)
    songButtons[2].position(750,300)

    //hiding all the other buttons
    for (let i = 3; i < allSongs; i++) {
      songButtons[i].position(-100, -100);
  } 
  }

  function afPlaylist() {
    //positioning all africa buttons
    songButtons[3].position(220,300)
    songButtons[4].position(500,300)
    songButtons[5].position(750,300)

    //hiding all the other buttons
    for (let i = 0; i < allSongs; i++) {
      if (i !== 3 && i !== 4 && i !== 5) {
          songButtons[i].position(-100, -100);
      }
    }
  } 

  function naPlaylist() {
    //positioning all north america buttons
    songButtons[6].position(220,300)
    songButtons[7].position(500,300)
    songButtons[8].position(750,300)

    //hiding all the other buttons
    for (let i = 0; i < allSongs; i++) {
      if (i !== 6 && i !== 7 && i !== 8) {
          songButtons[i].position(-100, -100);
      }
    }
  }

  function asiaPlaylist() {
    //positioning all asia buttons
    songButtons[9].position(220,300)
    songButtons[10].position(500,300)
    songButtons[11].position(750,300)

    //hiding all the other buttons
    for (let i = 0; i < allSongs; i++) {
      if (i !== 9 && i !== 10 && i !== 11) {
          songButtons[i].position(-100, -100);
      }
    }
  } 

 function euPlaylist() {

    //positioning all europe buttons
    songButtons[12].position(220,300)
    songButtons[13].position(500,300)
    songButtons[14].position(750,300)

    //hiding all the other buttons
    for (let i = 0; i < allSongs; i++) {
      if (i !== 12 && i !== 13 && i !== 14) {
          songButtons[i].position(-100, -100);
      }
    }
  } 

function draw() {
 tint(100); //to make background darker
 background(bigone);
 fill(225);
 rectMode(CENTER);
 rect(width / 2, height / 2, 1200, 600, 20);
 imageMode(CORNER);

noTint();

 textSize(18);
 fill(10);
 noStroke();
  text("Sound Effects", 1100, 560)
  textSize(15);
  text("Distortion", 970, 140)
  text('dry/wet: ' + round(amtDis * 100) + '%', 970, 525);
  text("Delay", 1100, 140)
    text('dry/wet: ' + round(amtD * 100) + '%', 1090, 525);
  text("Speed", 1220, 140)
  text('speed: ' + speedSl.value(), 1210, 525);

//dry/wet: ' + round(amt * 100) + '%', 10, height - 20
  
 //console.log('Currently Playing:', whatsPlaying, 'woooooooo');
 if (recording) {
  //red dot to show when recording has started
  stroke(255, 0, 0);
  strokeWeight(15);
  point(470,610);
 }

 //image positions for each region
 image(southam, 150, 100, 100, 100);
 image(africa, 290, 100, 100, 100);
 image(northam, 440, 100, 100, 100);
 image(asia, 625, 100, 120, 100);
 image(europe, 800, 100, 110, 110);

 //waveform of song playing
 let waveform = fft.waveform();
 noFill();
 beginShape();
 stroke(100);
 strokeWeight(2);
 for (let i = 0; i < waveform.length; i++) {
   let x = map(i, 0, waveform.length, 960, 445);
   let y = map(waveform[i], -1, 1, 200, height - 100);
   vertex(x, y);
  }
 endShape();


  //amt of delay applied
  amtD = delaySl.value() / 100;
  delay.drywet(amtD);
  delay.process(songs[whatsPlaying], 0.20, .8, 2300);

  amtDis = distortionSl.value() / 100;
  distortion.drywet(amtDis);
  distortion.process(songs[whatsPlaying], 0.20, .8, 2300);

  //speed slider stuff
  let speed = speedSl.value(); 
  songs[whatsPlaying].rate(speed);

 //background progress line for current song
 stroke(150, 150);
 line(450, 550, 953, 550);

 //setting up variable for song duration
 for(let i = 0 ; i< allSongs; i++){
  songsDuration[i] = songs[i].duration();
 }

 push();
 //progress line of song
 if (songs[whatsPlaying].isPlaying()) {
  // if the song is playing,
  // get the current time of song in secs
  cTime = songs[whatsPlaying].currentTime();
  let timeLeft = songsDuration[whatsPlaying] - cTime;
  strokeWeight(8);
  stroke(18);
  //use lerp to draw the line
  let pct = lerp(450, 550, cTime / songsDuration[whatsPlaying]);
  line(450, 550, pct, 550);
  // put a lil dot at the end
  strokeWeight(10);
  point(pct, 550);
  strokeWeight(1);
  //time passed in song in seconds with zero in front
  fill(0);  
  textSize(13)
  text(int(frontZero(songs[whatsPlaying].currentTime())), 455, 575);
  //time left in song
  text("-" + int((timeLeft)), 920, 575);
  }
 pop();


 //connecting spinning records to sound files
 spinRec.update();
 if (songs[0].isPlaying() == true) {
    spinRec.renderLabel(soda);
  } else if (songs[1].isPlaying() == true) {
    spinRec.renderLabel(enanitos);
  } else if (songs[2].isPlaying() == true) {
    spinRec.renderLabel(abuelos);
  } else if (songs[3].isPlaying() == true) {
    spinRec.renderLabel(youssou);
  }  else if (songs[4].isPlaying() == true) {
    spinRec.renderLabel(vivi);
  } else if (songs[5].isPlaying() == true) {
    spinRec.renderLabel(magicSys);
  } else if (songs[6].isPlaying() == true) {
    spinRec.renderLabel(tate);
  } else if (songs[7].isPlaying() == true) {
    spinRec.renderLabel(nerPic);
  } else if (songs[8].isPlaying() == true) {
    spinRec.renderLabel(vMonet);
  } else if (songs[9].isPlaying() == true) {
    spinRec.renderLabel(skyResto);
  } else if (songs[10].isPlaying() == true) {
    spinRec.renderLabel(maher);
  } else if (songs[11].isPlaying() == true) {
    spinRec.renderLabel(rapline);
  } else if (songs[12].isPlaying() == true) {
    spinRec.renderLabel(tayc);
  } else if (songs[13].isPlaying() == true) {
    spinRec.renderLabel(alicia);
  } else if (songs[14].isPlaying() == true) {
    spinRec.renderLabel(sally);
  }
  //pop();
 }

 //funtion to play songs
 function iWasClicked(val) {
  if(!songs[val].isPlaying()) {
    for (let i = 0; i < songs.length; i++) {
      if (val !=i && songs[i].isPlaying) songs[i].stop();
      }
    songs[val].play();
    songs[val].setVolume(.2);
   }
  whatsPlaying = val;
  }

 //function to pause songs
 function pauseSong() {
  songs[whatsPlaying].pause();
  }

 //class for spinning records
 class Record {

   constructor() {
     this.xpos = 0;
     this.ypos = 0;
     this.rot = 0.0;
     this.pic;
   }

   update() {
     //rotate record images
     push();
     translate(280, 480);
     rotate(-this.rot * 4.0);
     this.rot += .01;
     //pop();
   }

   renderLabel(labelImage) {
     //push();
     this.pic = labelImage;
     imageMode(CENTER);
     image(this.pic, this.xpos, this.ypos, 300, 300);
     pop();
   }
  }

 //adding the zero in front if number is below 9 for song duration
 function frontZero(num) {
  if (num <= 9) {
    return "0" + num;
  } else {
    return num;
  }
  }

  //to find mouse position

  function mousePressed(){
    console.log(mouseX + "," + mouseY)
  }
