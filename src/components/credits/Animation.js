import Vector from "./../models/Vector";

import smokePath from "./../../resources/credits/smoke.png";
import Renderer from "../models/Renderer";

let animator = (rootAnimation, pivot, viewPortWidth, viewPortHeight) => {
    return new Land(rootAnimation, pivot, viewPortWidth, viewPortHeight);
};

class Smoke {

    static size = 12;
    static growth = 6;
    static offset = 23;
    static alpha = 0.025;

    set = (width, height, ratio) => {
        this.width = width;
        this.height = height;
        this.ratio = ratio;
        this.scale = Smoke.size + Math.random() * Smoke.size;
        this.origin = new Vector(
            this.width / 2 - this.scale / 2,
            this.height / 2 - this.width * 0.115 / this.ratio
        );

        let sign = Math.random() < 0.5 ? -1 : 1;

        let y = Math.random() * (this.height / 2 - this.width * 0.115 / ratio);
        let x = this.width / 2 - this.scale / 2 + sign * ((this.height / 2 - y) * Math.tan(Math.random() / 10));

        this.pos = new Vector(x, y);
        this.velocity = new Vector(Math.random() / 10 - 0.05, - (0.1 + Math.random() / 8));
    };

    act = () => {
        if(this.pos.y < 0) {
            this.pos.copy(this.origin);
        } else {
            this.pos.add(this.velocity);
        }
    };

    render = (ctx, smoke) => {
        // Smoke.alpha when close to center and 0 when out
        ctx.globalAlpha = Math.max(0, Smoke.alpha * (this.pos.y / this.origin.y));
        ctx.drawImage(smoke, this.pos.x, this.pos.y, this.scale, this.scale);

        this.act();
    };
}


class Windmill {

    static colors = ["#F64747", "#F7CA18", "#2574A9", "#03A678"];
    static spin = 0.03 + Math.random() / 80;

    set = (x, y) => {
        this.pos = new Vector(x, y);
        this.rotation = 0;
        this.size = 8;
        this.len = 18;
    };

    act = () => {
        this.rotation = (this.rotation + Windmill.spin) % (2 * Math.PI);
    };

    render = (ctx) => {
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(this.pos.x, this.pos.y - this.len);
        ctx.stroke();

        let rot = this.rotation;
        for(let g = 0; g < 4; g++) {
            ctx.fillStyle = Windmill.colors[g];

            ctx.beginPath();
            ctx.moveTo(this.pos.x, this.pos.y - this.len);
            ctx.lineTo(this.pos.x + Math.sin(rot) * this.size, this.pos.y - this.len + Math.cos(rot) * this.size);
            ctx.lineTo(this.pos.x + Math.sin(rot - Math.PI / 4) * this.size, this.pos.y - this.len + Math.cos(rot - Math.PI / 4) * this.size);
            ctx.closePath();
            ctx.fill();

            rot += Math.PI / 2;
        }

        this.act();
    };
}

class Land extends Renderer {

    static smokesCount = 125;
    static windmillsCoord = [
        [-120, -40],
        [120, -20],
        [-10, -50]
    ];

    constructor(rootAnimation) {
        super(rootAnimation);

        this.smokes = [];
        for(let i = 0; i < Land.smokesCount; i++) {
            let smoke = new Smoke();

            this.smokes.push(smoke);
        }

        this.windmills = [];
        for(let i = 0; i  < Land.windmillsCoord.length; i++) {
            let windmill = new Windmill();

            this.windmills.push(windmill);
        }

        this.smokeImage = new Image();
        this.smokeImage.src = smokePath;
    };

    render = (viewPortWidth, viewPortHeight, pivot) => {
        this.adapt(viewPortWidth, viewPortHeight);

        let width = pivot.current.clientWidth / 2;
        let ratio = 190 / width * viewPortWidth / 1520;

        let w = this.viewPortWidth / 2;
        let y = this.viewPortHeight / 2;

        for(let i = 0; i < this.smokes.length; i++) {
            this.smokes[i].set(this.viewPortWidth, this.viewPortHeight, ratio);
        }

        for(let i = 0; i  < this.windmills.length; i++) {
            let coord = Land.windmillsCoord[i];

            this.windmills[i].set(w + coord[0] * ratio, y + coord[1]);
        }

        if(this.renderer != null) {
            cancelAnimationFrame(this.renderer);

            this.renderer = null;
        }

        if(!this.smokeImage.complete) {
            this.smokeImage.addEventListener("load", () => {
                this.renderAnimations(this.ctx);
            });
        } else {
            this.renderAnimations(this.ctx);
        }
    };

    renderAnimations = (ctx) => {
        ctx.clearRect(0, 0, this.viewPortWidth, this.viewPortHeight);

        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = "#A39381";
        ctx.lineWidth = 1;

        for(let g = 0; g < this.windmills.length; g++)
            this.windmills[g].render(ctx);

        for(let g = 0; g < this.smokes.length; g++)
            this.smokes[g].render(ctx, this.smokeImage);

        this.renderer = requestAnimationFrame(this.renderAnimations.bind(this, ctx));
    }
}

export default animator;