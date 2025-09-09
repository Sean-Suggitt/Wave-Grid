
//  README:
//      There are four modes of control.

//      Toggle through the modes by clicking on the canvas.

//      Press the S key to freeze the canvas and hide the UI.

//      Explore each mode by moving your mouse up, down, left, and right.

//        1. COLOR --------> X-axis controls the colour of the dots
//                  \------> Y-axis controls the colour of the background
//
//        2. Frequency ----> X-axis controls the frequency (distance between wave peaks).
//                  \------> Y-axis controls a second parameter that introduces phase into the wave.
//                   \
//                    \-----> these are just two numbers that affect the freqency of the wave
//                           and modulate the sine wave to introduce phase. (phase looks cool)
//
//        3. Mag/speed ----> X-axis controls the magnitude of the wave
//                  \------> Y-axis controls the   
//
//        4. more phase ---> X-axis controls if it is on or off. halfway is the trigger.
//
//
//      Controls follow this^ order when toggling through.


//  If the program is lagging, un-comment out the second line in the draw() function. 
// spacing = 20;



let Height = 800;
let Width = 800;

mode = "colour";

more_phase = false;
showUI = true;

let backgroundColour = 255;
let dotStroke = 0;

//frequency of the wave
let frequencyX = 0.01;
let frequencyY = 0.01;

//magnitude (how much the dots are moved up or down) and speed (how fast)
let magnitude = 50;
let speed = 0.1;
   
let m1x, m1y, m2x, m2y, m3x, m3y, m4x, m4y = 0;

function setup() {
  createCanvas(Height, Width);
}


function mouseClicked() {
  if (mode == "colour") {
    mode = "frequency";
  } 
  else if (mode == "frequency") {
    mode = "magnitude_and_speed";
  } 
  else if (mode == "magnitude_and_speed"){
    mode = "more_phase_toggle";
  } 
  else if (mode == "more_phase_toggle"){
    mode = "colour";
  }
}

function keyPressed(){
  if(key == "s"){
       showUI = !showUI;
     }
}

function draw() {
  
  let spacing = 10;
  //spacing = 20;

  strokeWeight(3);
  fill(0);
  
  if(showUI == true){
    if (mode === "frequency"){
      frequencyY = map(mouseY, 0, 1000, 0.0009, .1);
      frequencyX = map(mouseX, 0, 1000, 0.0009, .08);

      m1y = mouseY;
      m1x = mouseX;

    }
    else if (mode == "colour"){
      dotStroke = map(mouseX, 0, 1000, 0, 255);
      backgroundColour = map(mouseY, 0, 1000, 255, 0);

      m2y = mouseY;
      m2x = mouseX;
    }
    else if (mode == "magnitude_and_speed"){
      magnitude = map(mouseX, 0, 1000, 0, 80);
      speed = map(mouseY, 0, 1000, 0, 1);

      m3y = mouseY;
      m3x = mouseX;
    }
    else if (mode == "more_phase_toggle"){
      if (mouseX > Width/2){
        more_phase = true;
      }
      else{
        more_phase = false;
      }

      m4y = mouseY;
      m4x = mouseX;
    }
  }
  background(backgroundColour);
  stroke(dotStroke);
  
  for (let x = -100; x < Height+100; x += spacing){
    for (let y = -100; y < Width + 100; y += spacing){
      
      //let wave = sin(frameCount * speed);
      //let wave = sin((x * frequencyX) + (frameCount * speed)) * magnitude;
      let wave = sin((x * frequencyX) + (y * frequencyY) + (frameCount * speed)) * magnitude;
      
      if(more_phase == true){
        point(x + wave, y + wave); 
      }
      else{
        point(x, y + wave);
      }    
      
    }
  }
  
  
  if(showUI == true){

    // update and display value markers for each mode
    stroke(255,0,0); //RED
    fill(255,0,0);
    circle(m1x,m1y, 8);

    stroke(0,255,0); //GREEN
    fill(0,255,0);
    circle(m2x,m2y, 8);

    stroke(0,0,255); //BLUE
    fill(0,0,255);
    circle(m3x,m3y, 8);

    if(mode=="more_phase_toggle"){
      stroke(59,59,59); //GREY
      fill(255);
      circle(m4x,m4y, 20);

      stroke(255)
      if(mouseX > Width/2){
        fill(0);
        text("On",100,120, 1000);
      }
      else{
        fill(0);
        text("Off",100,120, 1000);
      }
    }

      //display current mode
    stroke(255);
    fill(0);
    text(mode, 100, 100, 1000, 1000);

  }
  
  
}