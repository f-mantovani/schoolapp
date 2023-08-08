const express = require('express');
const Student = require('../models/Student.model');
const router = express.Router();

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