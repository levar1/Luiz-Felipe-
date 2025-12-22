// Dark Mode
if (localStorage.getItem('darkMode') === 'true') document.body.classList.add('dark');

function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
}

// Menu e Settings
function toggleMenu() {
  document.getElementById('menu').classList.toggle('aberto');
  gerarThumbnails();
}
function toggleSettings() {
  document.getElementById('settings').classList.toggle('aberto');
}

// Thumbnails
function gerarThumbnails() {
  const menu = document.getElementById('menuPaginas');
  menu.innerHTML = '';
  const paginas = document.querySelectorAll('.pagina.vertical img');
  paginas.forEach((img, i) => {
    const li = document.createElement('li');
    const thumb = document.createElement('img');
    thumb.src = img.src;
    thumb.onclick = () => {
      img.scrollIntoView({behavior:'smooth'});
      toggleMenu();
    };
    li.appendChild(thumb);
    menu.appendChild(li);
  });
}

// Página inicial
function startReading() {
  document.getElementById('home').style.display = 'none';
  document.getElementById('leitor').style.display = 'flex';
  gerarThumbnails();
  window.scrollTo(0, 0);
}

// Continuar leitura
function continueReading() {
  startReading();
  const last = localStorage.getItem('lastPage');
  if (last) {
    const target = document.querySelector(`[data-page="${last}"]`);
    if (target) target.scrollIntoView({behavior:'smooth'});
  }
}
if (localStorage.getItem('lastPage')) {
  document.getElementById('continuarBtn').style.display = 'block';
}

// Salvar última página
window.addEventListener('scroll', () => {
  const pages = document.querySelectorAll('.pagina.vertical');
  pages.forEach(page => {
    const rect = page.getBoundingClientRect();
    if (rect.top < window.innerHeight / 2 && rect.bottom > 0) {
      localStorage.setItem('lastPage', page.dataset.page || 'intro');
    }
  });
  updateProgress();
});

function updateProgress() {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.querySelector('#progresso .barra').style.width = scrolled + '%';
  document.getElementById('topo').style.display = winScroll > 800 ? 'block' : 'none';
}

// Modos de leitura
function setReadingMode(mode) {
  document.body.className = document.body.classList.contains('dark') ? 'dark' : '';
  if (mode !== 'normal') document.body.classList.add(mode);
  localStorage.setItem('readingMode', mode);
}

// Auto-scroll
let autoInterval = null;
function toggleAutoScroll() {
  if (autoInterval) {
    clearInterval(autoInterval);
    autoInterval = null;
    document.getElementById('autoStatus').textContent = 'OFF';
  } else {
    autoInterval = setInterval(() => window.scrollBy(0, 1), 30);
    document.getElementById('autoStatus').textContent = 'ON';
  }
}

// Navegação
function scrollProxima() { window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' }); }
function scrollAnterior() { window.scrollBy({ top: -window.innerHeight * 0.9, behavior: 'smooth' }); }

// Compartilhar
function shareCurrentPage() {
  navigator.share ? navigator.share({url: location.href, title: 'NULL cats'}) : alert('Copie o link: ' + location.href);
}

// Fullscreen e topo
function toggleFullScreen() {
  document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
}
function voltarTopo() { window.scrollTo({top:0, behavior:'smooth'}); }

// Inicializar
window.addEventListener('load', updateProgress);
window.addEventListener('scroll', updateProgress);
