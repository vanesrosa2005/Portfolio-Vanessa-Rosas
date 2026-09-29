const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const exploreDialog = document.querySelector('#explore-dialog');

document.querySelector('[data-open-explore]').addEventListener('click', () => exploreDialog.showModal());
document.querySelectorAll('[data-close-explore]').forEach((element) => {
  element.addEventListener('click', () => exploreDialog.close());
});

exploreDialog.addEventListener('click', (event) => {
  if (event.target === exploreDialog) exploreDialog.close();
});

document.querySelectorAll('[data-open-project]').forEach((button) => {
  button.addEventListener('click', () => document.querySelector(`#${button.dataset.openProject}`).showModal());
});
document.querySelectorAll('[data-close-project]').forEach((button) => {
  button.addEventListener('click', () => button.closest('.project-dialog').close());
});
document.querySelectorAll('.project-dialog').forEach((dialog) => {
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
});

document.querySelectorAll('.project-toggle, .experience-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    button.closest('.project-content, article').classList.toggle('detail-open', !expanded);
  });
});

if (!reduceMotion) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  }), { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

  const orb = document.querySelector('.apple-orb');
  document.querySelector('.apple-hero').addEventListener('pointermove', (event) => {
    orb.style.transform = `translate(${(event.clientX / window.innerWidth - .5) * 18}px, ${(event.clientY / window.innerHeight - .5) * 13}px)`;
  });

  const roleWord = document.querySelector('#role-word');
  const words = ['effortless', 'human', 'clear'];
  let wordIndex = 0;
  window.setInterval(() => {
    roleWord.classList.add('word-out');
    window.setTimeout(() => { wordIndex = (wordIndex + 1) % words.length; roleWord.textContent = words[wordIndex]; roleWord.classList.remove('word-out'); }, 180);
  }, 2500);
} else document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
