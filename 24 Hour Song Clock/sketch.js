//music streaming clock - apple music version because booooo spotify
//whole day is one 24 hr song
//progress line displays time

//what to code:
//progress bar for the song using moving ball and layered lines
//pplay button
//sound bar and icons
//fast forward buttons for decor
//numbers counting hr,min,sec
//numbers counting time in descending order
//today's date as song title

//the album cover could be a smaller window with something funky happening inside

//variables to set:
//hour, minute, second

//setting time variables
let hr, min, sec, d, mon, yr;

function setup() {
  createCanvas(400, 600);
  //colorMode(HSB);
  rectMode(CENTER)
}

function draw() {
  background(30);
  
  //set up time
  hr = hour();
  min = minute();
  sec = second();
  d = day();
  mon = month();
  yr = year();

  //background progress line
  stroke(150,150); 
  strokeWeight(8);
  line(50, 380, 350, 380);

  //moving progress line
  let elapsed = ((hr * 60) + min);
  let lineEnd = map(elapsed, 0, 1440, 0, 300);
  strokeWeight(8);
  stroke(190,150);
  line(50, 380, 50 + lineEnd, 380);
  
  //two lines for play button
  strokeWeight(10);
  stroke(255);
  line(185,440,185,470);
  line(205,440,205,470);

  //fast forward double triangles right
  noStroke();
  fill(255);
  triangle(290,445,290,465,310,455);
  triangle(270,445,270,465,290,455);
  
  //album cover for 24hr song
  //in the AM, album color pallette is brighter
  //in the PM album color palleter is darker

    if (hr < 12) {
      fill((200 + sec),(200 + min),(200 + hr));
    }

    if (hr >= 12) {
      fill((50 + sec),(50 + min),(50 + hr));
    }

  rect(200,160,320,270)
  noFill();
  stroke(255,255,255);
  strokeWeight(18);
  line(150,115,250,100);
  strokeWeight(8);
  line(145,115,145,200);
  line(255,100,255,200);
  strokeWeight(40);
  point(129,200);
  point(239,200);

  //24hr song title - day month year
  textSize(20)
  fill(240);
  noStroke();
  textAlign(LEFT);
  text(frontZero(mon) + "/" + frontZero(d),45,335)
  textSize(15)
  fill(200);
  text(yr, 45,360)

  //fast forward double triangles left
  noStroke();
  fill(255);
  triangle(110,445,110,465,90,455);
  triangle(90,445,90,465,70,455);
  //flip these triangles around to face left

  //sound bar background
  stroke(150,150); 
  strokeWeight(6);
  line(90, 520, 310, 520);

  //sound bar white part
  stroke(190,150); 
  strokeWeight(6);
  line(90, 520, 200, 520);

  //low sound icon left
  noStroke();
  fill(200);
  triangle(65,512,65,528,53,520);
  rect(54,520,8,7);

  //high sound icon right
  noStroke();
  fill(200);
  triangle(346,512,346,528,333,520,333,520);
  rect(334,520,8,7);
  strokeWeight(1);
  stroke(200);
  noFill();
  arc(352,520,15,15,PI + HALF_PI,HALF_PI)
  arc(352,520,5,5,PI + HALF_PI,HALF_PI)
  
  //visual text, numbers counting current time
  textSize(12)
  fill(150);
  noStroke();
  textAlign(CENTER);
  text(hr + ":" + frontZero(min) + ":" + frontZero(sec), 70, 405);
  //numbers showing how much time is left in the day
  //putting extra parentheses = treat these as numbers not as text
  text("-" + frontZero(24-hr) + ":" + frontZero(59-min) + ":" + frontZero(59-sec),330,405);

  //extra details to match apple m interface
  strokeWeight(30);
  stroke(180,80);
  point(327,336);
  strokeWeight(4);
  stroke(255)
  point(319,336);
  point(327,336);
  point(334.5,336);
  
}

//adding the zero in front if number is below 9
//inspired by demo in class
function frontZero(num) {
  if (num <= 9) {
    return "0" + num;
  } else {
    return num;
  }
}


//finding mouse position
function mousePressed(){
  console.log(mouseX + "," + mouseY)
  }