const canvas=document.getElementById("glcanvas");



const loadShader = (gl, type, source)=>
{
  const shader=gl.createShader(type);
  gl.shaderSource (shader, source)
            //variable que declaramos arriba el tipo, segundo viene del tecer nombre de loasd shader
  //para compilar, porque si no no sabermos si funciona o no 
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  } //si falla que se borre el shader, siempre tine que ir en la compilaicon
return shader;
//si no, regresa el shader ya dicho
  

}



//para inicializar el shader
const initShader = (gl,vsSource, fsSource)=>{

//cargar shaders, aqui se compilan ambos, y se llama dos veces, una para fragment y una para verter
const vertexShader=loadShader(gl, gl.VERTEX_SHADER, vsSource);//se compilan
const fragmentShader=loadShader(gl,gl.FRAGMENT_SHADER,fsSource);

const shaderProgram=gl.createProgram(); //un programa vacio 
gl.attachShader(shaderProgram, vertexShader);//se agrega en el programa shader program, y se pasa primero el vertexshader
gl.attachShader(shaderProgram, fragmentShader);//despues el fragmentshader, pero en el mimso programa
gl.linkProgram(shaderProgram); //para ligar el program al contexto que es gl, ligarlo al proyecto

 // If creating the shader program failed, alert

 if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
  alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
  return null;
 }
}



const initBuffer=gl=>
{
const positionBuffer=gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//la posicion empieza en el centro
const positions = [
  -1.0,  1.0,
   1.0,  1.0,
  -1.0, -1.0,
   1.0, -1.0,
];
gl.bufferData(gl.ARRAY_BUFFER, 
      //agarra una posicion, una lisa de posicion y lo carga como informacion para le buffer de la matriz
  new Float32Array(positions),  // los shaders trabajan con float32

  gl.STATIC_DRAW);//tipo de union, y que va a hacer

return {

position: positionBuffer//devuelve las posiciones 
};
 
}






const main=()=>{
const gl=canvas.getContext("webgl");

if (!gl) {
    alert("Impossible d'initialiser WebGL. Votre navigateur ou votre machine peut ne pas le supporter.");
    return;
  }
const shaderProgram = initShader(gl, vsSource, fsSource);

const programInfo={
  program:shaderProgram,
  attribLocations: {
    vertexPosition : gl.getAttribLocation(shaderProgram, 'aVertexPosition'),//solo se ponen comas 

                      //primer parametro que recibe      la varibale que se va a buscar 
  },
  
  uniformLocations : //modal = como se acomodan,,,,, 
{
  projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
  modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),

}


  //dos puntos para almacenar la caracteristica
};
const buffers=initialBuffer(gl);






gl.clearColor(0,0,0,1);//el color con el que va estar limpiando
gl.clear(gl.COLOR_BUFFER_BIT);
}

window.onload=main;

// Vertex shader program

const vsSource = `         
attribute vec4 aVertexPosition;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;  
  
}
`;

//fragment

const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;


  


