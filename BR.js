var status = "";
var objects = [];

function preload() {
    img = loadImage("bedroom.jpg");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetecter = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: detecting objects";
}

function modelLoaded() {
    console.log("model is loaded");
    status = true;
    objectDetecter.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}

/*function draw() {
    image(img, 0, 0, 640, 420);
    fill("red");
    text("dog 100%", 45, 75);

    noFill();
    stroke("red");
    rect(40, 60, 300, 320);

    fill("red");
    text('cat 100%', 305, 105);

    noFill();
    stroke("red");
    rect(300, 70, 300, 320);

}*/

function draw() {
    image(img, 0, 0, 640, 420);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status = objects detected";
            fill(r, g, b);
            confidence = objects[i].confidence * 100;
            confidencePercent = floor(confidence);
            text(objects[i].label + " " + confidencePercent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}
