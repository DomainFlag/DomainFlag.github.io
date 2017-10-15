const wobble = 0.05;

let body = document.body,
    html = document.documentElement;

let viewPortHeight = Math.min( body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight ) * 90/100;

let viewPortWidth = Math.max( body.scrollWidth, body.offsetWidth,
    html.clientWidth, html.scrollWidth, html.offsetWidth );

const maxTail = 300;

let stardust = document.createElement("img");
stardust.src = "./assets/images/welcoming/stardust.png";

/** Star Constructor */
function Star(index) {
    this.positionX = Math.ceil(Math.random()*viewPortWidth);
    this.positionY = Math.ceil(Math.random()*viewPortHeight);
    this.maxRadius = Math.random()*4+2;
    this.radius = 0.0;
    this.life = Math.floor(Math.random()*100+200);
    this.maturity = "young";
    this.index = index;
}

Star.prototype.act = function() {
    if(this.maturity === "young") {
        this.lighting();
    } else if(this.maturity === "mature") {
        this.wobbling();
    } else if(this.maturity === "old") {
        this.dimming();
    } else {
        this.lifeCycle();
    }
};

Star.prototype.lifeCycle = function() {
    Welcome.sky.stars[this.index] = new Star(this.index);
};

Star.prototype.lighting = function() {
    this.radius += this.maxRadius/30;
    if(this.radius > this.maxRadius) {
        this.maturity = "mature";
    }
};

Star.prototype.dimming = function() {
    this.radius -= this.maxRadius/30;
    if(this.radius < 0) {
        this.maturity = "dying"
    }
};

Star.prototype.wobbling = function() {
    this.radius = this.radius + Math.random()/10-wobble;
    this.life -= 1;
    if(this.life === 0) this.maturity = "old";
};

/** Comet Constructor **/
function Comet() {
    let index = Math.random()-0.5;
    if(index > 0) {
        this.pos = new Vector(viewPortWidth+Math.random()*100, Math.random()*viewPortHeight);
        this.velocity = new Vector(Math.cos(Math.PI + Math.random()*0.4-0.2)*4, Math.sin(Math.PI + Math.random()*0.4-0.2)*4);
    } else {
        this.pos = new Vector((-1)*Math.random()*100, Math.random()*viewPortHeight);
        this.velocity = new Vector(Math.cos(Math.random()*0.4-0.2)*4, Math.sin(Math.random()*0.4-0.2)*4);
    }

    this.debris = [];
    for(let i = 0; i < 300; i++) {
        this.debris.push(new Debris(this.pos, this.velocity));
    }
}

Comet.prototype.act = function() {
    if(this.pos.x < -300 || this.pos.x > viewPortWidth+300) {
        this.velocity.x *= -1;
    } else if(this.pos.y < -300 || this.pos.y > viewPortHeight+300) {
        this.velocity.y *= -1;
    }
    this.pos.plus(this.velocity);
};

/** Comet Debris Constructor **/
function Debris(position, velocity) {
    let angle = Math.atan2(velocity.y, velocity.x) + Math.PI;
    let anglenew = Math.random()*maxTail;
    let anglex = angle+Math.random()*0.06-0.003;
    let angley = angle+Math.random()*0.06-0.003;
    this.pos = new Vector(position.x + Math.cos(angle)*(Math.random()*16-8) + Math.cos(anglex)*anglenew,
        position.y + Math.sin(angle)*(Math.random()*16-8) + Math.sin(angley)*anglenew);
    let newVelocity = 0.4+Math.random()*0.4;
    this.velocity = new Vector(velocity.x*newVelocity + Math.cos(angle+Math.random()*0.2-0.1)*2, velocity.y*newVelocity + Math.sin(angle+Math.random()*0.2-0.1)*2);
}

Debris.prototype.act = function(pos) {
    if(this.pos.x < -300 || this.pos.x > viewPortWidth+300) {
        this.velocity.x *= -1;
    } else if(this.pos.y < -300 || this.pos.y > viewPortHeight+300) {
        this.velocity.y *= -1;
    }

    if(this.pos.distance(pos) > maxTail) {
        let angle = Math.atan2(this.velocity.y, this.velocity.x) + Math.PI;
        this.pos = new Vector(pos.x + Math.cos(angle)*(Math.random()*16-8), pos.y + Math.sin(angle)*(Math.random()*16-8));
    }

    this.pos.plus(this.velocity);
};


/** Sky Constructor*/
function Sky() {
    this.stars = [];
    this.comets = [];

    for(var i = 0; i < 30; i++) {
        this.stars.push(new Star(i));
    }

    for(var g = 0; g < 3; g++) {
        this.comets.push(new Comet(i));
    }
}

function CanvasDisplay() {
    this.canvas = document.querySelector("#welcoming_animations");
    this.context = this.canvas.getContext("2d");
    this.setCanvasDimensions();

    this.sky = new Sky();

    stardust.addEventListener("load", function() {
        this.renderBackground();
        this.renderAnimations();
    }.bind(this));
}

CanvasDisplay.prototype.setCanvasDimensions = function() {
    this.canvas.width = viewPortWidth;
    this.canvas.height = viewPortHeight;
};

CanvasDisplay.prototype.renderBackground = function() {
    let canvas = document.querySelector("#welcoming_background");
    let ctx = canvas.getContext("2d");

    canvas.width = viewPortWidth;
    canvas.height = viewPortHeight+200;

    ctx.fillStyle = this.context.createPattern(stardust, "repeat");
    ctx.shadowBlur = 50;
    ctx.shadowColor = "black";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, viewPortHeight);
    for(let i = 0; i < 15; i += (Math.random()*2+1)) {
        ctx.lineTo(viewPortWidth/10*i, viewPortHeight-(Math.random()*80-40));
    }
    ctx.lineTo(viewPortWidth, viewPortHeight);
    ctx.lineTo(viewPortWidth, 0);
    ctx.closePath();
    ctx.fill();
};

CanvasDisplay.prototype.renderAnimations = function() {
    if(render) {
        this.context.clearRect(0, 0, viewPortWidth, viewPortHeight);

        this.context.fillStyle = "#ecf0f1";
        this.sky.stars.forEach(function(star) {
            this.context.beginPath();
            this.context.moveTo(star.positionX, star.positionY);
            for(let i = 0.0; i <= 2*Math.PI; i += Math.PI/2) {
                this.context.quadraticCurveTo(star.positionX, star.positionY, star.positionX + Math.cos(i)*star.radius, star.positionY + Math.sin(i)*star.radius);
            }
            this.context.closePath();
            this.context.fill();

            star.act();
        }, this);

        this.sky.comets.forEach(function(comet) {
            this.context.fillStyle = "rgba(240, 80, 83, 0.5)";

            this.context.beginPath();
            this.context.arc(comet.pos.x, comet.pos.y, 4, 0, Math.PI*2);
            this.context.fill();

            comet.debris.forEach(function(junk) {
                this.context.fillStyle = "rgba(240, 80, 83, " + (1-junk.pos.distance(comet.pos)/maxTail) + ")";

                this.context.beginPath();
                this.context.arc(junk.pos.x, junk.pos.y, 1, 0, 2*Math.PI);
                this.context.fill();
                junk.act(comet.pos);
            }, this);

            comet.act();
        }, this);
    }

    requestAnimationFrame(this.renderAnimations.bind(this));
};
