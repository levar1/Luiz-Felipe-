// Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
}
if (localStorage.getItem('darkMode') === 'true') document.body.classList.add('dark');

// Menu Lateral
function toggleMenu() {
  document.getElementById('menu').classList.toggle('aberto');
  gerarThumbnails();
}

// Gerar thumbnails no menu
function gerarThumbnails() {
  const menu = document.getElementById('menuPaginas');
  menu.innerHTML = '';
  const paginas = document.querySelectorAll('.pagina.vertical img');
  paginas.forEach((img, i) => {
    const li = document.createElement('li');
    const thumb = document.createElement('img');
    thumb.src = img.src;
    thumb.alt = img.alt || `Página ${i+1}`;
    thumb.onclick = () => { img.scrollIntoView({behavior:'smooth'}); toggleMenu(); };
    li.appendChild(thumb);
    menu.appendChild(li);
  });
}

// Barra de progresso
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.querySelector('#progresso .barra').style.width = scrolled + '%';

  document.getElementById('topo').style.display = winScroll > 500 ? 'block' : 'none';
});

// Zoom nas imagens (toque duplo ou pinça)
document.querySelectorAll('.pagina.vertical img').forEach(img => {
  img.addEventListener('click', () => {
    img.classList.toggle('zoomed');
  });
});

// Navegação por toque nas laterais
function scrollProxima() {
  window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
}
function scrollAnterior() {
  window.scrollBy({ top: -window.innerHeight * 0.9, behavior: 'smooth' });
}

// Teclas ← →
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') scrollProxima();
  if (e.key === 'ArrowLeft') scrollAnterior();
});

// Fullscreen
function toggleFullScreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else document.exitFullscreen();
}

// Voltar ao topo
function voltarTopo() {
  window.scrollTo({top:0, behavior:'smooth'});
}

// Inicializar
gerarThumbnails();
