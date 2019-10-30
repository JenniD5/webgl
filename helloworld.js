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
const vertexShader=loadShader(gl, gl.VERTEX_SHADER, vsSource);
const fragmentShader=loadShader(gl,gl.FRAGMENT_SHADER,fsSource);

}



const main=()=>{
const gl=canvas.getContext("webgl");

if (!gl) {
    alert("Impossible d'initialiser WebGL. Votre navigateur ou votre machine peut ne pas le supporter.");
    return;
  }
initShader(gl, vsSource, vsSource)
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


  


