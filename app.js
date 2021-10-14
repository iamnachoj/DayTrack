const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

let item = "";
app.get("/", function (req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  let day = today.toLocaleDateString("en-US", options);

  res.render("list", { day: day, newListItem: item });
});

app.post("/", function (req, res) {
  item = req.body.newItem;
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("server started at port 3000");
});
