// Main dependencies are express, bodyParser and Mongoose. It is also needed to import lodash and a custom module called date.js.
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
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
// mongoose.connect("mongodb://localhost:27017/todolistDB", {
//   useNewUrlParser: true,
// });

//mongoDB connection via mongoose to the ATLAS  DB
mongoose.connect("mongodb+srv://iamnachoj:Ladefinitiva2012@cluster0.cbnyr.mongodb.net/todolistDB", {
  useNewUrlParser: true,
});

//Schemas
const itemsSchema = { name: String };
const listSchema = {
  name: String,
  items: [itemsSchema],
};

//mongoose Models (models are capitalized). They come to be the collection. see more on mongoose docs.
const Item = mongoose.model("Item", itemsSchema);
const List = mongoose.model("List", listSchema);
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
      // inserts the items mentioned before in case there isn't any already.
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

//Express Route Parameters
app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName);
  //this below, creates a new document of a list, and stores it into the collection List (but only if it does not exist already)
  List.findOne({ name: customListName }, function (err, results) {
    // here it tries to find it to check if it exists already or not.
    if (results) {
      console.log("exists already"); // if it exists already, it just console logs it and does not create it again
      res.render("list", { listTitle: results.name, newItems: results.items });
    } else {
      const list = new List({
        name: customListName,
        items: defaultItems,
      });
      list.save();
      res.redirect("/" + customListName);
    }
  });
});

//functionality for posting items
app.post("/", function (req, res) {
  // this fires by the form in the list.ejs file. it stores the value of the form's input in a variable called item.
  let itemName = req.body.newItem;
  let listName = req.body.list;
  let item = new Item({
    // this creates the document out of the fetched data received from the req.body.newItem
    name: itemName,
  });
  if (listName === date.getDate()) {
    item.save(); // and then it pushes it into the items collection on DB
    res.redirect("/"); // refreshes the site, redirecting to the homepage (now showing up with the new, added item)
  } else {
    List.findOne({ name: listName }, function (err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

//functionality for deleting lists items
app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox; // takes the id from the item checked
  const listName = req.body.listName; // takes the name of the list from the hidden input
  if (listName === date.getDate()) {
    // if the list is the home-original one, it finds the item and removes it.
    Item.findByIdAndRemove(checkedItemId, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully removed");
      }
    });
    res.redirect("/");
    // However, if the item is in another list, means it is in a custom list
  } else {
    //with this function below, we find a list in lists collection that has the name of the title and update it (pulling out the item from the list)
    List.findOneAndUpdate(
      { name: listName }, // the condition of the name of the title. This is the way we find the correct list
      { $pull: { items: { _id: checkedItemId } } }, // then the pull method from Mongo. This makes a pull from the items within the list, with the condition of the _id
      function (err, foundList) {
        if (!err) {
          res.redirect("/" + listName); // redirect to the custom path
        }
      }
    );
  }
});

//Functionality for the about route
app.get("/About", function (req, res) {
  res.render("about");
});

//server
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, console.log("port started at port " + port));