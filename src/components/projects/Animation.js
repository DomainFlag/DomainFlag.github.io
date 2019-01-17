import Perlin from "../models/Perlin";

let render = (rootAnimation, viewPortWidth, viewPortHeight) => {
    new CanvasDisplay(rootAnimation, viewPortWidth, viewPortHeight);
};

class Grader {
    constructor(perlin, viewPortWidth, viewPortHeight, noiseScale, stepLength) {
        this.perlin = perlin;
        this.noiseScale = noiseScale;

        this.x = Math.random() * viewPortWidth;
        this.y = Math.random() * viewPortHeight;

        this.stepLength = stepLength;
    }

    step = () => {
        let x1 = this.x, y1 = this.y;
        let t = this.perlin.simplex2(this.x * this.noiseScale, this.y * this.noiseScale) * Math.PI * 4;

        this.x = this.x + this.stepLength * Math.cos(t);
        this.y = this.y + this.stepLength * Math.sin(t);

        return {
            x1: x1,
            y1: y1,
            x2: this.x,
            y2: this.y
        }
    };
}

class CanvasDisplay {

    static noiseScale = 0.0005;
    static actorStepLength = 2.0;
    static gradersLength = 750;
    static step = 0;
    static steps = 125;

    constructor(rootAnimation, viewPortWidth, viewPortHeight) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.opacity = this.easeInOut(CanvasDisplay.steps);

        this.noise = new Perlin();

        rootAnimation.current.appendChild(this.canvas);

        this.viewPortWidth = viewPortWidth;
        this.viewPortHeight = viewPortHeight;

        this.setCanvasDimensions();

        this.graders = [];
        for(let i = 0; i < CanvasDisplay.gradersLength; i++) {
            let grader = new Grader(this.noise, this.viewPortWidth, this.viewPortHeight, CanvasDisplay.noiseScale, CanvasDisplay.actorStepLength);

            this.graders.push(grader);
        }

        this.renderAnimations(this.ctx);
    }

    setCanvasDimensions = () => {
        this.canvas.width = this.viewPortWidth;
        this.canvas.height = this.viewPortHeight;
    };

    easeInOut = (steps) => {
        let n = 0;
        let val = 0;

        return {
            step:
                function() {
                    val = 0.5*(1-Math.cos(2 * Math.PI * (n++) / steps));
                },
            get:
                function() {
                    return val;
                }
        };
    };

    renderAnimations = (ctx) => {
        CanvasDisplay.step++;

        if(CanvasDisplay.step < CanvasDisplay.steps) {
            ctx.lineWidth = 1;
            ctx.globalCompositeOperation = 'lighter';
            ctx.beginPath();

            for(let it = 0; it < this.graders.length; it++) {
                let grader = this.graders[it];

                let ln = grader.step();
                let alpha = 0.075 * this.opacity.get();

                ctx.strokeStyle = "rgba(50, 50, 50, " + alpha + ")";
                ctx.moveTo(ln.x1, ln.y1);
                ctx.lineTo(ln.x2, ln.y2);
            }

            ctx.stroke();

            this.opacity.step();

            requestAnimationFrame(this.renderAnimations.bind(this, ctx));
        }
    };
}

export default render;