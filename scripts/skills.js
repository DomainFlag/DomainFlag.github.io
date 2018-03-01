/**
 * Created by Cchiv on 04/10/2017.
 */
let canvasSkills = document.querySelector("#skills_background");
let gl = canvasSkills.getContext("webgl");

canvasSkills.width = 125;
canvasSkills.height = 125;

let vertexShaderSource = `
attribute vec2 a_position;
varying vec2 v_texCoord;
uniform mat3 u_matrix;
void main() {
    vec3 rotated = u_matrix*vec3(a_position, 1);
    gl_Position = vec4(rotated, 1);
    v_texCoord = (a_position + 1.0)/2.0;
}`;

let fragmentShaderSource = `
precision mediump float;
uniform sampler2D u_image;
varying vec2 v_texCoord;
void main() {
    gl_FragColor = texture2D(u_image, v_texCoord);
}
`;

function resize(gl) {
    let realToCSSPixels = window.devicePixelRatio;


    let displayWidth  = Math.floor(gl.canvas.clientWidth  * realToCSSPixels);
    let displayHeight = Math.floor(gl.canvas.clientHeight * realToCSSPixels);

    if (gl.canvas.width  !== displayWidth ||
        gl.canvas.height !== displayHeight) {

        gl.canvas.width  = displayWidth;
        gl.canvas.height = displayHeight;
    }
}

function createShader(gl, type, source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(success)
        return shader;
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if(success)
        return program;
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

let positions = [
    -1.0, -1.0,
    1.0, -1.0,
    -1.0, 1.0,
    -1.0, 1.0,
    1.0, 1.0,
    1.0, -1.0
];

function Matrix() {
    this.angle = 0;
    this.rotate();
}

Matrix.prototype.rotate = function() {
    this.angle += 0.3;
    this.angle = this.angle % 360;
    let c = Math.cos(this.angle/360*2*Math.PI);
    let s = Math.sin(this.angle/360*2*Math.PI);
    this.mat = [
        c, -s, 0,
        s, c, 0,
        0, 0, 1
    ];
};

let rotationMatrix = new Matrix();

let wheel = document.createElement("img");
wheel.src = "./assets/images/skills/wheel.png";
wheel.addEventListener("load", function(e) {
    if(gl) setScene();
});


function setScene() {
    resize(gl);
    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    let program = createProgram(gl, vertexShader, fragmentShader);

    let vertexPositionLocation = gl.getAttribLocation(program, "a_position");
    let matrixRotationLocation = gl.getUniformLocation(program, "u_matrix");

    let buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    gl.useProgram(program);
    gl.enableVertexAttribArray(vertexPositionLocation);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE,);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE,);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, wheel);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);

    gl.vertexAttribPointer(vertexPositionLocation, 2, gl.FLOAT, false, 0, 0);
    drawScene(matrixRotationLocation);
}

function drawScene(matrixRotationLocation) {
    gl.uniformMatrix3fv(matrixRotationLocation, false, new Float32Array(rotationMatrix.mat));
    rotationMatrix.rotate();
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(drawScene.bind(this, matrixRotationLocation));
}