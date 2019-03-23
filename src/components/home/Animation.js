import Renderer from "../models/Renderer";

const WOBBLE_EFFECT = 0.05;

let animator = (rootAnimation) => {
    return new Night(rootAnimation);
};

class Color {
    constructor(hue, saturation, lightness) {
        this.hue = hue;
        this.saturation = saturation;
        this.lightness = lightness;
    }

    fillStyle = (ctx) => {
        ctx.fillStyle = "hsl(" + this.hue + ", " + this.saturation + "%, " + this.lightness + "%)";
    }
}

const COLORS = [new Color(3, 97, 75), new Color(192, 15.2, 93.5), new Color(281, 46.2, 74.5)];

class Star {

    set = (viewPortWidth, viewPortHeight) => {
        this.viewPortWidth = viewPortWidth;
        this.viewPortHeight = viewPortHeight;

        this.positionX = Math.ceil(Math.random() * viewPortWidth);
        this.positionY = Math.ceil(Math.random() * viewPortHeight);
        this.maxRadius = Math.random() * 2.15 + 1.15;
        this.radius = 0.0;

        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];

        this.life = Math.floor(Math.random() * 100 + 200);
        this.maturity = "young";
    };

    act = () => {
        if(this.maturity === "young") {
            this.lighting();
        } else if(this.maturity === "mature") {
            this.wobbling();
        } else if(this.maturity === "old") {
            this.dimming();
        } else {
            this.set(this.viewPortWidth, this.viewPortHeight);
        }
    };

    lighting = () => {
        this.radius += this.maxRadius / 30;
        if(this.radius > this.maxRadius) {
            this.maturity = "mature";
        }
    };

    dimming = () => {
        this.radius -= this.maxRadius / 30;
        if(this.radius < 0) {
            this.maturity = "dying"
        }
    };

    wobbling = () => {
        this.radius = this.radius + Math.random() / 10 - WOBBLE_EFFECT;
        this.life -= 1;

        if(this.life === 0)
            this.maturity = "old";
    };

    render = (ctx) => {
        this.color.fillStyle(ctx);

        ctx.beginPath();
        ctx.moveTo(this.positionX, this.positionY);

        for(let i = 0.0; i <= 2 * Math.PI; i += Math.PI / 2) {
            ctx.quadraticCurveTo(this.positionX, this.positionY,
                this.positionX + Math.cos(i) * this.radius, this.positionY + Math.sin(i) * this.radius);
        }

        ctx.closePath();
        ctx.fill();

        this.act();
    }
}

class Night extends Renderer {
    constructor(rootAnimation) {
        super(rootAnimation);

        this.backgroundCanvas = document.createElement("canvas");
        this.backgroundCtx = this.backgroundCanvas.getContext("2d");

        rootAnimation.current.appendChild(this.backgroundCanvas, rootAnimation.current.lastChild);

        this.stars = [];
        for(let i = 0; i < 125; i++) {
            let star = new Star();

            this.stars.push(star);
        }

        this.thread = [];
        for(let i = 0; i < 15; i += (Math.random() * 2 + 1)) {
            this.thread.push({
                index : i,
                height : Math.random()
            });
        }
    };

    render = (viewPortWidth, viewPortHeight) => {
        this.adapt(viewPortWidth, viewPortHeight);
        this.setCanvasDimensions();

        for(let i = 0; i < this.stars.length; i++) {
            this.stars[i].set(viewPortWidth, viewPortHeight);
        }

        this.createBackgroundStyle(this.backgroundCtx);

        if(this.renderer != null) {
            cancelAnimationFrame(this.renderer);
        }

        this.renderAnimations(this.ctx);
    };

    setCanvasDimensions = () => {
        this.backgroundCanvas.width = this.viewPortWidth;
        this.backgroundCanvas.height = this.viewPortHeight;
    };

    createBackgroundStyle = (ctx) => {
        ctx.clearRect(0, 0, this.viewPortWidth, this.viewPortHeight);

        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.shadowBlur = 40;
        ctx.shadowColor = "rgba(255, 255, 255, 0.4)";

        ctx.beginPath();

        ctx.moveTo(0, this.viewPortHeight - 500);

        for(let i = 0; i < this.thread.length; i++) {
            ctx.lineTo(this.viewPortWidth / 10 * this.thread[i].index, (this.viewPortHeight - (this.thread[i].height * 80 + 40)));
        }

        ctx.lineTo(this.viewPortWidth, this.viewPortHeight - 120);
        ctx.lineTo(this.viewPortWidth, this.viewPortHeight);

        ctx.lineTo(0, this.viewPortHeight);
        ctx.closePath();

        ctx.fill();
    };

    renderAnimations = (ctx) => {
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        ctx.clearRect(0, 0, this.viewPortWidth, this.viewPortHeight);

        ctx.fillStyle = "#ecf0f1";
        this.stars.forEach(function(star) {
            star.render(ctx);
        }, this);

        ctx.restore();
        ctx.fill();

        this.renderer = requestAnimationFrame(this.renderAnimations.bind(this, ctx));
    };
}

export default animator;