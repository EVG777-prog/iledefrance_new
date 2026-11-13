const faqList = document.querySelector('.faq-list');

faqData.forEach(({ question, answer }, index) => {
  const item = document.createElement('div');
  item.className = `faq-item${index === 0 ? ' is-open' : ''}`;

  const button = document.createElement('button');
  button.className = 'faq-question';
  button.type = 'button';
  button.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');

  const title = document.createElement('h4');
  title.textContent = question;

  const icon = document.createElement('img');
  icon.className = 'faq-icon';
  icon.src = '../assets/icons/icon-select-open.svg';
  icon.alt = 'Розгорнути відповідь';

  button.append(title, icon);

  const answerContainer = document.createElement('div');
  answerContainer.className = 'faq-answer';

  const answerText = document.createElement('p');
  answerText.textContent = answer;
  answerContainer.append(answerText);
  item.append(button, answerContainer);
  faqList.append(item);

  button.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');

    faqList.querySelectorAll('.faq-item.is-open').forEach((openItem) => {
      openItem.classList.remove('is-open');
      openItem
        .querySelector('.faq-question')
        .setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});
