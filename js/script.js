'use strict';

// Set a real international number (digits only) to enable WhatsApp for a client.
// Keep empty for this portfolio demonstration: no external message is sent.
const WHATSAPP_NUMBER = '';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
window.matchMedia('(min-width: 768px)').addEventListener('change', closeMenu);

// Native details preserve keyboard navigation and remain usable without JS.
const questions = [...document.querySelectorAll('.faq details')];
questions.forEach(question => question.addEventListener('toggle', () => {
  if (question.open) questions.forEach(other => { if (other !== question) other.open = false; });
}));

const dialog = document.querySelector('#demo-contact');
const preview = document.querySelector('#message-preview');
document.querySelectorAll('[data-book]').forEach(link => {
  const treatment = link.dataset.book;
  const message = treatment ? `Olá! Gostaria de saber mais sobre ${treatment} e agendar uma avaliação na Your Clinic.` : 'Olá! Gostaria de agendar uma avaliação na Your Clinic.';
  if (/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  } else {
    link.addEventListener('click', event => {
      event.preventDefault();
      preview.textContent = message;
      dialog.showModal();
    });
  }
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('#close-demo').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
const backTop = document.querySelector('.back-top');
function updateBackTop() { backTop.hidden = window.scrollY < 600; }
window.addEventListener('scroll', updateBackTop, { passive: true });
updateBackTop();
document.querySelector('#year').textContent = new Date().getFullYear();
