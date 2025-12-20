const paginas = document.querySelectorAll(".pagina");
document.getElementById("total").textContent = paginas.length;

// Modo noturno
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Tela cheia
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// Menu lateral
function toggleMenu() {
  document.getElementById("menu").classList.toggle("active");
}

// Ir para página
function irPagina(n) {
  paginas[n - 1].scrollIntoView({ behavior: "smooth" });
}

// Zoom
paginas.forEach(p => {
  p.addEventListener("click", () => p.classList.toggle("zoom"));
});

// Contador + botão topo
window.addEventListener("scroll", () => {
  let atual = 1;
  paginas.forEach((p, i) => {
    if (p.getBoundingClientRect().top <= window.innerHeight / 2) {
      atual = i + 1;
    }
  });
  document.getElementById("atual").textContent = atual;

  document.getElementById("topo").style.display =
    window.scrollY > 300 ? "block" : "none";
});

// Voltar topo
function voltarTopo() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
