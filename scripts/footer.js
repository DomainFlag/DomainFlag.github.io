let height = document.querySelector("#footer").clientHeight;

let width = Math.max( body.scrollWidth, body.offsetWidth,
    html.clientWidth, html.scrollWidth, html.offsetWidth );

let image = document.createElement("img");
image.src = "./assets/images/footer/Smoke.png";

function Smoke() {
    this.scale = 1+Math.random()*4;
    let y = Math.random()*(height/2-width*0.11);
    let sign = Math.random() < 0.5 ? -1 : 1;
    let x = width/2-4*this.scale+sign*((height/2-y)*Math.tan(Math.random()/10));
    this.pos = new Vector(x, y);
    this.velocity = new Vector(Math.random()/10-0.05, -(0.1+Math.random()/8));
}

Smoke.prototype.act = function() {
    if(this.pos.distance(new Vector(width/2-5*this.scale, height/2-width*0.11)) > (height/2-width*0.11)) {
        this.pos.y = height/2-width*0.11;
        this.pos.x = width/2-4*this.scale;
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
    this.windMills.push(new WindMill(width/2-width*0.0088, height/2-0.015*width));
    this.windMills.push(new WindMill(width/2+width*0.082, height/2-0.04*width));
    this.windMills.push(new WindMill(width/2-width*0.079, height/2-0.03*width));

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
            ctx.globalAlpha = 0.025 - smoke.pos.distance(new Vector(width/2-5*smoke.scale, height/2-width*0.11))/(height/2-width*0.11)/40;
            ctx.drawImage(image, smoke.pos.x, smoke.pos.y, 5*smoke.scale, 5*smoke.scale);
            smoke.act();
        });
        ctx.restore();
    }

    requestAnimationFrame(this.draw.bind(this));
};
