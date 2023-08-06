const express = require('express');
const Subject = require('../models/Subject.model');
const Book = require('../models/Book.model');
const router = express.Router();

router.get("/new-subject", (req, res) => {
    res.render("new-subject")
})

router.post("/new-subject", (req, res) => {
    const { name, pricePerHour } = req.body
    Subject.create({ name, pricePerHour })
        .then((newSubject) => {
            res.redirect("/subject")
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get("/:id/details", (req, res, next) => {
    console.log(req.params.id)
    Subject.findById(req.params.id)
        .then((subjectToBeShowed) => {
            res.render("show-subject",  subjectToBeShowed);
        })
        .catch((err) => {
            console.log(err)
        })
});


router.get("/", (req, res, next) => {
    Subject.find()
        .then((allSubjects) => {
            res.render("subject", { allSubjects });
        })
        .catch((err) => {
            console.log(err)
        })
});

module.exports = router