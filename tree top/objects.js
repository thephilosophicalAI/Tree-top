
function stick(x) {
	this.y = random(height/2, height - 20);
	this.yend = this.y + random(-10, 10);
	this.x = x;
	this.mated = false;
    this.curve = random(8, 15);
    this.width = random(150, 250);
	this.xend = this.x + this.width;
	this.slope = (this.y - this.yend) / (this.x - this.xend);
	this.velocity = random(3, 4);
	this.show = function() {
		//strokeWeight(2);
		noStroke();
        fill(210, 105, 30);
		rect(this.x, this.y, this.width, height - this.y);
        ellipse(this.x + this.width / 2, this.y, this.width, this.curve);
	}
	this.update = function(index) {
		this.show();
		this.x -= this.velocity;
		this.xend -= this.velocity;
		if (this.x < width - 400 && !this.mated) {
			sticks.push(new stick(this.x + 1));
			this.mated = true;
		} else if (this.xend < 0) {
			sticks.splice(index, 1);
		}
	}
}

function squirrel() {
	this.y = 0;
	this.v = 0;
	this.a = 0;
	this.g = .005;
    this.j = 0;
    this.score = 0;
	this.show = function() {
        textSize(35);
        text(this.score, 50, 50);
        imageMode(CENTER)
        image(pic1, 40, this.y);
	}
	this.update = function() {
		this.score+=1;
        this.a += this.g;
        this.a = constrain(this.a, -.2, .2);
		this.v += this.a; 
        if (keyIsDown(32)) { 
            DaSquirrel.v = constrain(DaSquirrel.v, -10, 1.6);
        }
 		this.y += this.v;
        if (this.y > height + 20) {
            alive = false;
        }
		for (let i = 0; i < sticks.length; i++) {
			if (sticks[i].x < 60 && sticks[i].xend > 30 && this.y - (sticks[i].slope * (40 - sticks[i].x)) >= sticks[i].y - 40 && this.y - (sticks[i].slope * (40 - sticks[i].x)) <= sticks[i].y - 30 && this.v > 0) {
				this.a = 0;
				this.v = 0;
				 this.y = (sticks[i].slope * (40     - sticks[i].x)) + sticks[i].y - 40;
                this.j = 0;
			}
		}
        this.show();
	}
}

function Acorn(x) {
    this.y = random(20, height - 20);
    this.x = width + 50;
    this.col = color(random(255), random(255), random(255));
    this.dead = false;
    this.show = function() {
        imageMode(CENTER);
        image(acorn1, this.x, this.y)
    }
    this.update = function(index) {
        if (this.x < -20) {
            acorns.splice(index, 1);
        } else if (this.dead) {
            fill(this.col);
            stroke(0);
            textSize(50);
            text("+1000", this.x, this.y);
        } else if (this.x < 60 && dist(this.x, this.y, 60, DaSquirrel.y) < 80) {
            this.dead = true;
            DaSquirrel.score += 1000;
            setTimeout(function() {
                acorns.splice(index, 1);
            }, 3000);
        } else {
            this.x -= 3;
            this.show();
        }
    }
}
