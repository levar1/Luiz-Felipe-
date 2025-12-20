const paginas = document.querySelectorAll(".pagina");
document.getElementById("total").textContent = paginas.length;

// 🌙 Modo noturno
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// ⛶ Tela cheia
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// ☰ Menu lateral
function toggleMenu() {
  document.getElementById("menu").classList.toggle("active");
}

// 🔍 Zoom
paginas.forEach(p => p.addEventListener("click", () => p.classList.toggle("zoom")));

// 📑 Ir para página
function irPagina(n) {
  paginas[n - 1].scrollIntoView({ behavior: "smooth" });
}

// 🧭 Numeração automática
window.addEventListener("scroll", () => {
  let atual = 1;
  paginas.forEach((p, i) => {
    if (p.getBoundingClientRect().top <= window.innerHeight / 2) atual = i + 1;
  });
  document.getElementById("atual").textContent = atual;
  document.getElementById("topo").style.display = window.scrollY > 300 ? "block" : "none";
});

// 🔝 Voltar ao topo
function voltarTopo() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// 📊 Barra de progresso
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const altura = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progresso = (scrollTop / altura) * 100;
  document.getElementById("progresso").style.width = progresso + "%";
});

// 💾 Salvar posição da leitura
window.addEventListener("scroll", () => {
  localStorage.setItem("leituraPosicao", window.scrollY);
});
window.addEventListener("load", () => {
  const posicao = localStorage.getItem("leituraPosicao");
  if (posicao) window.scrollTo(0, posicao);
});

// 📚 Criar menu automático
const menu = document.getElementById("menuPaginas");
paginas.forEach((_, i) => {
  const li = document.createElement("li");
  li.textContent = "Página " + (i + 1);
  li.onclick = () => irPagina(i + 1);
  menu.appendChild(li);
});
  
