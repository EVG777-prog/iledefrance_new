const teachersContainer = document.querySelector('.teachers-grid');

document.addEventListener('DOMContentLoaded', async () => {
  if (!teachersContainer) return;

  const teachers = await getTeachers('Французька');
  if (!teachers.length) {
    document.querySelector('.teachers')?.setAttribute('hidden', '');
    return;
  }

  showTeachers(teachers);
  fitTeacherCards();
  window.addEventListener('resize', fitTeacherCards);

  const arrows = document.querySelectorAll('.carousel-arrows button');
  arrows.forEach((button, index) => {
    button.addEventListener('click', () => {
      const step = parseFloat(teachersContainer.dataset.step) || 340;
      teachersContainer.scrollBy({
        left: (index === 0 ? -1 : 1) * step,
        behavior: 'smooth',
      });
    });
  });
});

function showTeachers(teachers) {
  teachersContainer.replaceChildren();

  teachers.forEach((teacher) => {
    const card = document.createElement('article');
    card.className = 'teacher-card';

    if (teacher.photo) {
      const photo = document.createElement('div');
      photo.className = 'teacher-photo';
      const image = document.createElement('img');
      image.src = /^https?:\/\//i.test(teacher.photo)
        ? teacher.photo
        : `assets/teachers/${teacher.photo.replace(/\.webp$/i, '')}.webp`;
      image.alt = teacher.name ? `Photo of ${teacher.name}` : 'Teacher photo';
      image.loading = 'lazy';
      photo.append(image);
      card.append(photo);
    }

    const info = document.createElement('div');
    info.className = 'teacher-info';
    const name = document.createElement('div');
    name.className = 'teacher-name';
    name.append(document.createTextNode(teacher.name));

    if (teacher.link) {
      const videoButton = document.createElement('button');
      videoButton.className = 'yt-icon';
      videoButton.type = 'button';
      videoButton.setAttribute('aria-label', `Watch ${teacher.name} on YouTube`);
      const icon = document.createElement('img');
      icon.src = 'assets/icons/icon_youtube.svg';
      icon.alt = '';
      videoButton.append(icon);
      videoButton.addEventListener('click', () => showTeacherVideo(teacher.link));
      name.append(videoButton);
    }

    const bio = document.createElement('p');
    bio.className = 'teacher-bio';
    bio.textContent = teacher.description;
    info.append(name, bio);
    card.append(info);
    teachersContainer.append(card);
  });
}

function fitTeacherCards() {
  if (!teachersContainer || !teachersContainer.children.length) return;
  const firstCard = teachersContainer.querySelector('.teacher-card');
  const gap = parseFloat(getComputedStyle(teachersContainer).columnGap) || 24;
  teachersContainer.dataset.step = firstCard
    ? firstCard.getBoundingClientRect().width + gap
    : 340;
}
