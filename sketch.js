const MIN_SECONDS = 1;

let facemesh;
let video;
let predictions = [];
let debug = false;

function preload() {
  mySound = loadSound('choro2.mp3');
}

function log(msg) {
  if(debug) {
    console.log(msg);
  }
  select('#status').html(msg);
}

function cry() {
  // Play the sound
    if (!mySound.isPlaying()) {
      // Play the sound
      log("Crying from start");
      mySound.play();
    }
}

function setup() {
  
  const urlParams = new URLSearchParams(window.location.search);
  
  // Check if the 'debug' parameter is present and set to 'true'
  if (urlParams.has('debug') && urlParams.get('debug') === 'true') {
    debug = true;
  }
  
  // Use the debug flag to enable or disable debugging output
  log(`Debugging is enabled: ${debug}`);
  
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    predictions = results;
  });
  video.hide();

}

function modelReady() {
  log('Model Loaded');
}

let hasSomeone = false;
let lastMoment = -1000 * 1000;
let chorou = true;

function draw() {
  background(255);
  if(debug){
    image(video, 0, 0, width, height);
  }

  if(predictions.every(p => p.faceInViewConfidence < 0.9)) {
    if(hasSomeone) {
      hasSomeone = false;
    }
    const delta = (millis() - lastMoment) / 1000;
    if(delta > MIN_SECONDS) {
      if(chorou == false) {
        chorou = true;
        log(`Chorando @${delta}`);
        cry();
      }
    }
    
  } else {
    chorou = false;
    hasSomeone = true;
    lastMoment = millis();
    if (mySound.isPlaying()) {
      log(`Para de chorar`);
      mySound.stop();
    }
  }
  
  // We can call both functions to draw all keypoints and the skeletons
  if(debug) drawKeypoints();
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;

    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];

      fill(0, 255, 0);
      ellipse(x, y, 5, 5);
    }
  }
}