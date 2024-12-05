export const customLocale = {
  months: [
    'Janvier',
    'Fevrier',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Decembre',
  ],
  weekDays: [
    {
      name: 'Dimanche',
      short: 'Dim',
      isWeekend: true,
    },
    {
      name: 'Lundi',
      short: 'Lun',
    },
    {
      name: 'Mardi',
      short: 'Mar',
    },
    {
      name: 'Mercredi',
      short: 'Mer',
    },
    {
      name: 'Jeudi',
      short: 'Jeu',
    },
    {
      name: 'Vendredi',
      short: 'Ven',
    },
    {
      name: 'Samedi',
      short: 'Sam',
      isWeekend: true,
    },
  ],
  weekStartingIndex: 0,
  getToday(gregorainTodayObject: any) {
    return gregorainTodayObject;
  },
  toNativeDate(date: { year: number; month: number; day: number | undefined }) {
    return new Date(date.year, date.month - 1, date.day);
  },
  getMonthLength(date: { year: number; month: number }) {
    return new Date(date.year, date.month, 0).getDate();
  },
  transformDigit(digit: any) {
    return digit;
  },
  digitSeparator: ',',
  yearLetterSkip: 0,
  isRtl: false,
  nextMonth: '',
  previousMonth: '',
  openMonthSelector: '',
  openYearSelector: '',
  closeMonthSelector: '',
  closeYearSelector: '',
  from: '',
  to: '',
  defaultPlaceholder: '',
};

export const utils = (): any => {
  const getToday = (): { year: number; month: number; day: number } => {
    const today: Date = new Date();
    return {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
  };
  return { getToday };
};

export const defaultFrom = {
  year: utils().getToday().year,
  month: utils().getToday().month,
  day: utils().getToday().day,
};

export const defaultTo = {
  year: utils().getToday().year,
  month: utils().getToday().month,
  day: utils().getToday().day,
};

export const defaultValue = {
  year: utils().getToday().year,
  month: utils().getToday().month,
  day: utils().getToday().day,
};

export const getfullMonthByIndex = (alpha: any) => {
  let month = '';
  let monthLong = '';

  switch (alpha) {
    case 1:
      month = 'Janv.';
      monthLong = 'janvier';
      break;
    case 2:
      month = 'Févr.';
      monthLong = 'février';
      break;
    case 3:
      month = 'Mars';
      monthLong = 'mars';
      break;
    case 4:
      month = 'Avril';
      monthLong = 'avril';
      break;
    case 5:
      month = 'Mai';
      monthLong = 'mai';
      break;
    case 6:
      month = 'Juin';
      monthLong = 'juin';
      break;
    case 7:
      month = 'Juill.';
      monthLong = 'juillet';
      break;
    case 8:
      month = 'Août';
      monthLong = 'août';
      break;
    case 9:
      month = 'Sept.';
      monthLong = 'septembre';
      break;
    case 10:
      month = 'Oct.';
      monthLong = 'octobre';
      break;
    case 11:
      month = 'Nov.';
      monthLong = 'novembre';
      break;
    case 12:
      month = 'Déc';
      monthLong = 'décembre';
      break;
    default:
      month = '';
      monthLong = '';
      break;
  }

  return {
    month,
    monthLong,
  };
};
