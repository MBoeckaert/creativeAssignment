//global variables
let video;
let poseNet;
let poses = [];
let wristLx = 0;
let wristLy = 0;
let wristRx = 0;
let wristRy = 0;
let noseX = 0;
let noseY = 0;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses" with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
    if(poses.length > 0){
      //left wrist
        let wristLeftXposition = poses[0].pose.keypoints[9].position.x;
        let wristLeftYPosition = poses[0].pose.keypoints[9].position.y;
        wristLx = lerp(wristLx, wristLeftXposition, 0.2);
        wristLy = lerp(wristLy, wristLeftYPosition, 0.2);
      //right wrist
        let wristRightXposition = poses[0].pose.keypoints[10].position.x;
        let wristRightYPosition = poses[0].pose.keypoints[10].position.y;
        wristRx = lerp(wristRx, wristRightXposition, 0.2);
        wristRy = lerp(wristRy, wristRightYPosition, 0.2);
      //nose
        let noseXposition = poses[0].pose.keypoints[0].position.x;
        let noseYPosition = poses[0].pose.keypoints[0].position.y;
        noseX = lerp(noseX, noseXposition, 0.2);
        noseY = lerp(noseY, noseYPosition, 0.2);
    }
  });
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);

  drawKeypoints();
}

function drawKeypoints()  {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse if the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        //show nose, wristR & wristL only
        ellipse(wristLx, wristLy, 32);
        ellipse(wristRx, wristRy, 32);
        ellipse(noseX, noseY, 32);

        checkLeftHigherThanRight();
      }
    }
  }
}

//webcam is mirror imaged
function checkLeftHigherThanRight() {
  if(wristLy > wristRy){
    console.log(`moving right`);
  }else{
    console.log(`moving left`);
  }
}

//need jump function
// if nose.X is moving upwards log nose upwards