/**
 * Created by Cchiv on 04/10/2017.
 */
let canvasSkills = document.querySelector("#skills_background");
let gl = canvasSkills.getContext("webgl");

canvasSkills.width = 125;
canvasSkills.height = 125;

let vertexShaderSource = `
attribute vec4 a_position;
varying vec2 v_texCoord;
uniform mat4 u_matrix;
void main() {
    vec4 rotated = u_matrix*a_position;
    gl_Position = vec4(rotated.xyz, 1.0);
    v_texCoord = (a_position.xy + 1.0)/2.0;
}`;

let fragmentShaderSource = `
precision mediump float;
uniform sampler2D u_image;
varying vec2 v_texCoord;
void main() {
    gl_FragColor = vec4(1.0, 0, 0, 1.0);
}
`;
// gl_Position = vec4(rotated.xyz, 1.0);
// gl_FragColor = texture2D(u_image, v_texCoord);

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

function Wheel() {
    this.length = 0.2;
    this.height = 0.1;
    this.positions = [
        //Left Front Wheel Comp
        -1, this.length, 0,
        -1, -this.length, this.length,
        -1, -this.length, 0,

        -1, -this.length, this.length,
        -1, this.length, 0,
        -1, this.length, this.length,

        //Front Wheel Comp
        -1, -this.length, 0,
        -1+this.length, -2*this.length, 0,
        -1, this.length, 0,

        -1+this.length, -2*this.length, 0,
        -1+this.length, 2*this.length, 0,
        -1, this.length, 0,

        //Back Wheel Comp
        -1, -this.length, this.length,
        -1, this.length, this.length,
        -1+this.length, -2*this.length, this.length,

        -1+this.length, -2*this.length, this.length,
        -1, -this.length, this.length,
        -1+this.length, 2*this.length, this.length,

        //Front/Back Bottom Wheel Comp
        -1, this.length, 0,
        -1+this.length, 2*this.length, 0,
        -1+this.length, 2*this.length, this.length,

        -1+this.length, 2*this.length, this.length,
        -1, this.length, 0,
        -1, this.length, this.length,

        //Front/Back Top Wheel Comp
        -1, -this.length, 0,
        -1+this.length, -2*this.length, 0,
        -1+this.length, -2*this.length, this.length,

        -1+this.length, -2*this.length, this.length,
        -1, -this.length, -this.length,
        -1, -this.length, 0
    ];
}

function Matrix() {
    this.angle = 0;
    this.rotate();
}

Matrix.prototype.rotate = function(angle) {
    this.angle += angle;
    this.angle = this.angle % 360;
    let c = Math.cos(this.angle/360*2*Math.PI);
    let s = Math.sin(this.angle/360*2*Math.PI);
    this.mat = [
        c, s, 0, 0,
        -s, c, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];
};

let rotationMatrix = new Matrix();
let wheel = new Wheel();

let vertexPositionLocation;

// setScene(gl);
function setScene() {
    resize(gl);
    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    let program = createProgram(gl, vertexShader, fragmentShader);

    vertexPositionLocation = gl.getAttribLocation(program, "a_position");
    let matrixRotationLocation = gl.getUniformLocation(program, "u_matrix");

    let buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(wheel.positions), gl.STATIC_DRAW);

    gl.useProgram(program);
    gl.enableVertexAttribArray(vertexPositionLocation);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.CULL_FACE);
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.DEPTH_TEST);

    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.canvas.width, gl.canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);

    let fb = gl.createFramebuffer();

    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

    gl.vertexAttribPointer(vertexPositionLocation, 3, gl.FLOAT, false, 0, 0);
    drawScene(matrixRotationLocation, fb);
}

function drawToTheTexture(matrixRotationLocation) {
    for(let g = 0; g < 4; g++) {
        rotationMatrix.rotate(Math.PI/2);
        gl.uniformMatrix4fv(matrixRotationLocation, false, new Float32Array(rotationMatrix.mat));
        gl.drawArrays(gl.TRIANGLES, 0, wheel.positions.length/3);
    }
}

function drawScene(matrixRotationLocation, fb) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(wheel.positions), gl.STATIC_DRAW);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    drawToTheTexture(matrixRotationLocation);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    gl.uniformMatrix4fv(matrixRotationLocation, false, new Float32Array(rotationMatrix.mat));
    rotationMatrix.rotate(0.3);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1]), gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(drawScene.bind(this, matrixRotationLocation, fb));
}