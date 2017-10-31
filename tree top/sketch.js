let sticks = [];
let acorns = [];
let stickPics = [];
let wallXs = [];
let DaSquirrel;
let pic1;
let acorn1;
let wallPic;
let wallPWidth;
let alive;
let angle;
let x;


function preload() {
    pic1 = loadImage('squirrel1.png');
    acorn1 = loadImage('acorn1.png');
    wallPic = loadImage('wallpaper1.jpg'); 
}

function setup() { 
    createCanvas(800, 400);
	sticks.push(new stick(width));
	DaSquirrel = new squirrel();
    setInterval(function() {
    acorns.push(new Acorn());
}, 5000);
    alive = true;
    angle = 0;
    x = -300;
    wallPWidth = 450;
    wallPHeight = 458;
    for (let x = 0; x < width + wallPWidth; x+=wallPWidth) {
        wallXs.push(x);
    }
    imageMode(CENTER);
}

function draw() { 
    drawWallPaper();
    if (alive) {
        for (let i = 0; i < sticks.length; i++) {
		  sticks[i].update(i);
	   }
        for (let i = 0; i < acorns.length; i++) {
            acorns[i].update(i);
        }
        DaSquirrel.update();
    } else {
        for (let i = 0; i < sticks.length; i++) {
            sticks[i].show();
        }
        for (let i = 0; i < acorns.length; i++) {
            acorns[i].show();
        }
        DaSquirrel.show();
        strokeWeight(2);
        stroke(0);
        fill(205, 0, 0);
        textSize(20);
        text("press any key to continue", width/2, 25);
        textSize(35);
        text("YOU KILLED THE SQUIRREL", x, height - 50);
        x += 2;
        if (x > width + 300) {
            x = -300;
        }
        translate(width/2, height/2);
        rotate(angle);
        angle+=.01;
        textAlign(CENTER, CENTER);
        strokeWeight(6);
        fill(0);
        stroke(random(255), random(255), random(255));
        let int = 80 * cos(angle % TWO_PI);
        if (int < 0) {
            angle+= PI;
        }
        textSize(abs(80 * cos(angle % TWO_PI)));
        text("Game Over", 0, 0);
    }
}