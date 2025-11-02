if (!localStorage.getItem("produtos-selecionados")) {
  localStorage.setItem("produtos-selecionados", JSON.stringify([]));
}
document.addEventListener("DOMContentLoaded", () => {
  carregarProdutos(produtos);
  atualizaCesto();
});

function carregarProdutos(produtos) {
  const secaoProdutos = document.getElementById("produtos");

  produtos.forEach(produto => {
    const elemento = criarProduto(produto);
    secaoProdutos.appendChild(elemento);
  });
}

function criarProduto(produto) {
  const article = document.createElement("article");
  const titulo = document.createElement("h3");
  const imagem = document.createElement("img");
  const descricao = document.createElement("p");
  const preco = document.createElement("p");
   const botao = document.createElement("button");
  titulo.textContent = produto.title;
  imagem.src = produto.image;
  descricao.textContent = produto.description;
  preco.textContent = produto.price + " €";

  imagem.width = 150;
  botao.textContent="Adicionar ao cesto";

  botao.addEventListener('click', ()=>{
   let cesto = JSON.parse(localStorage.getItem("produtos-selecionados"));
cesto.push(produto);
localStorage.setItem("produtos-selecionados", JSON.stringify(cesto));
 atualizaCesto();
  });

  article.appendChild(imagem);
  article.appendChild(titulo);
  article.appendChild(descricao);
  article.appendChild(preco);
  article.appendChild(botao);
  return article;
}
function atualizaCesto() {
  const listaCesto = document.getElementById("lista-cesto");
  const totalCesto = document.getElementById("total-cesto");

  let cesto = JSON.parse(localStorage.getItem("produtos-selecionados"));

  listaCesto.innerHTML = "";

  cesto.forEach((produto, index) => {
    const li = document.createElement("li");
    const artigo = document.createElement("article");
    const titulo = document.createElement("h3");
    const imagem = document.createElement("img");
    const preco = document.createElement("p");
    const botaoRemover = document.createElement("button");

    titulo.textContent = produto.title;
    imagem.src = produto.image;
    imagem.width = 100;
    preco.textContent = produto.price + " €";
    botaoRemover.textContent = "Remover";

    botaoRemover.addEventListener("click", () => {
      cesto.splice(index, 1);
      localStorage.setItem("produtos-selecionados", JSON.stringify(cesto));
      atualizaCesto();
    });

    artigo.appendChild(imagem);
    artigo.appendChild(titulo);
    artigo.appendChild(preco);
    artigo.appendChild(botaoRemover);

    li.appendChild(artigo);
    listaCesto.appendChild(li);
  });

  // ✅ Total
  const total = cesto.reduce((soma, produto) => soma + produto.price, 0);
  totalCesto.innerHTML = `<strong>Total: ${total.toFixed(2)} €</strong>`;
}


function removerDoCesto(index) {
  let cesto = JSON.parse(localStorage.getItem("produtos-selecionados"));
  cesto.splice(index, 1); // 
  localStorage.setItem("produtos-selecionados", JSON.stringify(cesto));
  atualizarCesto();
}
