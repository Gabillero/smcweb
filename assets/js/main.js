const nav = document.getElementById('nav');
const hamburger = document.querySelector('.hamb');
if (hamburger && nav) {
  hamburger.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('.links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

const form = document.getElementById('contactForm');
if (form) {
  const requestType = document.getElementById('requestType');
  const cateringFields = [...form.querySelectorAll('.catering-field')];
  const status = document.getElementById('formStatus');
  const submitButton = document.getElementById('submitButton');

  const updateCateringFields = () => {
    const show = requestType && requestType.value === 'Catering Quote';
    cateringFields.forEach(field => field.classList.toggle('show', show));
  };

  if (requestType) {
    requestType.addEventListener('change', updateCateringFields);
    updateCateringFields();
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.reportValidity()) return;

    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'SENDING...';
    status.className = 'form-note sending';
    status.textContent = 'Sending your request...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      const result = await response.json();

      if (response.ok && result.success) {
        status.className = 'form-note success';
        status.textContent = 'Thank you! Your request has been sent successfully. We will contact you shortly.';
        form.reset();
        updateCateringFields();
      } else {
        throw new Error(result.message || 'Unable to send request.');
      }
    } catch (error) {
      status.className = 'form-note error';
      status.textContent = 'We could not send the form right now. Please try again or call (203) 345-6515.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}
