const express = require('express');
const Book = require('../models/Book.model');
const router = express.Router();

/* GET home page */

router.get("/new-book", (req, res) => {
  res.render("new-book")
})

router.post("/new-book", (req, res) => {
  const { name, author, year, price } = req.body
  Book.create({ name, author, year, price })
    .then((newBook) => {
      res.redirect("/book")
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get("/", (req, res, next) => {
  Book.find()
    .then((allBooks) => {
      res.render("book", { allBooks });
    })
    .catch((err) => {
      console.log(err)
    })
});


module.exports = router;