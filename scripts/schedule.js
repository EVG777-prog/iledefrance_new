// ================= SCHEDULE (groups) =================

const SCHEDULE_TIME_FILTER_LABELS = {
  all: 'Будь-який час',
  morning: 'Вранці',
  day: 'Вдень',
  evening: 'Увечері',
};
const SCHEDULE_TIME_FILTER_ORDER = ['morning', 'day', 'evening'];
const SCHEDULE_LEVEL_ORDER = ['з нуля', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

// Единый справочник стилей уровня (объединенные бейджи и карточки)
const SCHEDULE_LEVEL_MAP = {
  'з нуля': { badge: 'status-free', card: 'level-free' },
  A1: { badge: 'status-a', card: 'level-a1' },
  A2: { badge: 'status-a', card: 'level-a2' },
  B1: { badge: 'status-b', card: 'level-b1' },
  B2: { badge: 'status-b', card: 'level-b2' },
  C1: { badge: 'status-c', card: 'level-c1' },
  C2: { badge: 'status-c', card: 'level-c2' },
};

// Кэшированные SVG-константы
const CARD_BULLET_ICON = `<span class="group-dot" aria-hidden="true"></span>`;

const CARD_BLOB_SVG = `<div class="blob" style="bottom: 0; right: 0; width: 160px; height: 60px"><svg width="148" height="63" viewBox="0 0 148 63" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.15" fill="currentColor" d="M168.136 40.0027C182.407 38.4396 191.437 54.4053 208.31 54.7179C212.582 54.8056 215.966 54.4178 218.949 53.865C227.428 52.3121 234.514 48.8554 244.338 53.5294C245.735 54.2696 247.178 55.0323 248.943 55.9248C257.659 60.3526 267.11 64.2302 273.793 68.0475C277.695 70.2752 280.63 72.4981 282.099 74.8692C286.302 81.9359 292.798 75.3341 300.024 83.8512C300.204 84.0695 300.386 84.2988 300.568 84.5396C307.747 94.1577 313.575 98.4174 322.96 104.098C325.144 105.435 328.095 107.707 331.309 110.621C340.281 118.513 350.439 132.043 353.88 142.013C354.562 143.892 355.034 145.624 355.265 147.125C356.921 157.932 366.154 166.782 371.668 173.631C372.347 174.469 372.971 175.272 373.519 176.038C375.089 178.215 376.582 179.815 378.201 180.94C378.925 181.434 379.613 181.197 380.063 180.787C380.064 180.787 380.064 180.787 380.064 180.786C380.618 180.241 380.898 179.481 380.63 178.878C379.789 177.022 379.007 174.057 378.42 170.597C377.971 167.904 377.622 164.806 377.436 161.391C376.631 148.404 372.036 147.685 366.535 135.212C365.815 133.629 365.061 131.857 364.255 129.846C359.112 117.12 355.784 106.951 347.969 96.7672C344.841 92.7228 340.983 88.7109 335.911 84.6871C326.694 77.4352 323.934 70.518 319.032 63.0295C314.548 56.257 307.715 48.3763 292.26 42.9563C291.603 42.7298 290.964 42.506 290.34 42.2832C276.25 37.368 269.909 32.2847 263.323 25.9782C255.909 18.6882 244.32 11.2085 229.019 7.80811C228.076 7.59597 227.197 7.4056 226.241 7.21378C200.032 1.98751 168.654 3.91069 149.039 2.79547C146.036 2.62939 143.316 2.39239 140.931 2.05089C134.097 1.31293 127.653 -0.73497 114.772 0.274094C102.456 1.29096 85.3484 4.2262 70.45 13.5009C68.1181 14.9574 65.781 16.4696 63.4533 18.0445C59.8763 20.4663 56.0603 22.8467 51.9622 25.4074C49.9169 26.6898 47.7868 28.0205 45.4768 29.5639C44.3131 30.345 43.0998 31.1775 41.7125 32.2262C40.2703 33.3849 38.9378 34.1913 36.1363 37.3827C24.6331 51.1023 18.9719 65.0839 14.5765 78.851C12.4277 85.9263 10.8584 92.9068 9.92669 99.8264C8.2723 112.18 6.76834 126.587 6.18436 140.822C5.32653 160.883 6.63941 179.968 8.51938 191.282C8.7318 192.59 8.94472 193.836 9.15606 195.01C11.5214 207.738 13.038 214.146 15.9717 224.451C16.7359 227.109 17.5518 230.086 18.529 233.574C21.193 243.369 27.8724 255.587 35.9041 264.507C36.2555 264.908 36.6078 265.306 36.9596 265.7C39.0451 268.013 40.361 268.671 41.3691 268.22C42.3164 267.357 42.566 265.118 41.8707 261.983C41.8599 261.935 41.8488 261.886 41.8375 261.836C39.7527 252.886 35.5515 246.97 36.8568 241.469C39.4274 230.813 40.5126 226.604 33.7619 218.143C33.5641 217.905 33.3628 217.67 33.1544 217.427C26.2558 209.104 35.2665 203.478 33.8714 197.661C33.6137 196.455 33.2056 195.48 32.7392 194.429C31.0697 190.411 27.3864 185.028 33.2523 159.16C34.421 154.284 35.5948 149.78 36.7459 145.606C43.3395 122.34 48.2447 108.401 51.8461 98.6675C52.6148 96.643 53.3534 94.1629 54.1029 91.4443C56.5911 82.2711 59.9973 68.5603 65.5249 61.6235C64.8447 62.4105 64.7453 62.428 64.7482 62.4304C64.7632 62.4086 64.9374 62.2566 65.161 62.0824C65.6235 61.7198 66.3156 61.2327 67.0592 60.7518C68.5584 59.7807 70.3205 58.7783 72.0918 57.8825C76.7885 55.5001 83.0547 52.1321 89.9792 48.4096C98.1714 43.9433 108.389 41.4559 119.945 40.4529C123.019 40.1447 131.855 41.6168 136.524 42.9121C139.585 43.7466 142.168 44.2429 144.363 44.4669C153.895 45.4568 156.543 41.3 168.136 40.0027Z"/><path opacity="0.15" fill="currentColor" d="M151.916 70.3587C158.157 70.6891 159.382 78.9421 165.805 81.5211C172.414 84.3551 175.499 81.9741 182.234 87.7956C182.66 88.1675 183.092 88.5282 183.533 88.8826C189.053 93.4136 196.067 97.8695 197.524 101.501C199.058 105.415 202.765 102.588 205.822 107.525C205.855 107.579 205.888 107.632 205.921 107.684C208.849 112.432 211.431 114.537 215.59 117.388C217.965 119.011 222.212 123.354 225.43 128.075C227.918 131.691 229.847 135.485 230.336 137.973C231.448 143.687 237.336 147.735 239.904 150.698C240.701 151.621 241.453 152.281 242.105 152.735C242.382 152.929 242.714 152.902 242.971 152.753C242.971 152.753 242.971 152.753 242.971 152.753C243.291 152.569 243.496 152.197 243.342 151.835C242.591 150.075 241.713 147.31 241.251 143.728C240.369 137.043 237.711 137.776 234.495 129.724C233.628 127.599 232.919 125.63 232.2 123.738C230.191 118.483 228.189 113.736 222.47 108.58C218.658 105.182 217.562 102.048 215.925 98.6814C214.289 95.2941 212.164 91.5905 205.537 87.6084C198.384 83.3877 196.134 79.8796 193.16 75.5884C191.064 72.3663 188.991 68.6711 183.538 64.5735C174.597 57.6547 160.076 53.1673 149.657 52.2333C146.572 51.9075 143.884 51.5496 141.812 51.0495C133.544 49.4011 126.199 45.8551 110.278 46.3652C109.349 46.5354 108.386 46.7201 107.39 46.9312C101.569 48.0934 92.6131 49.6801 85.5448 54.997C79.6765 59.1523 73.7069 63.5151 68.7927 68.8106C67.4839 70.2274 66.0946 71.7471 64.6352 73.4293C63.113 75.2791 61.8836 76.38 59.6211 80.119C55.0363 88.8683 52.9107 99.7268 52.7277 106.538C52.6772 107.839 52.6511 108.984 52.6355 110.027C52.55 118.807 52.5274 120.939 50.4009 129.058C49.1874 133.717 48.7788 140.386 50.0009 146.116C50.5889 148.996 51.9779 148.554 52.9341 145.81C54.323 141.83 54.1497 138.443 56.0576 136.562C59.8726 132.837 61.3573 131.306 60.2889 125.783C59.2365 120.246 63.9338 118.489 63.9687 115.378C63.9931 113.455 63.0253 112.55 63.4437 108.521C63.6836 106.274 64.423 102.854 66.9707 98.1362C69.1511 94.1553 71.0892 91.6766 73.4858 88.6465C73.3432 88.9603 73.5023 88.7958 73.6863 88.6625C73.8833 88.5056 74.1304 88.3045 74.4043 88.084C74.9488 87.6468 75.552 87.1786 76.1496 86.7247C77.3595 85.8048 78.5389 84.944 79.6442 84.144C81.8565 82.547 83.7528 81.2115 85.4128 80.0742C88.2703 78.1152 92.3889 74.0165 97.0247 69.9247C99.1666 67.8959 101.728 66.5892 104.839 66.2096C106.712 65.9664 109.31 65.6902 112.633 65.3528C112.376 65.3889 112.741 65.3683 113.117 65.3934C113.519 65.4137 114.008 65.4518 114.548 65.5043C115.615 65.6085 116.834 65.7642 118.067 65.9429C120.545 66.3029 123.124 66.754 125.607 67.2402C130.564 68.2145 135.075 69.318 137.887 70.3823C141.679 71.8187 143.695 71.833 145.638 71.4571C147.298 71.0482 148.932 70.2755 151.916 70.3587Z"/></svg></div>`;

// Состояние фильтров
const scheduleFilterState = {
  time: 'all',
  level: 'all',
};

let scheduleAllLessons = [];
let scheduleRatesMap = new Map();
let scheduleTeachersMap = new Map();

// Кэш DOM-элементов
let domGrid = null;
let domFilterTime = null;
let domFilterLevel = null;

// --- Helpers -------------------------------------------------------------

function scheduleCategorizeTime(scheduleStr) {
  const match = (scheduleStr || '').match(/(\d{1,2}):(\d{2})/);
  if (!match) return null;
  const hours = parseInt(match[1], 10);
  if (hours < 12) return 'morning';
  if (hours < 17) return 'day';
  return 'evening';
}

function scheduleNormalizeLevel(levelStr) {
  const raw = (levelStr || '').trim();
  // Transliterate only level codes such as А1/В2, never normal text like "з нуля".
  if (!/^[a-zа-яіїєґ]{1,2}\s*\d+$/iu.test(raw)) return raw;

  const latinLookalikes = {
    А: 'A', В: 'B', С: 'C', Е: 'E', Н: 'H', К: 'K', М: 'M', О: 'O',
    Р: 'P', Т: 'T', Х: 'X', І: 'I',
    а: 'a', в: 'b', с: 'c', е: 'e', н: 'h', к: 'k', м: 'm', о: 'o',
    р: 'p', т: 't', х: 'x', і: 'i',
  };
  const normalized = raw
    .replace(/[АВСЕНКМОРТХІавсенкмортхі]/g, (letter) => latinLookalikes[letter]);
  return /^[a-z]\d+$/i.test(normalized) ? normalized.toUpperCase() : normalized;
}

function scheduleTranslateDays(schedule) {
  const days = {
    ПН: 'ПН',
    ВТ: 'ВТ',
    СР: 'СР',
    ЧТ: 'ЧТ',
    ПТ: 'ПТ',
    СБ: 'СБ',
    НД: 'НД',
  };
  return (schedule || '').replace(
    /(^|[^А-ЯЁІЇЄҐA-Z])(ПН|ВТ|СР|ЧТ|ПТ|СБ|НД)(?=$|[^А-ЯЁІЇЄҐA-Z])/gi,
    (match, prefix, day) => `${prefix}${days[day.toUpperCase()] || day}`
  );
}

function scheduleFormatCurrency(value) {
  const formatted = String(value ?? '')
    .toString()
    .replace(/GNH/gi, 'грн')
    .replace(/UAH/gi, 'грн')
    .replace(/грн\.?|₴/gi, 'грн')
    .trim();
  if (!formatted) return '';
  return /грн/i.test(formatted) ? formatted : `${formatted} грн`;
}

function scheduleMatchesFilters(row, excludeKey) {
  if (excludeKey !== 'level' && scheduleFilterState.level !== 'all') {
    if (row._levelKey !== scheduleFilterState.level) return false;
  }
  if (excludeKey !== 'time' && scheduleFilterState.time !== 'all') {
    if (row._timeCategory !== scheduleFilterState.time) return false;
  }
  return true;
}

// --- Filter Rendering ------------------------------------------------------

function scheduleRenderTimeFilter() {
  if (!domFilterTime) return;

  const available = new Set();
  for (let i = 0; i < scheduleAllLessons.length; i++) {
    const row = scheduleAllLessons[i];
    if (scheduleMatchesFilters(row, 'time') && row._timeCategory) {
      available.add(row._timeCategory);
    }
  }

  if (
    scheduleFilterState.time !== 'all' &&
    !available.has(scheduleFilterState.time)
  ) {
    scheduleFilterState.time = 'all';
  }

  const options = [
    'all',
    ...SCHEDULE_TIME_FILTER_ORDER.filter((t) => available.has(t)),
  ];

  domFilterTime.innerHTML = options
    .map(
      (val) =>
        `<option value="${val}"${val === scheduleFilterState.time ? ' selected' : ''}>${SCHEDULE_TIME_FILTER_LABELS[val]}</option>`
    )
    .join('');
}

function scheduleRenderLevelFilter() {
  if (!domFilterLevel) return;

  const availableRaw = new Map();
  for (let i = 0; i < scheduleAllLessons.length; i++) {
    const row = scheduleAllLessons[i];
    if (scheduleMatchesFilters(row, 'level') && row._normLevel) {
      availableRaw.set(row._levelKey, row._normLevel);
    }
  }

  if (
    scheduleFilterState.level !== 'all' &&
    !availableRaw.has(scheduleFilterState.level)
  ) {
    scheduleFilterState.level = 'all';
  }

  const knownFound = SCHEDULE_LEVEL_ORDER.filter((l) =>
    availableRaw.has(l.toLowerCase())
  );
  const knownKeys = new Set(knownFound.map((l) => l.toLowerCase()));
  const extraFound = [...availableRaw.keys()]
    .filter((k) => !knownKeys.has(k))
    .map((k) => availableRaw.get(k));

  const displayLevels = [...knownFound, ...extraFound];

  const optionsHtml = [
    `<option value="all"${scheduleFilterState.level === 'all' ? ' selected' : ''}>Всі рівні</option>`,
    ...displayLevels.map((lvl) => {
      const lvlKey = lvl.toLowerCase();
      const label = lvl;
      const selected = scheduleFilterState.level === lvlKey ? ' selected' : '';
      return `<option value="${lvlKey}"${selected}>${label}</option>`;
    }),
  ];

  domFilterLevel.innerHTML = optionsHtml.join('');
}

// --- Card Rendering ---------------------------------------------------------

function scheduleRenderGroupCards() {
  if (!domGrid) return;

  const filtered = scheduleAllLessons.filter((row) =>
    scheduleMatchesFilters(row, null)
  );

  if (filtered.length === 0) {
    domGrid.innerHTML = `<p class="schedule-empty">За цими фільтрами груп не знайдено.</p>`;
    return;
  }

  domGrid.innerHTML = filtered
    .map((row) => {
      const title = row.groupNumber ? `Група ${row.groupNumber}` : 'Група';

      // Деструктуризация классов бейджа и карты из единого словаря
      const { badge: badgeClass = 'status-a', card: cardClass = 'level-a1' } =
        SCHEDULE_LEVEL_MAP[row._normLevel] || {};

      const badgeLabel = row._normLevel;

      const rate = scheduleRatesMap.get(row._rateKey);
      const priceLine = rate
        ? `${scheduleFormatCurrency(rate.price)} / ${rate.quantity} уроків`
        : scheduleFormatCurrency(row.rate) || '—';

      const teacherLink = scheduleTeachersMap.get(row._teacherKey);
      const teacherVideoIcon = teacherLink
        ? `<span class="yt-icon" onclick="showTeacherVideo('${teacherLink}')">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
               <path fill="currentColor" d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"/>
               <path stroke="white" stroke-linecap="round" stroke-linejoin="round" d="M10.0002 18.6666H14.0002C17.3335 18.6666 18.6668 17.3333 18.6668 13.9999V9.99992C18.6668 6.66659 17.3335 5.33325 14.0002 5.33325H10.0002C6.66683 5.33325 5.3335 6.66659 5.3335 9.99992V13.9999C5.3335 17.3333 6.66683 18.6666 10.0002 18.6666Z"/>
               <path stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M10.0669 12V11.0133C10.0669 9.73999 10.9669 9.22666 12.0669 9.85999L12.9202 10.3533L13.7736 10.8467C14.8736 11.48 14.8736 12.52 13.7736 13.1533L12.9202 13.6467L12.0669 14.14C10.9669 14.7733 10.0669 14.2533 10.0669 12.9867V12Z"/>
             </svg>
           </span>`
        : '';

      return `
        <div class="group-card ${cardClass}">
          <div class="group-card-inner">
          ${CARD_BLOB_SVG}
          <div class="group-head">
            <h3>${title}</h3>
            <span class="status-pill ${badgeClass}">${badgeLabel}</span>
          </div>
          <ul class="group-rows">
            <li>${CARD_BULLET_ICON}Розклад: &nbsp;&nbsp;<b>${scheduleTranslateDays(row.schedule)}</b></li>
            <li>${CARD_BULLET_ICON}Викладач: <b>${row.teacher}</b> ${teacherVideoIcon}</li>
            <li>${CARD_BULLET_ICON}Вартість: &nbsp;<b>${priceLine}</b></li>
          </ul>
          <a href="#booking" class="group-link">
            Записатися
            <svg class="arrow-up" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.43 5.92982L20.5 11.9998L14.43 18.0698"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>
              <path d="M3.50008 12L20.3301 12"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>
          </a>
          </div>
        </div>
      `;
    })
    .join('');

  equalizeScheduleRows();
}

function scheduleRenderAll() {
  scheduleRenderTimeFilter();
  scheduleRenderLevelFilter();
  scheduleRenderGroupCards();
}

function equalizeScheduleRows() {
  const grid = document.querySelector('.schedule-grid');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.group-card'));
  if (cards.length < 2) return;

  // на мобилке сетка превращается в горизонтальный скролл (flex),
  // там карточки не выстроены в ряды — выравнивание не нужно и может сломать вёрстку
  const isGridLayout = getComputedStyle(grid).display === 'grid';
  if (!isGridLayout) return;

  // сбрасываем предыдущие подгонки перед пересчётом
  cards.forEach((card) => {
    card.querySelectorAll('.group-rows li').forEach((li) => {
      li.style.minHeight = '';
    });
  });

  // группируем карточки по их фактическому вертикальному положению (ряду)
  const rows = new Map();
  cards.forEach((card) => {
    const top = card.offsetTop;
    if (!rows.has(top)) rows.set(top, []);
    rows.get(top).push(card);
  });

  rows.forEach((rowCards) => {
    if (rowCards.length < 2) return;

    const liCount = rowCards[0].querySelectorAll('.group-rows li').length;

    for (let i = 0; i < liCount; i++) {
      let maxHeight = 0;
      rowCards.forEach((card) => {
        const li = card.querySelectorAll('.group-rows li')[i];
        if (li) maxHeight = Math.max(maxHeight, li.offsetHeight);
      });
      rowCards.forEach((card) => {
        const li = card.querySelectorAll('.group-rows li')[i];
        if (li) li.style.minHeight = `${maxHeight}px`;
      });
    }
  });
}

// --- Init ---------------------------------------------------------------

document.addEventListener('DOMContentLoaded', async () => {
  domGrid = document.getElementById('schedule-grid');
  domFilterTime = document.getElementById('filter-time');
  domFilterLevel = document.getElementById('filter-level');

  if (!domGrid) {
    console.warn('schedule.js: #schedule-grid not found — aborting');
    return;
  }

  const [lessons, rates, teachers] = await Promise.all([
    getLessons('Французька'),
    getRates(),
    getTeachers('Французька'),
  ]);

  // Индексация rates и teachers в Map для мгновенного поиска O(1)
  scheduleRatesMap = new Map(
    (rates || []).map((r) => [(r.name || '').trim().toLowerCase(), r])
  );
  scheduleTeachersMap = new Map(
    (teachers || []).map((t) => [
      (t.name || '').trim().toLowerCase(),
      t.link || '',
    ])
  );

  // Предварительная подготовка и нормализация данных уроков
  scheduleAllLessons = (lessons || []).map((row) => {
    const normLevel = scheduleNormalizeLevel(row.level);
    return {
      ...row,
      _normLevel: normLevel,
      _levelKey: normLevel.toLowerCase(),
      _timeCategory: scheduleCategorizeTime(row.schedule),
      _rateKey: (row.rate || '').trim().toLowerCase(),
      _teacherKey: (row.teacher || '').trim().toLowerCase(),
    };
  });

  scheduleRenderAll();

  domFilterTime?.addEventListener('change', (e) => {
    scheduleFilterState.time = e.target.value;
    scheduleRenderAll();
  });

  domFilterLevel?.addEventListener('change', (e) => {
    scheduleFilterState.level = e.target.value;
    scheduleRenderAll();
  });

  // выравниваем высоту строк в карточках при изменении ширины окна
  let scheduleResizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(scheduleResizeTimeout);
    scheduleResizeTimeout = setTimeout(equalizeScheduleRows, 150);
  });
});
