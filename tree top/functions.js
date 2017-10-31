function drawWallPaper() {
    for (let i = 0; i < wallXs.length; i++) {
        image(wallPic, wallXs[i], wallPHeight / 2);
        if (alive) {
            wallXs[i]-=2;
        }
        if (wallXs[i] + wallPWidth < 0) {
            wallXs.splice(0, 1);
        } else if ((wallXs[i] <= width) && (wallXs[i] >= width - 1)) {
            wallXs.push(width + wallPWidth);
        }
    }
}

function keyPressed() {
    if (alive) {
	   if (keyCode == 38 && DaSquirrel.j < 2) {
		  DaSquirrel.v = -5;
            DaSquirrel.y -= 5;
            DaSquirrel.j += 1;
	   } else if (keyCode == 40) {
            DaSquirrel.y += 10;
            DaSquirrel.v += 2;
        }
    } else {
        loaction.reload();
        createP("check");
    }
}