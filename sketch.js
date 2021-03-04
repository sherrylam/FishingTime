/***********************************************************************************
	Fishing Time
	by Sherry Lam

	Overview:
    This is a fishing experience to simulate what you can and cannot catch based on your fishing license

------------------------------------------------------------------------------------
	Notes:
    I roughly based it on the California Freshwater Sport Fishing Regulations
    https://nrm.dfg.ca.gov/FileHandler.ashx?DocumentID=177572&inline

    I know there are salmon, trout, and sturgeon licenses, but I wanted to make this simple.


***********************************************************************************/

// Array of images
var images = [];
var fishimg = [];

var assets = ['fishlicense.jpg','river.jpg', 'river_catch.jpg', 'river_lineout.jpg', 'river_pull.jpg'];

var fish = ['bass', 'grasscarp', 'greensturgeon', 'pike', 'salmon', 'trout', 'whitesturgeon'];

var fishnames = ['Black Bass', 'Grass Carp', 'Green Sturgeon', 'Northern Pike', 'Salmon', 'Rainbow Trout', 'White Sturgeon']

//fish variables
var randomfish;
var fishsize = 150;
var fishoffset = 150;

// timer
var fishTimer;
var fishTimer2;

// variable that is a function 
var drawFunction;

// text offset
var offset = 60;

var lineHeight;

var size = 24;


// load all images into an array
function preload() {
  for (var i = 0; i < assets.length; i++) {
    images[i] = loadImage('assets/' + assets[i]);
  }
  for (var i = 0; i < fish.length; i++) {
    fishimg[i] = loadImage('assets/' + fish[i] + '.png');
  }
}

// Center drawing, drawFunction will be one for default
function setup() {
  createCanvas(windowWidth, windowHeight-4);

  // Center our drawing objects
  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER);
  // text settings
  textSize(size);
  textFont('Nunito');

  // set to one for startup
  drawFunction = drawSplash;

}

// Very simple, sets the background color and calls your state machine function
function draw() {
  background(172, 233, 255);
  textSize(size);
  fill(0);

  // will call your state machine function
  drawFunction();
}

//========= TEMPLATE: modify these functions, INSIDE the function blocks only =========

//-- drawSplash() will draw the image at index 1 from the assets array
drawSplash = function() {
  image(images[1], width/2, height/2);
  textSize(60);
  fill(255);
  text("Fishing Time", width/2, height/2);
  textSize(size);
  fill(0);
  text("Click anywhere to start", width/2, height - offset);

}

//-- drawLicense() will draw the image at index 0 from the assets array
drawLicense = function() {
  text("Here is your fishing license for today!", width/2, offset);
  text("Remember to take a look at the fishing regulations.", width/2, offset + 30);
  image(images[0], width/2, height/2, 650, 650);

  text("Click anywhere to look at the regulations.", width/2, height - offset);

  instruction();
}

//-- drawRegulations() will draw the multiples image from the fishimg array
drawRegulations = function() {
  text("Here is what you can and can't catch today:", width/2, offset);

  textSize(20);
  fill(0, 100, 50);
  text("Can Catch:", width/5, height/5);
  //bass
  fill(0);
  text(fishnames[0], width/5 + fishoffset, height/5 + fishoffset);
  image(fishimg[0], width/5, height/5 + fishoffset, fishsize, fishsize);
  //salmon
  text(fishnames[4], width/5 + fishoffset, height/5 + fishoffset * 2);
  image(fishimg[4], width/5, height/5 + fishoffset * 2, fishsize, fishsize);
  //trout
  text(fishnames[5], width/5 + fishoffset, height/5 + fishoffset * 3);
  image(fishimg[5], width/5, height/5 + fishoffset * 3, fishsize, fishsize);
  //white sturgeon
  text(fishnames[6], width/5 + fishoffset, height/5 + fishoffset * 4);
  image(fishimg[6], width/5, height/5 + fishoffset * 4, fishsize, fishsize);

  fill(255, 0, 0);
  text("Endangered/Must Release:", width/2, height/5);
  //green sturgeon
  fill(0);
  text(fishnames[2], width/2 + fishoffset - 80, height/5 + fishoffset);
  image(fishimg[2], width/2 - 80, height/5 + fishoffset, fishsize, fishsize);

  fill(255, 0, 0);
  text("Invasive/Must Catch:", width/1.3 - 20, height/5);
  //grass carp
  fill(0);
  text(fishnames[1], width/1.3 + fishoffset - 80, height/5 + fishoffset);
  image(fishimg[1], width/1.3 - 80, height/5 + fishoffset, fishsize, fishsize);
  //pike
  text(fishnames[3], width/1.3 + fishoffset - 80, height/5 + fishoffset * 2);
  image(fishimg[3], width/1.3 - 80, height/5 + 350, fishsize, fishsize);

  textSize(size);
  text("Click anywhere to start fishing!", width/2, height - offset);

  instruction();
}

//-- drawThrowLine() will draw the image at index 3 from the array
drawThrowLine = function() {
  text("Wait for a fish to get caught...", width/2, offset);
  image(images[3], width/2, height/2);

  instruction();

  if( fishTimer.expired() ) {
      drawFunction = drawPull;
      fishTimer2.start();
  }
}

//-- drawPull() will draw the image at index 4 from the array
drawPull = function() {
  text("Something caught on!", width/2, offset);
  text("Quickly reel in (press [SPACE])", width/2, offset + 30);
  image(images[4], width/2, height/2);

  instruction();

  // when the timer runs out, automatically change to timeup page
  if( fishTimer2.expired() ) {
      drawFunction = drawTimeUp;
  }
}

//-- drawFish() will draw the image at index 2 from the assets array, a random image from fishimg
drawFish = function() {
  text("Wow! You caught a " + fishnames[randomfish] + "!", width/2, offset);
  text("Would you like to keep or release it?", width/2, offset + 30);
  image(images[2], width/2, height/2);
  image(fishimg[randomfish], width/2 + 60, height/2 + fishoffset, 250, 250);

  // keep release buttons
  noFill();
  strokeWeight(3);
  rect(width/2 - 200, height - offset - 10, 120, 40, 10);
  rect(width/2 + 200, height - offset - 10, 120, 40, 10);
  fill(0);
  text("Keep", width/2 - 200, height - offset);
  text("Release", width/2 + 200, height - offset);

  instruction();
}

//-- drawTimeUp() will draw the image at index 3 from the array
drawTimeUp = function() {
  text("Oh no! You took too long to reel in.", width/2, offset);
  text("The fish let go and swam away.", width/2, offset + 30);
  image(images[3], width/2, height/2);

  //button
  noFill();
  strokeWeight(3);
  rect(width/2, height - offset - 10, 300, 40, 10);
  fill(0);
  text("Throw your line again", width/2, height - offset);

  instruction();
}

//-- drawGoodCatch() will draw the image at index 3 from the array
drawGoodCatch = function() {
  text("Nice catch!", width/2, offset);
  image(images[3], width/2, height/2);

  //button
  noFill();
  strokeWeight(3);
  rect(width/2, height - offset - 10, 200, 40, 10);
  fill(0);
  text("Fish for more.", width/2, height - offset);

  instruction();
}

//-- drawGoodRelease() will draw the image at index 3 from the array
drawGoodRelease = function() {
  text("That was nice of you to release it :)", width/2, offset);
  image(images[3], width/2, height/2);

  // button
  noFill();
  strokeWeight(3);
  rect(width/2, height - offset - 10, 200, 40, 10);
  fill(0);
  text("Fish for more.", width/2, height - offset);

  instruction();
}

//-- drawIllegalCatch() will draw the image at index 3 from the array
drawIllegalCatch = function() {
  fill(255, 0, 0);
  text("Uh Oh!!! That was an endangered species!", width/2, offset);
  text("You aren't allowed to keep it. You have been fined.", width/2, offset + 30);
  image(images[3], width/2, height/2);

  //button
  noFill();
  strokeWeight(3);
  rect(width/2, height - offset - 10, 150, 40, 10);
  fill(0);
  text("Try Again", width/2, height - offset);

  instruction();
}

//-- drawIllegalRelease() will draw the image at index 3 from the array
drawIllegalRelease  = function() {
  fill(255, 0, 0);
  text("Uh Oh!!! That was an invasive species!", width/2, offset);
  text("You shouldn't release it.", width/2, offset + 30);
  image(images[3], width/2, height/2);

  //button
  noFill();
  strokeWeight(3);
  rect(width/2, height - offset - 10, 250, 40, 10);
  fill(0);
  text("Throw your line again", width/2, height - offset);

  instruction();
}


// Change the drawFunction variable based on your interaction
function keyPressed() {
  if( drawFunction === drawSplash ) {
    return;
  }
  if( key === 's' ) {
    drawFunction = drawSplash;
  }
  // spacebar
  else if ( keyCode === 32 ) {
    if(drawFunction === drawPull) {
      randomfish = floor(random(fish.length));
      print(randomfish);
      drawFunction = drawFish;
    }
  }
}

function mousePressed() {
  // change state if we are in splash screen
  if( drawFunction === drawSplash ) {
    drawFunction = drawLicense;
  }
  // change to regulation screen
  else if( drawFunction === drawLicense ) {
  	drawFunction = drawRegulations;
  }
  // change to throw line screen & start fishTimer
  else if( drawFunction === drawRegulations ) {
    drawFunction = drawThrowLine;
    fishTimer = new Timer(random(5000, 10000));
    fishTimer.start();
    fishTimer2 = new Timer(random(3000, 6000));
  }

  // change to throw line screen & start fishTimer
  else if( drawFunction === drawTimeUp) {
    drawFunction = drawThrowLine;
    fishTimer = new Timer(random(5000, 10000));
    fishTimer.start();
  }
  // add buttons in GoodCatch
  else if( drawFunction === drawGoodCatch ) {
  	// to throwline & start fishTimer
  	if( (mouseX > width/2 - 100) && (mouseX < width/2 + 100) && (mouseY > height - offset - 30) && (mouseY < height - offset + 10) ) {
  	  drawFunction = drawThrowLine;
      fishTimer = new Timer(random(5000, 10000));
      fishTimer.start();
  	}
  }
  // add buttons in Fish
  else if( drawFunction === drawFish ) {
    if( (mouseX > width/2 - 260) && (mouseX < width/2 - 140) && (mouseY > height - offset - 30) && (mouseY < height - offset + 10) ) {
      // if the fish is a green sturgeon, go to Illegalcatch
      if( randomfish === 2) {
        drawFunction = drawIllegalCatch;
      }
      else {
        drawFunction = drawGoodCatch;
      }
    }
  	else if( (mouseX > width/2 + 140) && (mouseX < width/2 + 260) && (mouseY > height - offset - 30) && (mouseY < height - offset + 10) ) {
      if( randomfish === 1 || randomfish === 3) {
        drawFunction = drawIllegalRelease;
      }
      else {
        drawFunction = drawGoodRelease;
      }
    }
  }
  else if( drawFunction === drawGoodRelease ) {
    // to throwline & start fishTimer
    if( (mouseX > width/2 - 100) && (mouseX < width/2 + 100) && (mouseY > height - offset - 30) && (mouseY < height - offset + 10) ) {
      drawFunction = drawThrowLine;
      fishTimer = new Timer(random(5000, 10000));
      fishTimer.start();
    }
  }
  else if( drawFunction === drawIllegalCatch ) {
    // to throwline & start fishTimer
    if( (mouseX > width/2 - 100) && (mouseX < width/2 + 100) && (mouseY > height - offset - 30) && (mouseY < height - offset + 10) ) {
      drawFunction = drawThrowLine;
      fishTimer = new Timer(random(5000, 10000));
      fishTimer.start();
    }
  }
  else if( drawFunction === drawIllegalRelease ) {
    // to throwline & start fishTimer
    if( (mouseX > width/2 - 100) && (mouseX < width/2 + 100) && (mouseY > height - offset - 30) && (mouseY < height - offset + 10) ) {
      drawFunction = drawThrowLine;
      fishTimer = new Timer(random(5000, 10000));
      fishTimer.start();
    }
  }

}

// adds instruction to go back to splash page & regulations page
function instruction() {
  fill(255);
  textSize(20);
  text("Press [s] to go back to splash page.", width - 125, offset + 25 , 200, 100);
  text("Press [r] to go look at the regulations page again.", width - 125, 50 + offset + 50, 200, 100);
  noFill();
  strokeWeight(3);
  rect(width - 125, offset*2, 200, 200, 10);
}