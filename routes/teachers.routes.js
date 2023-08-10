const express = require('express');
const Teacher = require('../models/Teacher.model');
const Subject = require('../models/Subject.model');
const router = express.Router();

router.get("/", (req, res) => {
    Teacher.find()
        .then((allTeachers) => {
            res.render('teacher', { allTeachers })
        })
        .catch((err) => {
            console.log(err)
        })
})


module.exports = router