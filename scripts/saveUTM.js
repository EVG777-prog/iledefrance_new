document.addEventListener('DOMContentLoaded', () => {
  // Инициализация EmailJS
  emailjs.init(EMAILJS_TOKEN);

  // Ключ для проверки отправки email
  const EMAIL_SENT_KEY = 'telegram_email_sent';

  saveInitialParams();

  initTelegramHandlers();

  // Функция для получения UTM данных из localStorage
  function getUTMData() {
    const utmData = {
      utm_source: localStorage.getItem('utm_source') || '',
      utm_medium: localStorage.getItem('utm_medium') || '',
      utm_campaign: localStorage.getItem('utm_campaign') || '',
      utm_term: localStorage.getItem('utm_term') || '',
      utm_content: localStorage.getItem('utm_content') || '',
      utm_referrer: localStorage.getItem('utm_referrer') || '',
    };

    return utmData;
  }

  // Функция для проверки, было ли уже отправлено письмо
  function isEmailAlreadySent() {
    return localStorage.getItem(EMAIL_SENT_KEY) === 'true';
  }

  // Функция для отметки, что письмо отправлено
  function markEmailAsSent() {
    localStorage.setItem(EMAIL_SENT_KEY, 'true');
  }

  // Функция для отправки email с UTM данными
  function sendUTMEmail(linkUrl) {
    // Проверяем, было ли уже отправлено письмо
    if (isEmailAlreadySent()) {
      console.log('Email уже был отправлен ранее');
      return;
    }

    const utmData = getUTMData();

    // Подготовка параметров для отправки email
    const templateParams = {
      link_clicked: linkUrl,
      utm_source: utmData.utm_source,
      utm_medium: utmData.utm_medium,
      utm_campaign: utmData.utm_campaign,
      utm_term: utmData.utm_term,
      utm_content: utmData.utm_content,
      utm_referrer: utmData.utm_referrer,
      click_time: new Date().toLocaleString(),
      // Дополнительная информация
      user_agent: navigator.userAgent,
      page_url: window.location.href,
    };

    // Отправка email через EmailJS
    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_TELEGRAM, templateParams)
      .then(
        function (response) {
          console.log(
            'Email sent successfully!',
            response.status,
            response.text
          );
          // Отмечаем, что письмо отправлено
          markEmailAsSent();
        },
        function (error) {
          console.error('Failed to send email:', error);
        }
      );
  }

  // Функция для обработки клика по ссылке Telegram
  function handleTelegramClick(event) {
    // Предотвращаем стандартное поведение ссылки
    event.preventDefault();

    const link = event.currentTarget;
    const href = link.getAttribute('href');

    // Отправляем email с UTM данными
    sendUTMEmail(href);

    // Открываем ссылку Telegram после небольшой задержки
    setTimeout(() => {
      window.open(href, '_blank');
    }, 100);
  }

  // Добавление обработчиков событий для всех ссылок Telegram
  function initTelegramHandlers() {
    // Находим все ссылки с классом icon-telegram
    const telegramLinks = document.querySelectorAll(
      '.contact__icon.icon-telegram'
    );

    telegramLinks.forEach((link) => {
      link.addEventListener('click', handleTelegramClick);
    });

    console.log(`Initialized ${telegramLinks.length} Telegram link handlers`);
  }

  // Сохраняем UTM и реферер при первом визите
  function saveInitialParams() {
    const utmKeys = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
    ];
    const refKey = 'utm_referrer';

    const params = new URLSearchParams(window.location.search);

    // Сохраняем только если ещё не сохранены ранее
    utmKeys.forEach((key) => {
      if (!localStorage.getItem(key)) {
        const value = params.get(key);
        if (value) {
          localStorage.setItem(key, value);
        }
      }
    });

    // Сохраняем referrer, если он внешний и ещё не сохранён
    const isReferrerExternal =
      document.referrer && !document.referrer.includes(location.hostname); // исключаем внутренние переходы

    if (!localStorage.getItem(refKey) && isReferrerExternal) {
      localStorage.setItem(refKey, document.referrer);
    }
  }
});
