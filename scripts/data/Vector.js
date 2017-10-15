/**
 * Created by Cchiv on 13/10/2017.
 */
function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.add = function(vector) {
    this.x += vector.x;
    this.y += vector.y;
};

Vector.prototype.plus = function(vector) {
    this.x += vector.x;
    this.y += vector.y;
};

Vector.prototype.divide = function(vector) {
    this.x /= vector.x;
    this.y /= vector.y;
};

Vector.prototype.scale = function(scale) {
    return new Vector(this.x*scale, this.y*scale);
};

Vector.prototype.distance = function(vector) {
    return Math.sqrt(Math.pow(this.x-vector.x, 2) + Math.pow(this.y-vector.y, 2));
};

Vector.prototype.unitVector = function(vector) {
    let distance = this.distance(vector);
    return new Vector((this.x-vector.x)/distance, (this.y-vector.y)/distance);
};