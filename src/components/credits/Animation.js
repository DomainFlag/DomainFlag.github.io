import Vector from "./../models/Vector";

import smokePath from "./../../resources/credits/smoke.png";

let render = (rootAnimation, viewPortWidth, viewPortHeight) => {
    new Land(rootAnimation, viewPortWidth, viewPortHeight);
};

class Smoke {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.scale = 1 + Math.random() * 4;

        let sign = Math.random() < 0.5 ? -1 : 1;

        let y = Math.random() * (this.height / 2 - this.width * 0.11);
        let x = this.width / 2 - 4 * this.scale + sign * ((this.height / 2 - y) * Math.tan(Math.random() / 10));

        this.pos = new Vector(x, y);
        this.velocity = new Vector(Math.random() / 10 - 0.05, -(0.1 + Math.random() / 8));
    }

    act = () => {
        if(this.pos.distance(new Vector(this.width / 2 - 5 * this.scale, this.height / 2 - this.width * 0.11)) > (this.height / 2 - this.width * 0.11)) {
            this.pos.y = this.height / 2 - this.width * 0.11;
            this.pos.x = this.width / 2 - 4 * this.scale;
        } else {
            this.pos.add(this.velocity);
        }
    };
}


class WindMill {
    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.rotation = 0;
        this.rotationPower = 0.03 + Math.random() / 100;
    }

    act = () => {
        this.rotation = (this.rotation + this.rotationPower) % (2 * Math.PI);
    };
}

class Land {
    constructor(rootAnimation, viewPortWidth, viewPortHeight) {
        this.viewPortWidth = viewPortWidth;
        this.viewPortHeight = viewPortHeight;

        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        rootAnimation.current.appendChild(this.canvas);

        this.smokes = [];
        for(let i = 0; i < 185; i++) {
            this.smokes.push(new Smoke(this.viewPortWidth, this.viewPortHeight));
        }

        this.windMills = [];
        this.windMills.push(new WindMill(this.viewPortWidth / 2 - this.viewPortWidth * 0.0088, this.viewPortHeight / 2 - 0.015 * this.viewPortWidth));
        this.windMills.push(new WindMill(this.viewPortWidth / 2 + this.viewPortWidth * 0.082, this.viewPortHeight / 2 - 0.04 * this.viewPortWidth));
        this.windMills.push(new WindMill(this.viewPortWidth / 2 - this.viewPortWidth * 0.079, this.viewPortHeight / 2 - 0.03 * this.viewPortWidth));

        this.canvas.width = this.viewPortWidth;
        this.canvas.height = this.viewPortHeight;

        this.smokeImage = new Image();
        this.smokeImage.src = smokePath;
        this.smokeImage.addEventListener("load", () => {
            this.renderAnimations(this.ctx);
        });
    }

    renderAnimations = (ctx) => {
        ctx.clearRect(0, 0, this.viewPortWidth, this.viewPortHeight);

        for(let i = 0; i < 3; i++) {
            let pos = this.windMills[i].pos;

            ctx.strokeStyle = "#6C7A89";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            ctx.lineTo(pos.x, pos.y - 20);
            ctx.stroke();

            let pair = 0;
            for(let g = this.windMills[i].rotation; g <= 2*Math.PI+this.windMills[i].rotation; g+=Math.PI/2) {
                ctx.beginPath();
                ctx.moveTo(pos.x, pos.y-20);
                ctx.lineTo(pos.x+Math.sin(g)*8, pos.y-20+Math.cos(g)*8);

                switch(pair) {
                    case 0 : {
                        ctx.fillStyle = "#F64747";
                        ctx.lineTo(pos.x + Math.sin(g-Math.PI/4)*8, pos.y-20+Math.cos(g-Math.PI/4)*8);
                        break;
                    }
                    case 1 : {
                        ctx.fillStyle = "#F7CA18";
                        ctx.lineTo(pos.x + Math.sin(g-Math.PI/4) * 8, pos.y-20+Math.cos(g-Math.PI/4)*8);
                        break;
                    }
                    case 2 : {
                        ctx.fillStyle = "#2574A9";
                        ctx.lineTo(pos.x + Math.sin(g-Math.PI/4) * 8, pos.y-20+Math.cos(g-Math.PI/4)*8);
                        break;
                    }
                    case 3 : {
                        ctx.fillStyle = "#03A678";
                        ctx.lineTo(pos.x + Math.sin(g-Math.PI/4) * 8, pos.y-20+Math.cos(g-Math.PI/4) * 8);
                        break;
                    }
                }

                ctx.closePath();
                ctx.fill();

                pair = (pair + 1) % 4;
            }

            this.windMills[i].act();
        }


        ctx.save();
        this.smokes.forEach((smoke) => {
            ctx.globalAlpha = 0.025 - smoke.pos.distance(new Vector(this.viewPortWidth / 2 - 5 * smoke.scale, this.viewPortHeight / 2 - this.viewPortWidth * 0.11)) / (this.viewPortHeight / 2 - this.viewPortWidth * 0.11) / 40;
            ctx.drawImage(this.smokeImage, smoke.pos.x, smoke.pos.y, 5 * smoke.scale, 5 * smoke.scale);


            smoke.act();
        });

        ctx.restore();

        requestAnimationFrame(this.renderAnimations.bind(this, ctx));
    }
}

export default render;