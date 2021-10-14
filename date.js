// this line of code allows us to export from this file the function getDate, which will be assigned to a variable in the app.js file for its use
// The idea is to export it on app.js to use it in that file.
exports.getDate = function () {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return today.toLocaleDateString("en-US", options);
};

exports.getTime = function () {
  const today = new Date();
  return today.toLocaleTimeString("en-US");
};
