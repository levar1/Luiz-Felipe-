// Modo dark inicial
if (localStorage.getItem('darkMode') === 'true') document.body.classList.add('dark');

// Modo de leitura inicial
const savedMode = localStorage.getItem('readingMode') || 'normal';
setReadingMode(savedMode);

// Última página lida
function updateLastRead() {
  const pages = document.querySelectorAll('.pagina.vertical');
  pages.forEach(page => {
    const rect = page.getBoundingClientRect();
    if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
      localStorage.setItem('lastPage', page.dataset.page || 'intro');
    }
  });
}

function continueReading() {
  startReading();
  const last = localStorage.getItem('lastPage') || 'intro';
  const target = document.querySelector(`[data-page="${last}"]`);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
}

function showLastReadButton() {
  if (localStorage.getItem('lastPage')) {
    document.getElementById('continuarBtn').style.display = 'block';
  }
}

// Início da leitura
function startReading() {
  document.getElementById('home').classList.remove('ativo');
  document.getElementById('leitor').classList.add('ativo');
  gerarThumbnails();
  showLastReadButton();
  revealPages();
}

// Animação de entrada das páginas
function revealPages() {
  const pages = document.querySelectorAll('.pagina.vertical');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visivel');
    });
  }, { threshold: 0.1 });
  pages.forEach(page => observer.observe(page));
}

// Thumbnails no menu
function gerarThumbnails() {
  const menu = document.getElementById('menuPaginas');
  menu.innerHTML = '';
  const paginas = document.querySelectorAll('.pagina.vertical img');
  paginas.forEach((img, i) => {
    const li = document.createElement('li');
    const thumb = document.createElement('img');
    thumb.src = img.src;
    thumb.onclick = () => { img.parentElement.scrollIntoView({behavior:'smooth'}); toggleMenu(); };
    li.appendChild(thumb);
    menu.appendChild(li);
  });
}

// Toggle menus
function toggleMenu() { document.getElementById('menu').classList.toggle('aberto'); gerarThumbnails(); }
function toggleSettings() { document.getElementById('settings').classList.toggle('aberto'); }
function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
}

// Modos de leitura
function setReadingMode(mode) {
  document.body.className = document.body.classList.contains('dark') ? 'dark' : '';
  if (mode !== 'normal') document.body.classList.add(mode);
  localStorage.setItem('readingMode', mode);
  document.getElementById('readingMode').value = mode;
}

// Auto-scroll
let autoScrollInterval = null;
function toggleAutoScroll() {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
    document.getElementById('autoStatus').textContent = 'OFF';
  } else {
    autoScrollInterval = setInterval(() => window.scrollBy(0, 2), 50);
    document.getElementById('autoStatus').textContent = 'ON';
  }
}

// Som de virar página
const pageSound = document.getElementById('pageSound');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  if (Math.abs(window.scrollY - lastScroll) > window.innerHeight * 0.5) {
    pageSound.currentTime = 0;
    pageSound.play().catch(() => {});
    lastScroll = window.scrollY;
  }
  updateLastRead();
  updateProgressBar();
});

function playPageTurnSound() {
  pageSound.currentTime = 0;
  pageSound.play();
}

// Barra de progresso
function updateProgressBar() {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.querySelector('#progresso .barra').style.width = scrolled + '%';
  document.getElementById('topo').style.display = winScroll > 800 ? 'block' : 'none';
}

// Navegação
function scrollProxima() { window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' }); }
function scrollAnterior() { window.scrollBy({ top: -window.innerHeight * 0.9, behavior: 'smooth' }); }
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ' ') scrollProxima();
  if (e.key === 'ArrowLeft') scrollAnterior();
});

// Compartilhar página atual
function shareCurrentPage() {
  const url = new URL(window.location);
  const pages = document.querySelectorAll('.pagina.vertical');
  let current = 'intro';
  pages.forEach(page => {
    if (page.getBoundingClientRect().top < window.innerHeight / 2) current = page.dataset.page || 'intro';
  });
  url.hash = current;
  navigator.share ? navigator.share({url: url.toString(), title: 'NULL cats'}) : prompt('Copie o link:', url.toString());
}

// Fullscreen e topo
function toggleFullScreen() {
  document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
}
function voltarTopo() { window.scrollTo({top:0, behavior:'smooth'}); }

// Inicialização
window.onload = () => {
  showLastReadButton();
  updateProgressBar();
  revealPages();
};
window.addEventListener('scroll', updateProgressBar);
