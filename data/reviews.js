const reviews = [
  {
    name: 'Марія',
    level: 'В2',
    review:
      'Вважаю вашу школу чудовою та ціни приємні. Мені подобається наша вчителька та методи викладання, наша невеличка група теж дуже класна. Я буду вчити французьку з вами 100%, бо ви 10/10.',
    avatar: '../assets/pictures/reviews-photo_1.png',
  },
  {
    name: 'Марія',
    level: 'В2',
    review:
      'Вважаю вашу школу чудовою та ціни приємні. Мені подобається наша вчителька та методи викладання, наша невеличка група теж дуже класна. Я буду вчити французьку з вами 100%, бо ви 10/10.',
    avatar: '../assets/pictures/reviews-photo_1.png',
  },
  {
    name: 'Марія',
    level: 'В2',
    review:
      'Вважаю вашу школу чудовою та ціни приємні. Мені подобається наша вчителька та методи викладання, наша невеличка група теж дуже класна. Я буду вчити французьку з вами 100%, бо ви 10/10.',
    avatar: '../assets/pictures/reviews-photo_1.png',
  },
  {
    name: 'Марія',
    level: 'В2',
    review:
      'Вважаю вашу школу чудовою та ціни приємні. Мені подобається наша вчителька та методи викладання, наша невеличка група теж дуже класна. Я буду вчити французьку з вами 100%, бо ви 10/10.',
    avatar: '../assets/pictures/reviews-photo_1.png',
  },
  {
    name: 'Марія',
    level: 'В2',
    review:
      'Вважаю вашу школу чудовою та ціни приємні. Мені подобається наша вчителька та методи викладання, наша невеличка група теж дуже класна. Я буду вчити французьку з вами 100%, бо ви 10/10.',
    avatar: '../assets/pictures/reviews-photo_1.png',
  },
  {
    name: 'Марія',
    level: 'В2',
    review:
      'Вважаю вашу школу чудовою та ціни приємні. Мені подобається наша вчителька та методи викладання, наша невеличка група теж дуже класна. Я буду вчити французьку з вами 100%, бо ви 10/10.',
    avatar: '../assets/pictures/reviews-photo_1.png',
  },
];

const reviewsGrid = document.querySelector('.reviews-grid');

if (reviewsGrid) {
  reviews.forEach(({ name, level, review, avatar }) => {
    const card = document.createElement('article');
    card.className = 'review-card';

    const decoration = document.createElement('div');
    decoration.className = 'blob';
    const decorationImage = document.createElement('img');
    decorationImage.src = '../assets/pictures/reviews-graphic.svg';
    decorationImage.alt = 'Декоративна графіка відгуку';
    decoration.append(decorationImage);

    const text = document.createElement('p');
    text.className = 'review-text';
    text.textContent = review;

    const author = document.createElement('div');
    author.className = 'review-author';

    const avatarElement = document.createElement('span');
    avatarElement.className = 'review-avatar';
    avatarElement.style.backgroundImage = `url('${avatar}')`;

    const authorDetails = document.createElement('div');
    const authorName = document.createElement('h4');
    authorName.className = 'review-name';
    authorName.textContent = name;

    const authorLevel = document.createElement('div');
    authorLevel.className = 'review-level';
    authorLevel.textContent = `Навчається на рівні ${level}`;

    authorDetails.append(authorName, authorLevel);
    author.append(avatarElement, authorDetails);
    card.append(decoration, text, author);
    reviewsGrid.append(card);
  });
}
