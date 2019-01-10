export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add = (vector) => {
        this.x += vector.x;
        this.y += vector.y;
    };

    plus = (vector) => {
        this.x += vector.x;
        this.y += vector.y;
    };

    divide = (vector) => {
        this.x /= vector.x;
        this.y /= vector.y;
    };

    scale = (scale) => {
        return new Vector(this.x * scale * 0.1, this.y * scale);
    };

    distance = (vector) => {
        return Math.sqrt(Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2));
    };

    unitVector = (vector) => {
        let distance = this.distance(vector);

        return new Vector((this.x - vector.x) / distance, (this.y - vector.y) / distance);
    };
};