song = "";
lwx = 0;
lwy = 0;
rwx = 0;
rwy = 0;
scoreRW = 0;
scoreLW = 0;

function preload() {
    console.error("Don't Look At My CODE!!!!!!!!!1");
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");
if(scoreRW > 0.2)
{
        circle(rwx, rwy, 20);

    if (rwy > 0 && rwy <= 100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    if (rwy > 100 && rwy <= 200){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    if (rwy > 200 && rwy <= 300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    if (rwy > 300 && rwy <= 400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    if (rwy > 300 && rwy <= 400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
}

    if (scoreLW > 0.2){
    circle(lwx, lwy, 20);
    InNumberlwy = Number(lwy);
    remove_decimal = floor(InNumberlwy);
    lwy_divide_1000 = remove_decimal/1000;
    volume = lwy_divide_1000 * 2;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
}

function sing() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log('Posenet Initialized');
}

function gotPoses(results) {
    if (results.length > 0)
    {
        console.log(results);
        scoreRW =  results[0].pose.keypoints[10].score;
        scoreLW =  results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = "+ scoreRW + "scoreLeftWrist = "+ scoreLW);


        lwx = results[0].pose.leftWrist.x;
        lwy = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + lwx + " Left Wrist Y = " + lwy);

        rwx = results[0].pose.rightWrist.x;
        rwy = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rwx + " Right Wrist Y = " + rwy);
    }
}

function stopsing() {
    song.stop();
}