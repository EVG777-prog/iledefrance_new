// ================= BOOKING MODAL =================
(function () {
  const overlay = document.getElementById('booking-modal');
  if (!overlay) return;

  function openModal(e) {
    if (e) e.preventDefault();
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');

    overlay.querySelectorAll('.booking-field').forEach((field) => {
      field.classList.remove('has-error', 'shake');
    });
  }

  // Open triggers: any element with data-open-modal="booking",
  // plus every link/button pointing at #booking (already used across the
  // header/footer CTAs, and inside dynamically-rendered rate cards).
  // Delegated on document so it also works for elements added to the DOM
  // later — e.g. price cards rendered async after a Google Sheets fetch.
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest(
      '[data-open-modal="booking"], a[href="#booking"], a[href$="#booking"]'
    );
    if (trigger) openModal(e);
  });

  // Close triggers
  overlay.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });

  // Click on the dimmed backdrop (outside the card) closes it
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Esc closes it
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Form validation + submit — replace the TODO with your real submit logic
  // (EmailJS / Google Sheets / your own endpoint, same pattern as rates.js)
  const form = document.getElementById('booking-form');
  if (form) {
    function validateField(field) {
      const input = field.querySelector('input, select');
      const isValid = input.value.trim() !== '';
      field.classList.toggle('has-error', !isValid);
      return isValid;
    }

    // clear the error as soon as the person starts fixing it
    form.querySelectorAll('.booking-field').forEach((field) => {
      const input = field.querySelector('input, select');
      const eventName = input.tagName === 'SELECT' ? 'change' : 'input';
      input.addEventListener(eventName, () => validateField(field));
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const fields = form.querySelectorAll('.booking-field');
      let firstInvalid = null;
      let allValid = true;

      fields.forEach((field) => {
        const isValid = validateField(field);
        if (!isValid) {
          allValid = false;
          if (!firstInvalid) firstInvalid = field;

          field.classList.remove('shake');
          // force reflow so the animation can replay if it was already added
          void field.offsetWidth;
          field.classList.add('shake');
        }
      });

      if (!allValid) {
        firstInvalid.querySelector('input, select').focus();
        return;
      }

      const data = {
        name: form.name.value.trim(),
        phone: form.phone.value.trim(),
        telegram: form.telegram.value.trim(),
        experience: form.experience.value,
        format: form.format.value,
        language: 'French',
      };

      console.log('Booking form submitted:', data);

      // TODO: send `data` to your backend/EmailJS/Google Sheet here
      sendBookingEmail(data);

      form.reset();
      closeModal();
    });
  }
})();
