
const nav = document.getElementById('nav');
const hamburger = document.querySelector('.hamb');
if (hamburger && nav) {
  hamburger.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('.links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = [...form.querySelectorAll('input, textarea')];
    const values = fields.map(el => el.value.trim()).filter(Boolean);
    const text = `Stratford Market Center request:\n\n${values.join('\n')}`;
    if (navigator.clipboard) navigator.clipboard.writeText(text).catch(()=>{});
    alert('Your request details are ready and were copied when supported. Please call (203) 345-6515 to submit the order or catering quote. To receive forms by email, connect a form endpoint in index.html.');
  });
}
