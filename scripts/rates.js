document.addEventListener('DOMContentLoaded', async (event) => {
  const ratesList = document.querySelector('.rates-grid');
  if (!ratesList) return;

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => {
      const entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      };
      return entities[char];
    });
  }

  const getFormatLabel = (rateName) => {
    if (rateName.includes('Удвох')) return 'Навчання в парі';
    if (
      rateName.includes('Лише ти') ||
      rateName.includes('Дитячий') ||
      rateName.includes('Індивідуальні заняття')
    ) {
      return 'Індивідуальні заняття 1 на 1';
    }
    return 'Міні-група до 6 осіб';
  };

  try {
    const rates = await getRates();
    showRates(rates);
  } catch (error) {
    console.error('Не вдалося завантажити тарифи:', error);
    ratesList.innerHTML =
      '<p class="rates-loading">Не вдалося завантажити тарифи. Спробуйте оновити сторінку.</p>';
  }

  function showRates(rates) {
    ratesList.innerHTML = '';
    const featuredPhotos = [
      {
        src: 'assets/pictures/picture_rates_1.webp',
        alt: 'Студентки спілкуються за кавою',
      },
      {
        src: 'assets/pictures/picture_rates_2.webp',
        alt: 'Студенти займаються французькою на свіжому повітрі',
      },
    ];

    const excludedNames = ['перший урок', 'розмовний клуб'];

    const visibleRates = rates.filter((rate) => {
      const name = String(rate.name ?? '').toLocaleLowerCase('uk');
      return !excludedNames.some((phrase) => name.includes(phrase));
    });

    visibleRates.forEach((rate, index) => {
      const rateElement = document.createElement('div');
      const isFeatured = index < 2;
      rateElement.classList.add('rate-card');
      if (isFeatured) rateElement.classList.add('rate-card-featured');

      const rateName = escapeHTML(rate.name);
      const rawDuration = String(rate.duration ?? '')
        .replace(/^\((.*)\)$/, '$1')
        .replace(/\*\*/g, '')
        .trim()
        .replace(/[.。]\s*$/, '');
      const quantity = String(rate.quantity ?? '').trim();
      const description = [
        quantity ? `${quantity} уроків` : '',
        rawDuration ? `(${rawDuration})` : '',
      ]
        .filter(Boolean)
        .join(' ');
      const isPair = String(rate.name ?? '').includes('Удвох');
      const formattedDescription = `${description}${isPair ? ', ціна за 2 учнів' : ''}`;
      const safeDescription = escapeHTML(formattedDescription);
      const price = escapeHTML(rate.price);
      const sourceName = String(rate.name ?? '');
      const formatLabel = getFormatLabel(sourceName);
      const isIndividual =
        sourceName.includes('Індивідуальні заняття') ||
        formatLabel.includes('Індивідуальні заняття');
      const formatIcon = isIndividual
        ? 'assets/icons/icon_list_bullet_cruaissan.svg'
        : 'assets/icons/icon_list_bullet.svg';
      const photo = featuredPhotos[index];
      const photoMarkup = photo
        ? `<div class="rate-card-photo"><img src="${photo.src}" alt="${photo.alt}" loading="lazy" /></div>`
        : '';

      rateElement.innerHTML = `
                ${photoMarkup}
                <div class="rate-card-content">
                <div class="rate-format"><img src="${formatIcon}" alt="" aria-hidden="true" />${formatLabel}</div>
                <h3>${rateName}</h3>
                <div class="freq">${safeDescription}</div>
                <div class="rate-card-footer">
                  <div class="price">${price} грн</div>
                  <a href="#booking" class="btn btn-teal">Записатись</a>
                </div>
                </div>
            `;

      ratesList.appendChild(rateElement);
    });

    if (!ratesList.children.length) {
      ratesList.innerHTML =
        '<p class="rates-loading">Наразі тарифів немає.</p>';
      return;
    }

    // Получаем модальное окно
    const modal = document.getElementById('myModal');

    // Получаем все кнопки, которые открывают модальное окно
    const btns = ratesList.querySelectorAll('.apply-button');

    // Добавляем обработчик событий для каждой кнопки
    btns.forEach(function (btn) {
      btn.onclick = function () {
        modal.style.display = 'block';
        document.body.classList.add('no-scroll');
      };
    });
  }
});
