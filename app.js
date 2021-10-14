const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs"); // sets EJS to work as the view engine
app.use(bodyParser.urlencoded({ extended: true })); // sets bodyParser
app.use(express.static("public")); // tells express to serve the public folder for styling or other static sites

let items = ["Buy food", "Cook food", "Eat food"];

app.get("/", function (req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  let day = today.toLocaleDateString("en-US", options);

  res.render("list", { day: day, newItems: items });
});

app.post("/", function (req, res) {
  // this is fired by the form in the list.ejs file. it stores the value of the form's input in a variable called item.
  let item = req.body.newItem;
  items.push(item); // and then it pushes it into the items global array
  res.redirect("/"); // refreshes the site, redirecting to the homepage (now showing up with the new, added item)
});

app.listen(3000, function () {
  console.log("server started at port 3000");
});
