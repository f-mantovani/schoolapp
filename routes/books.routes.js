const express = require('express');
const Subject = require('../models/Subject.model');
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

  let superUser = false;

  if (req.session.currentUser?.type==="Admin"){
     superUser = true;
  }

  Book.find()
    .then((allBooks) => {
      res.render("book", { allBooks, superUser });
    })
    .catch((err) => {
      console.log(err)
    })
});

router.get('/:id/edit', (req, res) => {
  Book.findById(req.params.id)
    .then((oneBookToBeEdited) => {
      res.render('edit-book', oneBookToBeEdited)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/:id/edit', (req, res) => {
  const { name, author, year, price } = req.body
  Book.findByIdAndUpdate(req.params.id, { name, author, year, price })
    .then((updatedBook) => {
      res.redirect('/book')
    })
    .catch(err => {
      console.log(err)
    })
})

router.post('/:id/delete', (req, res) => { 
  Subject.updateMany(
    { books: req.params.id },
    { $pull: { books: req.params.id } })
    .then((subjectsFound) => {
      console.log("id: " + req.params.id)

      return Book.findByIdAndDelete(req.params.id)

    })
    .then((updatedBooks) => {
      console.log(updatedBooks)
      res.redirect('/book')
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router


