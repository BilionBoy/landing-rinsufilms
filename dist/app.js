const whatsapp = 'https://wa.me/5569992804208';
const dialog = document.querySelector('#detail-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogBody = document.querySelector('#dialog-body');
const header = document.querySelector('.header');
const menu = document.querySelector('#navigation');
const toggle = document.querySelector('.menu-toggle');
const navLinks = [...menu.querySelectorAll('a')];
const sections = [...document.querySelectorAll('main section[id]')];
const arrow = '<svg class="icon" aria-hidden="true"><use href="#i-arrow"></use></svg>';
let dialogOpener;
let currentGalleryIndex = null;
const contactHref = service => `${whatsapp}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre ${service || 'os serviços da R Insulfilms'}.`)}`;
function contact(label, service = '') {
  return `<a class="button button-red" target="_blank" rel="noopener noreferrer" href="${contactHref(service)}"><svg class="icon" aria-hidden="true"><use href="#i-whatsapp"></use></svg>${label}${arrow}</a>`;
}
function openDetail(title, content, mode = 'standard') {
  if (!dialog.open) dialogOpener = document.activeElement;
  currentGalleryIndex = null;
  dialogTitle.textContent = title;
  dialogBody.innerHTML = content;
  dialog.dataset.mode = mode;
  if (!dialog.open) dialog.showModal();
  document.body.style.overflow = 'hidden';
  dialog.scrollTop = 0;
  dialogTitle.focus({ preventScroll: true });
}
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => {
  document.body.style.overflow = '';
  currentGalleryIndex = null;
  if (dialogOpener?.isConnected) dialogOpener.focus({ preventScroll: true });
});
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
function setMenu(open, returnFocus = false) {
  menu.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  toggle.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
  if (returnFocus) toggle.focus();
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
navLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('click', event => { if (!header.contains(event.target)) setMenu(false); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('open')) setMenu(false, true);
  if (dialog.open && currentGalleryIndex !== null && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault();
    showPhoto(currentGalleryIndex + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
const mobile = matchMedia('(max-width: 700px)');
mobile.addEventListener('change', () => setMenu(false));
let scrollQueued = false;
function updateNavigation() {
  const offset = header.offsetHeight + 110;
  let current = sections[0].id;
  for (const section of sections) if (section.getBoundingClientRect().top <= offset) current = section.id;
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) current = sections.at(-1).id;
  navLinks.forEach(link => {
    const active = link.hash === `#${current}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  header.classList.toggle('is-scrolled', window.scrollY > 16);
  scrollQueued = false;
}
window.addEventListener('scroll', () => {
  if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateNavigation); }
}, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();
const services = {
  ppf: { title: 'PPF — proteção de pintura', description: 'Uma película transparente que ajuda a preservar a pintura, sem mudar o visual do seu veículo.', benefits: ['Proteção contra pedras e pequenos arranhões', 'Acabamento transparente', 'Aplicação em áreas específicas ou na carroceria'] },
  insulfilm: { title: 'Insulfilm automotivo', description: 'Mais conforto para dirigir, com proteção solar e a privacidade que você procura.', benefits: ['Redução de calor no interior', 'Proteção contra raios UV', 'Opções de películas para o seu veículo'] },
  envelopamento: { title: 'Envelopamento automotivo', description: 'Uma nova cor, um detalhe diferente ou uma transformação completa. Personalize o visual do seu veículo.', benefits: ['Envelopamento total ou parcial', 'Diferentes cores e texturas', 'Acabamento com atenção aos detalhes'] },
  polimento: { title: 'Polimento técnico', description: 'Um cuidado técnico para recuperar o brilho e tratar marcas e imperfeições da pintura.', benefits: ['Avaliação do estado da pintura', 'Correção de marcas e riscos superficiais', 'Recuperação do brilho'] }
};
document.querySelectorAll('[data-service]').forEach(button => {
  button.setAttribute('aria-haspopup', 'dialog');
  button.setAttribute('aria-label', `Conhecer ${services[button.dataset.service].title}`);
  button.addEventListener('click', () => {
    const service = services[button.dataset.service];
    openDetail(service.title, `<div class="service-detail"><div class="detail-media">${button.querySelector('.crop').outerHTML}</div><div class="detail-copy"><p class="dialog-description">${service.description}</p><ul class="benefit-list">${service.benefits.map(benefit => `<li>${benefit}</li>`).join('')}</ul>${contact('Pedir orçamento', service.title)}<p class="contact-note">Converse com a equipe sobre o seu veículo.</p></div></div>`, 'service');
  });
});
const allServices = [
  ['Insulfilm automotivo', 'Conforto térmico e proteção solar.'],
  ['PPF', 'Película transparente para proteger a pintura.'],
  ['Envelopamento automotivo', 'Cores e texturas para um novo visual.'],
  ['Polimento técnico', 'Correção de marcas e recuperação do brilho.'],
  ['Vitrificação de pintura', 'Proteção cerâmica para a pintura.'],
  ['Higienização interna', 'Limpeza de bancos, painéis e carpetes.'],
  ['Lavagem técnica', 'Limpeza com cuidado em cada detalhe.'],
  ['Restauração de faróis', 'Recuperação da transparência dos faróis.'],
  ['Adesivos personalizados', 'Personalização para veículos e empresas.'],
  ['Som automotivo', 'Instalação de equipamentos e acessórios.'],
  ['PPF fumê', 'Proteção com acabamento escurecido.'],
  ['PPF fotocromático', 'Película que se adapta à incidência de luz.']
];
document.querySelector('#all-services').addEventListener('click', () => {
  openDetail('Encontre o cuidado para seu veículo', `<p class="dialog-description catalog-intro">Escolha um serviço para conversar com a equipe pelo WhatsApp.</p><div class="catalog-services">${allServices.map(([name, description]) => `<a href="${contactHref(name)}" target="_blank" rel="noopener noreferrer"><strong>${name}</strong><span>${description}</span><span class="catalog-action">Consultar serviço ${arrow}</span></a>`).join('')}</div><details class="catalog-original"><summary>Ver catálogo completo em imagem</summary><img class="dialog-catalog" src="assets/catalogo.jpeg" alt="Catálogo da R Insulfilms com doze serviços" loading="lazy"></details>`, 'catalog');
});
document.querySelectorAll('[data-project]').forEach(button => {
  button.setAttribute('aria-haspopup', 'dialog');
  button.setAttribute('aria-label', `Ver ${button.querySelector('strong').textContent}`);
  button.addEventListener('click', () => {
    const title = button.querySelector('strong').textContent;
    const service = button.querySelector('.project-copy > span').textContent;
    openDetail(title, `<div class="project-detail-media">${button.querySelector('.crop').outerHTML}</div><div class="project-detail-caption"><p>${service}</p>${contact('Consultar esse serviço', service)}</div>`, 'project');
  });
});
const gallery = [
  { src: 'moto.jpeg', alt: 'Motocicleta preta no espaço de estética automotiva', caption: 'Cuidado com cada detalhe' },
  { src: 'sala-aplicacao.jpeg', alt: 'Sala de aplicação com iluminação técnica', caption: 'Espaço de aplicação' },
  { src: 'estudio.jpeg', alt: 'Interior e entrada do estúdio de estética automotiva', caption: 'Nosso estúdio' },
  { src: 'fachada.jpeg', alt: 'Fachada da R Insulfilms em Porto Velho', caption: 'Nossa unidade em Porto Velho' }
];
function showGallery() {
  openDetail('Por dentro da R Insulfilms', `<div class="dialog-gallery">${gallery.map((photo, index) => `<button class="gallery-item" data-photo="${index}" aria-label="Ampliar: ${photo.caption}"><img src="assets/${photo.src}" alt="${photo.alt}" loading="lazy"><span>${photo.caption}${arrow}</span></button>`).join('')}</div><div class="dialog-actions">${contact('Falar com a equipe')}</div>`, 'gallery');
}
function showPhoto(index) {
  const normalized = (index + gallery.length) % gallery.length;
  const photo = gallery[normalized];
  openDetail(photo.caption, `<img class="lightbox-photo" src="assets/${photo.src}" alt="${photo.alt}"><div class="gallery-controls"><button class="gallery-back" data-gallery-back>Voltar à galeria</button><div class="gallery-pagination"><button class="photo-prev" data-photo-step="-1" aria-label="Foto anterior">${arrow}</button><span aria-live="polite">${normalized + 1} / ${gallery.length}</span><button data-photo-step="1" aria-label="Próxima foto">${arrow}</button></div></div>`, 'photo');
  currentGalleryIndex = normalized;
}
dialogBody.addEventListener('click', event => {
  const photo = event.target.closest('[data-photo]');
  const step = event.target.closest('[data-photo-step]');
  if (photo) showPhoto(Number(photo.dataset.photo));
  else if (step && currentGalleryIndex !== null) showPhoto(currentGalleryIndex + Number(step.dataset.photoStep));
  else if (event.target.closest('[data-gallery-back]')) showGallery();
});
document.querySelector('#more-results').addEventListener('click', showGallery);
