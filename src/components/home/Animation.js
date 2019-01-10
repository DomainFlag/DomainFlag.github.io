import * as THREE from 'three';

const WOBBLE_EFFECT = 0.05;

let render = (rootAnimation, viewPortWidth, viewPortHeight) => {
    new CanvasDisplay(rootAnimation, viewPortWidth, viewPortHeight);
};

let threeCubeAnimation = (rootAnimation) => {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    let renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    rootAnimation.appendChild(renderer.domElement);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshLambertMaterial({ color: 0x901000 });
    let cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    let animate = function () {
        requestAnimationFrame( animate );

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    };

    animate();
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
    constructor(canvasDisplay, index) {
        this.canvasDisplay = canvasDisplay;

        this.positionX = Math.ceil(Math.random() * this.canvasDisplay.viewPortWidth);
        this.positionY = Math.ceil(Math.random() * this.canvasDisplay.viewPortHeight);
        this.maxRadius = Math.random() * 3 + 1.5;
        this.radius = 0.0;

        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];

        this.life = Math.floor(Math.random() * 100 + 200);
        this.maturity = "young";
        this.index = index;
    }

    act = () => {
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

    lifeCycle = () => {
        this.canvasDisplay.stars[this.index] = new Star(this.canvasDisplay, this.index);
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

class CanvasDisplay {
    constructor(rootAnimation, viewPortWidth, viewPortHeight) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        rootAnimation.current.appendChild(this.canvas);

        this.backgroundCanvas = document.createElement("canvas");
        this.backgroundCtx = this.backgroundCanvas.getContext("2d");

        rootAnimation.current.appendChild(this.backgroundCanvas);

        this.viewPortWidth = viewPortWidth;
        this.viewPortHeight = viewPortHeight;

        this.setCanvasDimensions();

        this.stars = [];

        for(let i = 0; i < 75; i++) {
            this.stars.push(new Star(this, i));
        }

        this.createBackgroundStyle(this.backgroundCtx);
        this.renderAnimations(this.ctx);
    }

    setCanvasDimensions = () => {
        this.canvas.width = this.viewPortWidth;
        this.canvas.height = this.viewPortHeight;

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

        for(let i = 0; i < 15; i += (Math.random() * 2 + 1)) {
            ctx.lineTo(this.viewPortWidth / 10 * i, (this.viewPortHeight - (Math.random() * 80 + 40)));
        }

        ctx.lineTo(this.viewPortWidth, this.viewPortHeight - 120);
        ctx.lineTo(this.viewPortWidth, this.viewPortHeight);

        ctx.lineTo(0, this.viewPortHeight);
        ctx.closePath();

        ctx.fill();
    };

    renderAnimations = (ctx) => {
        if(render) {
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.clearRect(0, 0, this.viewPortWidth, this.viewPortHeight);

            ctx.fillStyle = "#ecf0f1";
            this.stars.forEach(function(star) {
                star.render(ctx);
            }, this);

            ctx.restore();
            ctx.fill();
        }

        requestAnimationFrame(this.renderAnimations.bind(this, ctx));
    };
}

export default render;