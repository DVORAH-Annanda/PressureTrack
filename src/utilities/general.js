const isObjectEmpty = (obj) => {

  return Object.keys(obj).length === 0 && obj.constructor === Object;
}; 

const convertUnixDateTime = (unixTimeStamp) => {
  // Create new JS Date object based on timestamp multiplied by 1000 so that argument is in milliseconds, not seconds.
 
  date = `${formatDateString(new Date(unixTimeStamp * 1000))} ${formatTime(new Date(unixTimeStamp * 1000))} `;

  return date;
};

const formatDateString = (date) => {

  let d = new Date(date);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthIndex = d.getMonth();
  let dateString = [
    date.getDate(),
    " ",
    months[monthIndex],
    " ",    
    date.getFullYear(),
  ].join("");

  return dateString;
};

const formatTime = (date) => {
  let d = new Date(date);

  let formatTime = [
    getDateHours(d),
    ":",
    getDateMinutes(d),
    ":",
    getDateSeconds(d),
  ].join("");

  return formatTime;
};

const formatDateTime = (date) => {
  let d = new Date(date);

  let formatDateTime = [
    d.getFullYear(),
    "-",
    getDateMonth(d),
    "-",
    getDateDay(d),
    " ",
    getDateHours(d),
    ":",
    getDateMinutes(d),
    ":",
    getDateSeconds(d),
  ].join("");

  return formatDateTime;
};

function getDateMonth(date) {
  let d = new Date(date);
  let month = d.getMonth() + 1;

  if (month.toString().length < 2) month = "0" + month.toString();

  return month;
}

function getDateDay(date) {
  let d = new Date(date);
  let day = d.getDate();

  if (day.toString().length < 2) day = "0" + day.toString();

  return day;
}

function getDateHours(date) {
  let d = new Date(date);
  let hours = d.getHours();

  if (hours.toString().length < 2) hours = "0" + hours.toString();

  return hours;
}

function getDateMinutes(date) {
  let d = new Date(date);
  let minutes = d.getMinutes();

  if (minutes.toString().length < 2) minutes = "0" + minutes.toString();

  return minutes;
}

function getDateSeconds(date) {
  let d = new Date(date);
  let seconds = d.getSeconds();

  if (seconds.toString().length < 2) seconds = "0" + seconds.toString();

  return seconds;
}

export { isObjectEmpty, convertUnixDateTime, formatDateTime };
