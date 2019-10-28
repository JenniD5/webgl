const canvas=document.getElementById("glcanvas");
const main=()=>{
const gl=canvas.getContext("webgl");

if (!gl) {
    alert("Impossible d'initialiser WebGL. Votre navigateur ou votre machine peut ne pas le supporter.");
    return;
  }

gl.clearColor(0,0,0,1);//el color con el que va estar limpiando
gl.clear(gl.COLOR_BUFFER_BIT);
}

window.onload=main;