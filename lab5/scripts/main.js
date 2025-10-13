// Eventos para o parágrafo
document.getElementById("ex1").onmouseover = function() { mouseOver() };
document.getElementById("ex1").onmouseout = function() { mouseOut() };
function myFunction() {
  let color = document.getElementById("coresDoFundo").value;
  let z = document.getElementById("background");
  z.style.backgroundColor=color;
}
function mouseOver() {
  document.getElementById("ex1").innerHTML = "1.Obrigado por passares!";
}

function mouseOut() {
  document.getElementById("ex1").innerHTML = "1.Passe por aqui!";
}
function verde(){
   document.getElementById("cores").style.color="green";
}
function vermelho(){
   document.getElementById("cores").style.color="red";
}
function azul(){
   document.getElementById("cores").style.color="blue";
}

function toUpperCaseInput() {
  let x = document.getElementById("fname");
  x.value = x.value.toUpperCase();
}
// Contador
let counter = 0;
const heading = document.querySelector('h1');

function count() {
  counter++;
  heading.textContent = counter;
}
