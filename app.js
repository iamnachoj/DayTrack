const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs"); // sets EJS to work as the view engine
app.use(bodyParser.urlencoded({ extended: true })); // sets bodyParser
app.use(express.static("public")); // tells express to serve the public folder for styling or other static sites

//mock data
let items = ["Buy food", "Cook food", "Eat food"];
let bookItems = ["The Alchemist", "The four"];

//Functionality for the home route (/)
app.get("/", function (req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  let day = today.toLocaleDateString("en-US", options);

  res.render("list", { listTitle: day, newItems: items });
});

app.post("/", function (req, res) {
  // this fires by the form in the list.ejs file. it stores the value of the form's input in a variable called item.
  let item = req.body.newItem;
  //now it checks whether the button from the form hast the Books Title or the date from the basic todo List. depending on which one, it will post the typed data in one list or the other.
  if (req.body.button === "Books to read") {
    bookItems.push(item);
    res.redirect("/Books");
  } else {
    items.push(item); // and then it pushes it into the items global array
    res.redirect("/"); // refreshes the site, redirecting to the homepage (now showing up with the new, added item)
  }
});

//Functionality for the Books route
app.get("/Books", function (req, res) {
  res.render("list", { listTitle: "Books to read", newItems: bookItems });
});

//Functionality for the about route
app.get("/About", function (req, res) {
  res.render("about");
});

//server
app.listen(3000, function () {
  console.log("server started at port 3000");
});
