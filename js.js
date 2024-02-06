const sonidos = ["1.mp3", "2.mp3", "3.mp3", "4.mp3"];
const botones=["boton1","boton2","boton3","boton4"];
const color=["palevioletred","royalblue","palegreen","lightgoldenrodyellow"];
const colorA=["red","blue","green","yellow"];
const user=[];
var turno = "pc";var finalizar = 0;var contar = 0;var l=0;var seInicio = 0;
var bloquearBtnReiniciar = 0;
let v = [generarIndiceSonido()];

document.getElementById("puntos").innerHTML = "<h2 style='color:orange'>Correcto: " + contar+ "</h2>";
function reproducirSonido(src) {
    const audio = new Audio(src);
    audio.play();
}

function Reiniciar(){
  if(bloquearBtnReiniciar == 1){
    seInicio = 0;
    finalizar = 0;
    v.length=0;
    v=[generarIndiceSonido()];
    turno='pc';
    contar=0;
    document.getElementById("puntos").innerHTML = "<h2 style='color:orange'>Correcto: " + contar+ "</h2>";
    iniciar();
    bloquearBtnReiniciar = 0;
  }
}

function generarIndiceSonido() {
    return Math.floor(Math.random() * 4);
}

function iniciar(){
  if(seInicio==0){
    tocar(-1);
    seInicio=1;
  }
}

function tocar(ind) {
  if(finalizar == 0){
    if(turno == "pc"){
      for (let i = 0; i < v.length; i++) {
      (function (indice) {
          setTimeout(function () {
              encenderLeds(botones[v[indice]], color[v[indice]]);
              reproducirSonido(sonidos[v[indice]]);

              setTimeout(function () {
                  colorAnterior(botones[v[indice]], colorA[v[indice]]);
              }, 400);
          }, 1000 * (indice + 1));  // Multiplicamos por (indice + 1) para aumentar el retraso en cada iteración
      })(i);
  }
      //console.log("usuario<br>");
      user.length = 0;l=0;
      turno = "usuario";
    }else if(user.length<=v.length){
      //console.log("mas mam "+user.length+"    una "+v.length+"<br>");
          user.push(ind);
          comprobar2(l);
          l++;
          if(finalizar == 0){
            setTimeout(function () {
                encenderLeds(botones[ind],color[ind]);
                reproducirSonido(sonidos[ind]);
                    setTimeout(function () {
                          colorAnterior(botones[ind],colorA[ind]);
                    }, 400 );
            }, 500 );
          }
    }
  }
}
function comprobar2(indez){
  var corre = 0;
  if(user[indez] == v[indez]){
    corre++;
  }
  if(corre>0){
    if(user.length == v.length){
      finUser = "finalizoCorrecto";
      turno = "pc";
      contar++;
      rellamar();
    }
  }else{
    finUser = "error";
    finalizar = 1;
    reproducirSonido("error.wav");
    setTimeout(function () {
        alert("Perdiste");}, 400 );
    seInicio = 0;
    bloquearBtnReiniciar = 1;
  }
}

function rellamar(){
  setTimeout(function () {
    v.push(generarIndiceSonido());
    tocar(-1);
    document.getElementById("puntos").innerHTML = "<h2 style='color:orange'>Correcto: " + contar+ "</h2>";
}, 1000 );

}
function boton1(){
  if(seInicio==1){
    tocar(0);
  }
}
function boton2(){
  if(seInicio==1){
    tocar(1);
  }
}
function boton3(){
  if(seInicio==1){
    tocar(2);
  }
}
function boton4(){
  if(seInicio==1){
    tocar(3);
  }
}
function encenderLeds(id,col){
  var boton = document.getElementById(id);
   // Cambiar el color a rojo
   boton.style.backgroundColor = col;
}
function colorAnterior(id,colA){
  var boton = document.getElementById(id);
  boton.style.backgroundColor = colA;
}
