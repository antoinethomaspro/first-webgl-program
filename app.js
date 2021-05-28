  var InitDemo = function () {
	console.log('This is working');

	var canvas = document.getElementById('game-surface');
	var gl = canvas.getContext('webgl');

	if (!gl) {
		alert('Your browser does not support WebGL');
	}


  // Get the strings for our GLSL shaders
  var vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
  var fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;
  console.log(vertexShaderSource);

  // create GLSL shaders, upload the GLSL source, compile the shaders
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  // Link the two shaders into a program
  var program = createProgram(gl, vertexShader, fragmentShader);

  // look up where the vertex data needs to go
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  var colorAttributeLocation = gl.getAttribLocation(program, "vertColor");


  // Create a buffer and put three 2d clip space points in it
  var positionBuffer = gl.createBuffer();

  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // three 2d points
  var positions = [
    -1, 0, 1.0, 1.0, 0.0,
    0, 0.5, 0.7, 0.0, 1.0,
    0.7, 0, 0.1, 1.0, 0.6
  ];

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  

  // code above this line is initialization code.
  // code below this line is rendering code.

  
	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

   // Tell it to use our program (pair of shaders)
   gl.useProgram(program);

   // Turn on the attribute
   gl.enableVertexAttribArray(positionAttributeLocation);
   gl.enableVertexAttribArray(colorAttributeLocation);
 
   
 
   // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
   gl.vertexAttribPointer(
        positionAttributeLocation, //Attribute location
        2, // Number of elements per attribute
        gl.FLOAT, //Type of elements
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,//size of an individual vertext
        0 //offset from the beginning of a single vertex to this attribute
   );
   gl.vertexAttribPointer(
        colorAttributeLocation, //Attribute location
        3, // Number of elements per attribute
        gl.FLOAT, //Type of elements
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,//size of an individual vertext
        2 * Float32Array.BYTES_PER_ELEMENT //offset from the beginning of a single vertex to this attribute
  );

 
   // draw
   var primitiveType = gl.TRIANGLES;
   var offset = 0; //how many vertex with skip
   var count = 3; //how many vertex we draw
   gl.drawArrays(primitiveType, offset, count);


};

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
 
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}
