let height = window.innerHeight;
let width = window.innerWidth;

let image = document.createElement("img");
image.src = "./assets/images/footer/Smoke.png";

function Smoke() {
    this.scale = 1+Math.random()*4;
    let y = Math.random()*(height/2-185);
    let randomSign = Math.sign(Math.random()-0.5);
    let x = width/2-5*this.scale + randomSign*((height/2-185)/(width/2-5*this.scale))*(height/2-185-y);
    x = width/2-5*this.scale - randomSign*Math.abs(Math.random()*(x-width/2+5*this.scale))*Math.sqrt((height/2-185)/y);
    this.pos = new Vector(x, y);
    this.velocity = this.pos.unitVector(new Vector(width/2-5*this.scale, height/2-185)).scale(0.2+Math.random()*0.2);
}

Smoke.prototype.act = function() {
    if(this.pos.distance(new Vector(width/2-5*this.scale, height/2-185)) > (height/2-185)) {
        this.pos.y = height/2-185;
        this.pos.x = width/2-5*this.scale;
    } else {
        this.pos.add(this.velocity);
    }
};

function WindMill(x, y) {
    this.pos = new Vector(x, y);
    this.rotation = 0;
    this.rotationPower = 0.03+Math.random()/100;
}

WindMill.prototype.windy = function() {
    this.rotation = (this.rotation+this.rotationPower)%(2*Math.PI);
};


function Land() {
    this.canvas = document.querySelector("#footer_background");
    this.ctx = this.canvas.getContext("2d");
    this.smokes = [];
    for(let i = 0; i < 185; i++) {
        this.smokes.push(new Smoke());
    }

    this.windMills = [];
    this.windMills.push(new WindMill(width/2-15, height/2-30));
    this.windMills.push(new WindMill(width/2+140, height/2-20));
    this.windMills.push(new WindMill(width/2-135, height/2-60));

    this.canvas.width = width;
    this.canvas.height = height;

    image.addEventListener("load", function() {
        this.draw();
    }.bind(this));
}


Land.prototype.draw = function() {
    if(!render) {
        let ctx = this.ctx;
        ctx.clearRect(0, 0, width, height);

        for(let i = 0; i < 3; i++) {
            let pos = this.windMills[i].pos;
            this.ctx.strokeStyle = "#6C7A89";
            ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(pos.x, pos.y);
            this.ctx.lineTo(pos.x, pos.y-20);
            this.ctx.stroke();

            let pair = 0;
            for(let g = this.windMills[i].rotation; g <= 2*Math.PI+this.windMills[i].rotation; g+=Math.PI/2) {
                this.ctx.beginPath();
                this.ctx.moveTo(pos.x, pos.y-20);
                this.ctx.lineTo(pos.x+Math.sin(g)*8, pos.y-20+Math.cos(g)*8);
                switch(pair) {
                    case 0 : {
                        ctx.fillStyle = "#F64747";
                        this.ctx.lineTo(pos.x + Math.sin(g-Math.PI/4)*8, pos.y-20+Math.cos(g-Math.PI/4)*8);
                        break;
                    }
                    case 1 : {
                        ctx.fillStyle = "#F7CA18";
                        this.ctx.lineTo(pos.x + Math.sin(g-Math.PI/4) * 8, pos.y-20+Math.cos(g-Math.PI/4)*8);
                        break;
                    }
                    case 2 : {
                        ctx.fillStyle = "#2574A9";
                        this.ctx.lineTo(pos.x + Math.sin(g-Math.PI/4) * 8, pos.y-20+Math.cos(g-Math.PI/4)*8);
                        break;
                    }
                    case 3 : {
                        ctx.fillStyle = "#03A678";
                        this.ctx.lineTo(pos.x + Math.sin(g-Math.PI/4) * 8, pos.y-20+Math.cos(g-Math.PI/4) * 8);
                        break;
                    }
                }
                this.ctx.closePath();
                this.ctx.fill();
                pair = (pair+1)%4;
            }
            this.windMills[i].windy();
        }

        ctx.save();
        this.smokes.forEach(function(smoke) {
            ctx.globalAlpha = 0.025 - smoke.pos.distance(new Vector(width/2-5*smoke.scale, height/2-185))/(height/2-185)/40;
            ctx.drawImage(image, smoke.pos.x, smoke.pos.y, 5*smoke.scale, 5*smoke.scale);
            smoke.act();
        });
        ctx.restore();
    }

    requestAnimationFrame(this.draw.bind(this));
};
