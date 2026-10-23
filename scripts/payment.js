document.addEventListener('DOMContentLoaded', async (event) => {
  // заполнение тарифов
  const ratesList = document.querySelector('.payment-grid');

  const rates = await getRates();

  const toFrench = (value) => {
    const translations = {
      'Перший урок в групі': 'Premier cours en groupe',
      'Перший дитячий урок': 'Premier cours pour enfant',
      'Перший індивідуальний урок': 'Premier cours individuel',
      'Тариф "Двічі"': 'Formule « Deux fois »',
      'Тариф "Тричі"': 'Formule « Trois fois »',
      'Тариф "Підлітки"': 'Formule « Ados »',
      'Тариф "Лише ти"': 'Formule « Individuel »',
      'Тариф "Удвох"': 'Formule « À deux »',
      'Тариф "Дитячий"': 'Formule « Enfants »',
      '2 рази на тиждень по 90 хв': '2 fois par semaine, 90 min',
      '3 рази на тиждень по 90 хв': '3 fois par semaine, 90 min',
      '2 рази на тиждень по 45 хв': '2 fois par semaine, 45 min',
      '90 хв у Zoom': '90 min sur Zoom',
      '45 хв у Zoom': '45 min sur Zoom',
    };
    return translations[value] || value;
  };

  showRates();

  function showRates() {
    ratesList.innerHTML = '';

    rates.forEach((rate) => {
      const rateElement = document.createElement('div');
      rateElement.classList.add('payment-card');

      // убираем скобки из duration, если они есть
      const duration = rate.duration.replace(/^\((.*)\)$/, '$1');

      rateElement.innerHTML = `  
        <div class="blob">
          <img src="../assets/pictures/payment-card-graphic.svg" alt="Payment card graphic" />
        </div>
        <h3>${toFrench(rate.name)}</h3>
        <div class="payment-sub">${toFrench(duration)}</div>
        <div class="payment-count">${rate.quantity} ${pluralizeLessons(rate.quantity)}</div>
        <div class="payment-row">
            <h3 class="payment-price">${rate.price} UAH</h3>
            <a href="#" class="btn btn-teal">Payer</a>
        </div>
      `;

      ratesList.appendChild(rateElement);
    });
    const paymentCards = document.querySelectorAll('.payment-card');
    paymentCards.forEach((card, index) => {
      card.addEventListener('click', async () => {
        const amount = rates[index].price * 100; // Convert to kopiykas
        const bill = await createBill(amount);
        window.location.href = bill.pageUrl;
      });
    });
  }

  function pluralizeLessons(count) {
    const n = Math.abs(count) % 100;
    const n1 = n % 10;

    if (n > 10 && n < 20) return 'cours';
    if (n1 > 1 && n1 < 5) return 'cours';
    if (n1 === 1) return 'cours';
    return 'cours';
  }

  async function createBill(amount) {
    const response = await fetch(
      'https://api.monobank.ua/api/merchant/invoice/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': MONO_TOKEN,
        },
        body: JSON.stringify({
          amount: amount,
          ccy: 980,
          redirectUrl: REDIRECT_URL,
          merchantPaymInfo: {
            reference: '',
            destination: 'Оплата навчання',
            basketOrder: [
              {
                name: 'Оплата навчання',
                qty: 1,
                sum: amount,
                icon: 'data:image/png;base64,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',
                unit: 'шт.',
                code: '2525',
                barcode: '',
                header: '',
                footer: '',
                tax: [8],
                uktzed: '',
              },
            ],
          },
        }),
      }
    );
    return response.json();
  }
});
