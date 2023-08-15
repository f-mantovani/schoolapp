const express = require('express');
const Student = require('../models/Student.model');
const router = express.Router();

router.get("/gallery", (req, res) => {
    Student.find()
        .then((allStudents) => {
            res.render('gallery', { allStudents })
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router