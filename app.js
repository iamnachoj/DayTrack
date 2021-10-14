// Main dependencies are express, bodyParser and Mongoose. It is also needed to import a custom module called date.js.
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Here we are requiring the custom module that is located in our same directory, that is why is handy to write __dirname
const date = require(__dirname + "/date.js"); //this will allow this file to use any exports from date.js
const app = express();

app.set("view engine", "ejs"); // sets EJS to work as the view engine
app.use(bodyParser.urlencoded({ extended: true })); // sets bodyParser
app.use(express.static("public")); // tells express to serve the public folder for styling or other static sites

// console.log(date.getDate()); // Use this for testing what date.getDate() or date.getTime() does.

//mock data
// const items = ["Buy food", "Cook food", "Eat food"]; // it is possible to store arrays in const variables because in JavaScript consts allow to get their data changed by pull and push
// const bookItems = ["The Alchemist", "The four"];

//mongoDB connection via mongoose to the local DB
mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
});

//mongoose Models (models are capitalized). They come to be the collection. see more on mongoose docs.
const Item = mongoose.model("Item", { name: String });
const BookItem = mongoose.model("BookItem", { name: String });
//Mongoose Documents to be included when DB is empty
const item1 = new Item({
  name: "Welcome to your todo list!",
});
const item2 = new Item({
  name: "Hit the + button to add a new item",
});
const item3 = new Item({
  name: "<-- Hit this to delete an item",
});
const defaultItems = [item1, item2, item3];
Item.find({}, function (err, foundItems) {
  if (foundItems.length === 0) {
    Item.insertMany(defaultItems, function (err) {
      // inserts the items mentioned before in case there isn't any already
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully added");
      }
    });
  }
});
//Functionality for the home route (/)
app.get("/", function (req, res) {
  //day variable taken from date module
  let day = date.getDate(); // function taken from the date.js module. It store the date in a specific format.
  Item.find({}, function (err, foundItems) {
    // this function Item.find() goes through all items in the collection (the empty object means no filter are implemented.)
    //render the homepage list taken from EJS files
    res.render("list", { listTitle: day, newItems: foundItems });
  });
});

app.get("/:customListName", function (req, res) {
  console.log(req.params.customListName);
});

app.post("/", function (req, res) {
  // this fires by the form in the list.ejs file. it stores the value of the form's input in a variable called item.
  let itemName = req.body.newItem;

  let item = new Item({
    // this creates the document out of the fetched data received from the req.body.newItem
    name: itemName,
  });
  item.save(); // and then it pushes it into the items collection on DB
  res.redirect("/"); // refreshes the site, redirecting to the homepage (now showing up with the new, added item)
});

//functionality for deleting lists items
app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully removed");
    }
  });
  res.redirect("/");
});

//Functionality for the about route
app.get("/About", function (req, res) {
  res.render("about");
});

//server
app.listen(3000, function () {
  console.log("server started at port 3000");
});
