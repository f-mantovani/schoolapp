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

router.get('/:id/edit',(req,res)=>{
  console.log(req.params)
   Book.findById(req.params.id)
   .then((oneBookToBeEdited)=>{
      console.log(oneBookToBeEdited)
      res.render('edit-book',oneBookToBeEdited)
   })
   .catch((err)=>{
      console.log(err)
   })
})

router.post('/:id/edit',(req,res)=>{
  console.log("req.body")
  console.log(req.body)

  console.log("req.params")
  console.log(req.params)

  const {name, author, year, price} = req.body

  Book.findByIdAndUpdate(req.params.id,{ name, author, year, price})
  .then((updatedBook)=>{
      res.redirect('/book')
  })
  .catch(err=>{
      console.log(err)
  })
})

router.post('/:id/delete',(req,res)=>{
  console.log("id: "+req.params.id)
  Book.findByIdAndDelete(req.params.id)
  .then(()=>{
      res.redirect('/book')
  })
  .catch(err=>{
      console.log(err)
  })
})

module.exports = router


