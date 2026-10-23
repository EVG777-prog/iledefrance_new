let cachedLesson = null;
let cachedRates = null;
const cachedTeachers = new Map();
let cachedCountGoogleReviews = null;

async function getDataFromGoogleSheet(page, range, sheet_id) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/${page}!${range}?key=${GOOGLE_DOCS_API}`;

  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Unable to load Google Sheet range ${page}!${range}:`, error);
    return null;
  }
}

function getSheduleArray(data) {
  return data.map((lesson) => {
    return {
      level: lesson[0],
      timeStart: lesson[4] ?? '',
      schedule: lesson[1],
      teacher: lesson[2],
      rate: lesson[3],
      groupNumber: lesson[5] ?? '',
    };
  });
}

function getRatesArray(data) {
  return data.map((rate) => {
    return {
      name: rate[0],
      price: rate[1],
      duration: rate[2],
      details: rate[3] ? rate[3].split(`\n`) : '',
      quantity: rate[4],
    };
  });
}

function getTeachersArray(data) {
  return data
    .filter((teacher) => teacher[0] || teacher[1] || teacher[2] || teacher[3])
    .map((teacher) => {
      // Support the current A:name, B:description, C:photo, D:YouTube layout
      // and the simpler A:name, B:description, C:YouTube layout.
      const thirdCellIsVideo = /^https?:\/\//i.test(teacher[2] || '') &&
        /youtu(?:\.be|be\.com)/i.test(teacher[2]);
      return {
        name: teacher[0] || '',
        description: teacher[1] || '',
        photo: thirdCellIsVideo ? teacher[3] || '' : teacher[2] || '',
        link: thirdCellIsVideo ? teacher[2] : teacher[3] || '',
      };
    });
}

async function getLessons(pageTitle) {
  let pageSheet;
  switch (pageTitle) {
    case 'Французька':
      pageSheet = 'French_lessons';
      break;
    case 'Іспанська':
      pageSheet = 'Spanish_lessons';
      break;
    case 'Італійська':
      pageSheet = 'Italian_lessons';
      break;
    case 'Німецька':
      pageSheet = 'German_lessons';
      break;
    case 'Англійська':
      pageSheet = 'English_lessons';
      break;
  }
  if (!SHEET_ID) return [];

  if (cachedLesson === null) {
    try {
      // Ваш код для получения данных, например, запрос к серверу
      const dataLessons = await getDataFromGoogleSheet(
        pageSheet,
        'A2:F333',
        SHEET_ID
      );
      const data = getSheduleArray(dataLessons.values);

      cachedLesson = data; // Кэшируем данные
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  return cachedLesson;
}

async function getRates() {
  if (cachedRates === null) {
    try {
      // Ваш код для получения данных, например, запрос к серверу
      const dataRates = await getDataFromGoogleSheet(
        'Rates',
        'A2:E333',
        SHEET_ID
      );
      if (!dataRates) return [];
      const data = getRatesArray(dataRates.values || []);

      cachedRates = data; // Кэшируем данные
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  console.log('cachedRates:', cachedRates);
  return cachedRates;
}

async function getTeachers(pageTitle) {
  let pageSheet;
  switch (pageTitle) {
    case 'Французька':
      pageSheet = 'French_teachers';
      break;
    case 'Іспанська':
      pageSheet = 'Spanish_teachers';
      break;
    case 'Італійська':
      pageSheet = 'Italian_teachers';
      break;
    case 'Німецька':
      pageSheet = 'German_teachers';
      break;
    case 'Англійська':
      pageSheet = 'English_teachers';
      break;
  }
  if (!SHEET_ID || !pageSheet) return [];

  if (!cachedTeachers.has(pageSheet)) {
    try {
      const dataTeachers = await getDataFromGoogleSheet(
        pageSheet,
        'A2:D333',
        SHEET_ID
      );
      if (!dataTeachers) return [];
      const data = getTeachersArray(dataTeachers.values || []);
      cachedTeachers.set(pageSheet, data);
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  return cachedTeachers.get(pageSheet);
}

async function getCountGoogleReviews() {
  if (!SHEET_ID) return [];

  if (cachedCountGoogleReviews === null) {
    try {
      // Ваш код для получения данных, например, запрос к серверу
      const dataCountGoogleReviews = await getDataFromGoogleSheet(
        'Settings',
        'B1:B1',
        SHEET_ID
      );
      const data = dataCountGoogleReviews.values;

      cachedCountGoogleReviews = data; // Кэшируем данные
    } catch (error) {
      console.error('Error fetching data:', error);
      return 100;
    }
  }
  return cachedCountGoogleReviews;
}
