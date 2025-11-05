
if (!localStorage.getItem("produtos-selecionados")) {
  localStorage.setItem("produtos-selecionados", JSON.stringify([]));
}

let produtos = [];

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  loadCategorias();
  criarFiltrosPesquisaOrdenacao();
  atualizarCesto();
});


function loadProducts() {
  fetch('https://deisishop.pythonanywhere.com/products')
    .then(res => res.json())
    .then(data => {
      produtos = data;
      carregarProdutos(produtos);
    })
    .catch(err => console.error("Erro ao carregar produtos:", err));
}

function carregarProdutos(lista) {
  const secaoProdutos = document.getElementById("produtos");
  secaoProdutos.innerHTML = "<h2>Selecione os produtos</h2>";

  lista.forEach(produto => {
    const elemento = criarProduto(produto);
    secaoProdutos.appendChild(elemento);
  });
}


function criarProduto(produto) {
  const article = document.createElement("article");

  const titulo = document.createElement("h3");
  const imagem = document.createElement("img");
  const preco = document.createElement("p");
  const botao = document.createElement("button");

  titulo.textContent = produto.title;
  imagem.src = produto.image;
  imagem.width = 140;
  preco.textContent = produto.price + " €";
  botao.textContent = "+ Adicionar ao cesto";

  botao.addEventListener("click", () => {
    let cesto = JSON.parse(localStorage.getItem("produtos-selecionados"));
    cesto.push(produto);
    localStorage.setItem("produtos-selecionados", JSON.stringify(cesto));
    atualizarCesto();
  });

  article.append(imagem, titulo, preco, botao);
  return article;
}


function loadCategorias() {
  fetch('https://deisishop.pythonanywhere.com/categories')
    .then(res => res.json())
    .then(categorias => {
      const select = document.createElement("select");
      select.id = "filtroCategoria";
      select.innerHTML =
        `<option value="">Todas</option>` +
        categorias.map(cat => `<option value="${cat}">${cat}</option>`).join("");

      document.querySelector("header").appendChild(select);
      select.addEventListener("change", aplicarFiltros);
    });
}

// --- Criar input pesquisa e ordenação ---
function criarFiltrosPesquisaOrdenacao() {
  const inputPesquisa = document.createElement("input");
  inputPesquisa.id = "pesquisa";
  inputPesquisa.placeholder = "Pesquisar por nome...";

  const selectOrdenar = document.createElement("select");
  selectOrdenar.id = "ordenarPreco";
  selectOrdenar.innerHTML = `
    <option value="">Ordenar por preço</option>
    <option value="asc">Mais barato</option>
    <option value="desc">Mais caro</option>
  `;

  document.querySelector("header").append(inputPesquisa, selectOrdenar);

  inputPesquisa.addEventListener("input", aplicarFiltros);
  selectOrdenar.addEventListener("change", aplicarFiltros);
}


function aplicarFiltros() {
  let lista = [...produtos];

  const categoria = document.getElementById("filtroCategoria")?.value;
  if (categoria) lista = lista.filter(p => p.category === categoria);

  const pesquisa = document.getElementById("pesquisa").value.toLowerCase();
  lista = lista.filter(p => p.title.toLowerCase().includes(pesquisa));

  const ordem = document.getElementById("ordenarPreco").value;
  if (ordem === "asc") lista.sort((a, b) => a.price - b.price);
  if (ordem === "desc") lista.sort((a, b) => b.price - a.price);

  carregarProdutos(lista);
}


function atualizarCesto() {
  const listaCesto = document.getElementById("lista-cesto");
  const totalCesto = document.getElementById("total-cesto");
  listaCesto.innerHTML = "";

  let cesto = JSON.parse(localStorage.getItem("produtos-selecionados"));

  cesto.forEach((produto, index) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const nome = document.createElement("p");
    const preco = document.createElement("p");
    const botao = document.createElement("button");

    img.src = produto.image;
    img.width = 60;
    nome.textContent = produto.title;
    preco.textContent = produto.price + " €";
    botao.textContent = "Remover";

    botao.addEventListener("click", () => {
      cesto.splice(index, 1);
      localStorage.setItem("produtos-selecionados", JSON.stringify(cesto));
      atualizarCesto();
    });

    li.append(img, nome, preco, botao);
    listaCesto.appendChild(li);
  });

  const total = cesto.reduce((soma, p) => soma + p.price, 0);
  totalCesto.innerHTML = `<strong>Total: ${total.toFixed(2)} €</strong>`;
}

document.getElementById("finalizarCompra").addEventListener("click", abrirCheckout);

function abrirCheckout() {
  const div = document.getElementById("checkout");

  div.innerHTML = `
    <h3>Checkout</h3>
    
    <label><input type="checkbox" id="estudante"> Sou estudante</label>
    <br><br>

    <input id="cupao" type="text" placeholder="Cupão de desconto">
    <br><br>

    <button id="confirmarCompra">Confirmar compra</button>

    <p id="mensagemPagamento"></p>
  `;

  document.getElementById("confirmarCompra").addEventListener("click", fazerPagamento);
}
function fazerPagamento() {
  const cesto = JSON.parse(localStorage.getItem("produtos-selecionados"));

  if (!cesto.length) {
    alert("O cesto está vazio!");
    return;
  }

  const estudante = document.getElementById("estudante").checked;
  const cupao = document.getElementById("cupao").value;

  const produtosIDs = cesto.map(p => p.id);

  const data = {
    products: produtosIDs,
    student: estudante,
    coupon: cupao
  };

  fetch('https://deisishop.pythonanywhere.com/buy', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(resposta => {
      const msg = document.getElementById("mensagemPagamento");

      if (resposta.error) {
        msg.innerHTML = `<span style='color:red;'>${resposta.error}</span>`;
        return;
      }

      msg.innerHTML = `
        ✅ Compra realizada com sucesso!<br>
        💳 Referência: <b>${resposta.reference}</b><br>
        💰 Total final: <b>${resposta.total_to_pay}€</b>
      `;
console.log(resposta);

      // limpar carrinho
      localStorage.setItem("produtos-selecionados", JSON.stringify([]));
      atualizarCesto();
    }) 
    
    .catch(() => {
      alert("Erro ao processar pagamento.");
    });
}

