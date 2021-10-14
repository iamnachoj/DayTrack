// this line of code allows us to export from this file the function getDate, which will be assigned to a variable in the app.js file for its use
module.exports.getDate = getDate;
module.exports.getTime = getTime;
// the reason why we don't write getDate() with those parentesis, is because that would call the function here, and that is not what is needed.
// The idea is to export it on app.js to use it in that file.

function getDate() {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  let day = today.toLocaleDateString("en-US", options);
  return day;
}

function getTime() {
  let today = new Date();
  let time = today.toLocaleTimeString("en-US");
  return time;
}
