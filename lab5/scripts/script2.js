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
// Seleciona todos os botões dentro do <p id="cores">
const colorButtons = document.querySelectorAll("#cores button");

// Adiciona evento a cada botão
colorButtons.forEach(button => {
  button.addEventListener("click", function() {
    // Usa o valor do dataset
    let color = this.dataset.color;
    document.getElementById("cores").style.color = color;
  });
});

document.getElementById('submitButton').addEventListener('click', function() {
  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;

  if(nome === "" || idade === "") {
    alert("Por favor, preencha nome e idade.");
    return;
  }

  alert(`Nome: ${nome}\nIdade: ${idade}`);
});

function toUpperCaseInput() {
  let x = document.getElementById("fname");
  x.value = x.value.toUpperCase();
}
// Contador
function count() {
    // code here
}
setInterval(count, 1000);
let counter = 0;
const heading = document.querySelector('h1');

function count() {
  counter++;
  heading.textContent = counter;
}
