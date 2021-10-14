const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//Here we are requiring a custom module that is located in our same directory, that is why is handy to write __dirname
const date = require(__dirname + "/date.js"); //this will allow this file to use any exports from date.js
const app = express();

app.set("view engine", "ejs"); // sets EJS to work as the view engine
app.use(bodyParser.urlencoded({ extended: true })); // sets bodyParser
app.use(express.static("public")); // tells express to serve the public folder for styling or other static sites

// console.log(date.getDate()); // Use this for testing what date.getDate() or date.getTime() does.

//mock data
// const items = ["Buy food", "Cook food", "Eat food"]; // it is possible to store arrays in const variables because in JS consts allow to get their data changed by pull and push
// const bookItems = ["The Alchemist", "The four"];

//Functionality for the home route (/)
app.get("/", function (req, res) {
  //day variable taken from date module
  let day = date.getDate();
  //render the homepage list taken from EJS files
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
