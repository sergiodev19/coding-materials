const moment = require("moment");

function colculate(compirationDate) {
  let seconds = moment().diff(compirationDate, "seconds");
  let minutes = moment().diff(compirationDate, "minutes");
  let hours = moment().diff(compirationDate, "hours");
  let days = moment().diff(compirationDate, "days");

  if (seconds && !minutes) {
    return `${seconds} seconds ago`;
  }
  if (minutes && !hours) {
    if (seconds % 60 > 30) return `${minutes + 1} minutes ago`;

    return `${minutes} minutes ago`;
  }
  if (hours && !days) {
    if (minutes % 60 > 30) return `${hours + 1} hours ago`;

    return `${hours} hours ago`;
  }
  if (days && days < 30) {
    if (hours % 24 > 12) return `${days + 1} days ago`;

    return `${days} days ago`;
  }
  if (days >= 30 && days / 30 < 12) {
    return `${Math.round(days / 30)} months ago`;
  }

  return "Over year ago";
}

console.log(colculate(moment("2019-04-15T00:45:15.836")));

// module.exports = colculate;
