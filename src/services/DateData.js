const daysOfTheWeek = [
  'M',
  'T',
  'W',
  'T',
  'F',
  'S',
  'S',
];

function getMonthDays(_month) {
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  return months[_month]
}

//note: month is 0 based, just like Dates in js
function getWeeksInMonth(year, month) {
  const weeks = [],
    firstDate = new Date(year, month, 1),
    lastDate = new Date(year, month + 1, 0),
    numDays = lastDate.getDate();

  let dayOfWeekCounter = firstDate.getDay();

  for (let date = 1; date <= numDays; date++) {
    //if (dayOfWeekCounter === 0 || weeks.length === 0) {
    // create row on Monday start of week by setting dayOfWeekCounter === 1
    if (dayOfWeekCounter === 1 || weeks.length === 0) {
      weeks.push([]);
    }
    weeks[weeks.length - 1].push(date);
    dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
  }

  return weeks
    .filter((w) => !!w.length)
    .map((w) => ({
      start: w[0],
      end: w[w.length - 1],
      dates: w,
    }));
}

export {
  getWeeksInMonth,
  getMonthDays,
  daysOfTheWeek,
}

//exports.getWeeksInMonth = getWeeksInMonth;
