// ================= EMAILJS =================
document.addEventListener('DOMContentLoaded', () => {
  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY,
  });

  const EMAIL_SENT_KEY = 'telegram_email_sent';

  saveInitialParams();
  initTelegramHandlers();

  // ------------------------------------------------
  // Общие данные
  // ------------------------------------------------

  function getUTMData() {
    return {
      utm_source: localStorage.getItem('utm_source') || '',
      utm_medium: localStorage.getItem('utm_medium') || '',
      utm_campaign: localStorage.getItem('utm_campaign') || '',
      utm_term: localStorage.getItem('utm_term') || '',
      utm_content: localStorage.getItem('utm_content') || '',
      utm_referrer: localStorage.getItem('utm_referrer') || '',
    };
  }

  function getCommonParams() {
    return {
      ...getUTMData(),
      click_time: new Date().toLocaleString(),
      user_agent: navigator.userAgent,
      page_url: location.href,
    };
  }

  async function sendEmail(params) {
    return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_SIGN, {
      ...getCommonParams(),
      ...params,
    });
  }

  // ------------------------------------------------
  // Бронирование
  // ------------------------------------------------

  async function sendBookingEmail(data) {
    return sendEmail({
      name: data.name,
      telegram: data.contact,
      experience: data.level,
      language: 'French',
    });
  }

  // если нужно использовать в других файлах
  window.sendBookingEmail = sendBookingEmail;

  // ------------------------------------------------
  // Telegram
  // ------------------------------------------------

  function initTelegramHandlers() {
    document
      .querySelectorAll('a[aria-label="Telegram"]')
      .forEach((link) => link.addEventListener('click', handleTelegramClick));
  }

  function handleTelegramClick(e) {
    e.preventDefault();

    const href = e.currentTarget.href;

    sendUTMEmail(href);

    setTimeout(() => {
      window.open(href, '_blank');
    }, 100);
  }

  async function sendUTMEmail(linkUrl) {
    if (localStorage.getItem(EMAIL_SENT_KEY)) return;

    try {
      await sendEmail({
        link_clicked: linkUrl,
      });

      localStorage.setItem(EMAIL_SENT_KEY, 'true');
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  }

  // ------------------------------------------------
  // UTM
  // ------------------------------------------------

  function saveInitialParams() {
    const params = new URLSearchParams(location.search);

    [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
    ].forEach((key) => {
      if (!localStorage.getItem(key)) {
        const value = params.get(key);
        if (value) localStorage.setItem(key, value);
      }
    });

    if (
      !localStorage.getItem('utm_referrer') &&
      document.referrer &&
      !document.referrer.includes(location.hostname)
    ) {
      localStorage.setItem('utm_referrer', document.referrer);
    }
  }
});
