const express = require('express');
const Teacher = require('../models/Teacher.model');
const Subject = require('../models/Subject.model');
const router = express.Router();

router.get("/:id/details", (req, res, next) => {
    Teacher.findById(req.params.id).populate('subjects')
        .then(teacherToBeShowed => {      
            res.render("show-teacher", teacherToBeShowed)
        })
        .catch(err => {
            console.log(err);
        });
})

router.get('/:id/edit', (req, res) => {
    Teacher.findById(req.params.id).populate('subjects')
      .then((oneTeacherToBeEdited) => {
        res.render('edit-teacher', oneTeacherToBeEdited)
      })
      .catch((err) => {
        console.log(err)
      })
  })

  router.post('/:id/edit', (req, res) => {
    const { name, address, phoneNumber} = req.body
    Teacher.findByIdAndUpdate(req.params.id, { name, address, phoneNumber })
      .then((updatedTeacher) => {
        res.redirect('/teacher')
      })
      .catch(err => {
        console.log(err)
      })
  })

router.post('/:id/delete', (req, res) => {
    Teacher.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/teacher')
        })
        .catch(err => {
            console.log(err)
        })
})

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