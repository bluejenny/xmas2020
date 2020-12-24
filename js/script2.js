"use strict";

/**************************************************
Activity 5 Inheritance
with Pippin Barr
**************************************************/

let state = `title`;

let bgDark = {
  r: 10,
  g: 10,
  b: 35,
};

let pedestrian;

let vehicles = [];
let numCars = 10;
let numTrucks = 10;
let numMotorcycles = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);

  let x = width / 2;
  let y = height;
  pedestrian = new Pedestrian(x, y);

  for (let i = 0; i < numCars; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let car = new Car(x, y);
    vehicles.push(car);
  }

  for (let i = 0; i < numTrucks; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let truck = new Truck(x, y);
    vehicles.push(truck);
  }

  for (let i = 0; i < numMotorcycles; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let motorcycle = new Motorcycle(x, y);
    vehicles.push(motorcycle);
  }

  // set random directions
  for (let i = 0; i < vehicles.length; i++) {
    let vehicle = vehicles[i];
    let r = random(0, 1);
    if (r < 0.5) {
      vehicle.vx = -vehicle.speed;
    } else {
      vehicle.vx = vehicle.speed;
    }
  }
}

function draw() {

  background(bgDark.r, bgDark.g, bgDark.b, 25);

  if (state === `title`) {
    title();
  } else if (state === `simulation`) {
    simulation();
  } else if (state === `success`) {
    success();
  } else if (state === `dead`) {
    dead();
  }
}

function title() {
  push();
  noCursor();
  fill(234);
  textAlign(CENTER, CENTER);
  textSize(52);
  text(`Happy Holidays`, width / 2, height / 2 -50);
  textSize(22);
  text(`press any key to start`, width / 2, height / 2 +10);

  //background with transparancy
  background(0,0,35,25);

  //blinking stars
  var galaxy = {
    locationX: random(width),
    locationY: random(height),
    size: random(1, 6),
  };
  ellipse(mouseX, mouseY, galaxy.size, galaxy.size);
  ellipse(galaxy.locationX, galaxy.locationY, galaxy.size, galaxy.size);
  pop();
}

function simulation() {
  background(bgDark.r, bgDark.g, bgDark.b);
  pedestrian.handleInput();
  pedestrian.move();
  pedestrian.display();

  for (let i = 0; i < vehicles.length; i++) {
    let vehicle = vehicles[i];
    vehicle.move();
    vehicle.wrap();
    vehicle.display();

    pedestrian.checkHit(vehicle);
  }

  if (!pedestrian.alive) {
    state = `dead`;
  }

  if (pedestrian.y < 0) {
    state = `success`;
  }
}

function success() {
  push();
  alert(`While drawing the snowflake, you will have an on-screen indicator that locates the centre of the drawing and lines that show the symmetry and thickness of the brush. Once you export the image to another tab (instructions below), the indicators will disappear and the image will no longer be cut.


Remember that symmetry is represented as a green line on the right of the screen and that you can change it with 'w' or 'W'.
Also that the thickness is represented as a blue line at the bottom of the window and that you can change it with 'q' or 'Q'.

With 'e' or 'E', you can erase your snowflake.
If you press 's' or 'S' a new tab will appear with the image. You can download that image by pressing 's' or 'S' again.`);

let symmetry = 6; //The symmetry to be used
let angle;
updateAngle(); //Angle step
let g; // Graphic (The image that will be exported)
let largest; //Number of pixels of the largest side of the window
let diffX; // Difference between the width of 'g' and 'width'
let diffY; // Difference between the height of 'g' and 'height'
let strokeW = 1; //Stroke weight
let multip; // Multiplier for the grid (I created a snapToGrid function that returns a value that is in a corner of a grid. The space between one point to another is that 'multip')

function setup() {
  let canvas = createCanvas(windowWidth - 1, windowHeight - 1);
  if (width > height) {
    largest = width;
    diffY = largest - height; //I use 'diffY' temporarily to measure the difference between 'largest' and 'height'
  } else {
    largest = height;
    diffY = largest - width; //I use 'diffY' temporarily to measure the difference between 'largest' and 'width'
  }
  multip = largest / 100; // Set a default value for multip

  drawSetup(); // Call a function that sets the canvas and the graphic
}

function drawSetup() { // Set the canvas and the graphic
  g = null;
  let c_ = sqrt(largest*largest + diffY*diffY); //Pythagoras theorem (a*a + b*b = c*c)
  g = createGraphics(c_, c_);
  diffX = g.width - width; //Set diffX
  diffY = g.height - height; //Set diffY

  angleMode(DEGREES); //Set the angle mode to degrees
  g.angleMode(DEGREES); //Set the angle mode to degrees

  background(51);
  fill(0);
  strokeWeight(largest / 30);
  stroke(255, 0, 0);
  point(width / 2, height / 2);
  // g.background(51); // Don't draw the background for the graphic, so it is transparent
  g.stroke(255);

  let x = map(strokeW, 1, largest / 30, 0, width);
  let y = map(symmetry, 3, 20, height, 0);

  strokeWeight(1);

  stroke(0, 255, 0);
  line(width * 0.95, y, width, y);

  stroke(0, 100, 255);
  line(x, height * 0.95, x, height);

  stroke(255);

  loop();
}

function keyPressed() {
  if (key == 'e' || key == 'E') { //Reset the canvas and the graphic if 'e' or 'E' is pressed
    noLoop();
    setTimeout(drawSetup(), 1);
    return;
  }

  //############################//
  //#########READ##THIS#########//
  //############################//
  //Here I just redirect the user to a tab where there is an image that you can download by pressing 's' or 'S'. This text was created so that it occupies as little space as possible, not so that it can be read easily.
  if (key == 's') {
    let pageStyle = "<sty" + "le>body{background:rgba(51,51,51,1)};*{margin: 0px;border:0px;padding:0px;}</sty" + "le>"
    let pageScript = "<scri" + "pt>document.body.onkeydown=function(e){if(e.key==='s'||e.key==='S'){let link=document.createElement('a');link.setAttribute('href',document.getElementsByTagName('img')[0].src);link.setAttribute('download','Snowflake');link.click();}};</scri" + "pt>";
    let img = new Image();
    img.src = g.canvas.toDataURL();
    window.open("").document.write(pageStyle + img.outerHTML + pageScript);
  }
}

function draw() {
  let x = map(strokeW, 1, largest / 30, 0, width); //Set temporary values for where the indicators will be
  let y = map(symmetry, 3, 20, height, 0); //Set temporary values for where the indicators will be
  if (keyIsPressed) {
    if (key == 'q' && mouseX >= 0 && mouseX <= width) {

      strokeW = map(mouseX, 0, width, 1, largest / 30);
      x = map(strokeW, 1, largest / 30, 0, width);

    } else if (key == 'w' && mouseY >= 0 && mouseY <= height) {

      symmetry = floor(map(mouseY, height, 0, 3, 20));
      updateAngle();
      y = map(symmetry, 3, 20, height, 0);

    }
  }
  if (mouseIsPressed) {
    g.reset(); //There is no default ResetMatrix() that acts on each 'draw' for the graphics (but there is for the canvas, so it is not necessary to do the same for it)
    g.translate(diffX / 2, diffY / 2); //Move the graphic to fit the canvas

    let mx = mouseX - width / 2;
    let my = mouseY - height / 2
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;

    mx = snapToGrid(mx, multip);
    my = snapToGrid(my, multip);
    pmx = snapToGrid(pmx, multip);
    pmy = snapToGrid(pmy, multip);

    translate(width / 2, height / 2); //Translate to the centre
    g.translate(width / 2, height / 2); //Translate to the centre

    strokeWeight(strokeW); //Set the strokeWeight
    g.strokeWeight(strokeW); //Set the strokeWeight

    for (let i = 0; i < symmetry; i++) { //Repeat the process
      push(); //Save matrix
      rotate(i * angle); //Rotate
      line(mx, my, pmx, pmy); //Draw
      scale(-1, 1); //Flip the canvas
      line(mx, my, pmx, pmy); //Draw again
      pop(); //Restore matrix

      //Do the same for the graphic
      g.push();
      g.rotate(i * angle);
      g.line(mx, my, pmx, pmy);
      g.scale(-1, 1);
      g.line(mx, my, pmx, pmy);
      g.pop();
    }
  }
  resetMatrix(); //Reset the matrix so the indicators are drawn correctly
  noStroke();
  rect(0, height * 0.95 - 1, width, height);
  rect(width * 0.95 - 1, 0, width, height);

  strokeWeight(1);

  stroke(0, 255, 0);
  line(width * 0.95, y, width, y);

  stroke(0, 100, 255);
  line(x, height * 0.95, x, height);

  stroke(255);
}


function updateAngle() { //A function to update the angle
  angle = 360 / symmetry;
}

function snapToGrid(val, multiplier) { // A function that returns a value that is in an imaginary grid
  let num = 0;
  while (!(abs(val) - num <= multiplier)) {
    num += multiplier;
  }
  return num * Math.sign(val);
}
  pop();
}

function dead() {
  push();
  fill(234);
  textAlign(CENTER, CENTER);
  textSize(52);
  text(`too bad so sad`, width / 2, height / 2 -50);
  pop();
}

function keyPressed() {
  if (state === `title`) {
    state = `simulation`;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
