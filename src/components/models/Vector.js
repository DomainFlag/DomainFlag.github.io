export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    copy = (vec) => {
        this.x = vec.x;
        this.y = vec.y;
    };

    add = (vec) => {
        this.x += vec.x;
        this.y += vec.y;
    };

    plus = (vec) => {
        this.x += vec.x;
        this.y += vec.y;
    };

    divide = (vec) => {
        this.x /= vec.x;
        this.y /= vec.y;
    };

    scale = (scale) => {
        return new Vector(this.x * scale * 0.1, this.y * scale);
    };

    distance = (vec) => {
        return Math.sqrt(Math.pow(this.x - vec.x, 2) + Math.pow(this.y - vec.y, 2));
    };

    unitVector = (vec) => {
        let distance = this.distance(vec);

        return new Vector((this.x - vec.x) / distance, (this.y - vec.y) / distance);
    };
};