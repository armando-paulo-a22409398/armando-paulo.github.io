// Eventos para o parágrafo
document.getElementById("ex1").onmouseover = function() { mouseOver() };
document.getElementById("ex1").onmouseout = function() { mouseOut() };
let selectColor = document.getElementById('coresDoFundo');
selectColor.addEventListener('change',function(){
document.getElementById('background').style.backgroundColor=this.value;
});
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
  const mensagem = document.getElementById('mensagem');
  if(nome === "" || idade === "") {
    mensagem.textContent = "Por favor, preencha o nome e idade"
    return;
  }

   mensagem.textContent=`Olá, o ${nome} tem ${idade}!`;
});

function toUpperCaseInput() {
  let x = document.getElementById("fname");
  x.value = x.value.toUpperCase();
}
// Contador
function count() {
    // code here
}

let autoCounter = 0;
const autoHeading = document.getElementById('Automatic');

function countAutomatic() {
  autoCounter++;
  autoHeading.textContent = `7.Automatic Counter: ${autoCounter}`;
}

const manualNumber = document.getElementById('manualNumber');
let manualCounter = parseInt(localStorage.getItem('manualCounter')) || 0;
manualNumber.textContent=manualCounter;
function countManual() {
  manualCounter++;
  manualNumber.textContent = manualCounter;
  localStorage.setItem('manualCounter',manualCounter);
}


setInterval(countAutomatic, 1000);