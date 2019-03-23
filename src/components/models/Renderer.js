export default class Renderer {
    constructor(rootAnimation) {
        this.renderer = null;
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        rootAnimation.current.appendChild(this.canvas);
    }

    adapt = (viewPortWidth, viewPortHeight) => {
        this.viewPortWidth = viewPortWidth;
        this.viewPortHeight = viewPortHeight;

        this.canvas.width = this.viewPortWidth;
        this.canvas.height = this.viewPortHeight;
    }
};