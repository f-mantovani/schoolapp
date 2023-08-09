const express = require('express');
const Student = require('../models/Student.model');
const router = express.Router();

router.get("/new-student", (req, res) => {
    res.render('new-student')
})


router.post("/new-student", (req, res) => {
    const { name, address, phoneNumber, email } = req.body
    //const students = req.body.book

    Student.create({ name, address, phoneNumber, email })
        .then(() => {
            res.redirect("/student")
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get("/:id/details", (req, res, next) => {
    Student.findById(req.params.id)
        .then(studentToBeShowed => {
            //const arrayBooks = subjectToBeShowed.books;        
            //const bookPromises = [];            
            res.render("show-student", studentToBeShowed)
        })
        .catch(err => {
            console.log(err);
            // Tratar erro adequadamente
        });

})

router.post('/:id/delete', (req, res) => {
    console.log(req.params)
    Student.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/student')
        })
        .catch(err => {
            console.log(err)
        })
})

router.get("/", (req, res) => {
    Student.find()
        .then((allStudents) => {
            res.render('student', { allStudents })
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router