const express = require('express');
const router = express.Router();
const bcryptjs = require("bcryptjs");
const mongoose = require('mongoose')
const saltRounds = 10;
const Student = require('../models/Student.model');
const Teacher = require('../models/Teacher.model');

router.get("/signup", (req, res) => {
    res.render('auth/signup')
})

router.post("/signup", (req, res) => {
    const { name, email, password, type } = req.body

    if (!name || !email || !password || !type){
        res.render('auth/signup',{errorMessage: "All the fields are mandatory. Please, fill it in."})
        return
    }

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
      res.render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
      return;
    }

    bcryptjs.genSalt(10)
        .then((salt) => {
            bcryptjs.hash(password, salt)
                .then((hashedPassword) => {

                    let Mymodel;

                    if (type === "Teacher") {
                        Mymodel = require('../models/Teacher.model');
                    } else {
                        Mymodel = require('../models/Student.model');
                    }

                    return Mymodel.create({ name, email, password: hashedPassword, type })
                })
                .then((user) => {
                    req.session.currentUser = user
                    res.redirect('/profile')
                })
                .catch((err) => {
                    console.log(err)
                    if (err instanceof mongoose.Error.ValidationError) {
                        res.render('auth/signup', { errorMessage: err.message });
                    } else if(err.code === 11000){
                        res.render('auth/signup',{ errorMessage: "Email already in use, please, choose another one, or Sign in."})
                    }
                })

        })
        .catch((err) => {
            console.log(err)
            if (err instanceof mongoose.Error.ValidationError) {
                res.render('auth/signup', { errorMessage: err.message });
            }
        })
})

router.get("/signin", (req, res) => {
    res.render('auth/signin')
})

router.post("/signin", (req, res) => {    
    const {  name, email, password, type } = req.body

    console.log(req.session)


    if ( !name || !email || !password ) {
        res.render('auth/signin',{errorMessage: "All the fields are mandatory. Please, fill it in."})
        return
    }

    let Mymodel;

    if (type==="Teacher") {
        Mymodel = require('../models/Teacher.model');
    } else {
        Mymodel = require('../models/Student.model');
    }

    Mymodel.findOne({ email:email })
    .then((user) => {
      console.log(email)
      console.log(user)
      if (!user) {
        res.render('auth/signin', { errorMessage: 'Email is not registered. Try with other email.' });
        return;
      } else if (bcryptjs.compareSync(password, user.password)) {
        //res.render('users/profile', { user });
        //rendering with session
        req.session.currentUser = user
        //console.log(req.session)
        res.redirect('/profile')
      } else {
        res.render('auth/signin', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(err => {
        console.log(err)
    });
});

router.post('/logout', (req, res, next) => {
    req.session.destroy(err => {    
      if (err) next(err);
      res.redirect('/');
    });
  });

router.get('/profile',(req,res)=>{
    //console.log(req.session)
    res.render('users/profile',{ currentUser:req.session.currentUser })
})

router.get('/complete',(req,res)=>{ 

    const type = req.session.currentUser.type
    const saveId = req.session.currentUser._id


    if (type==="Student") {
        res.render('users/complete-student',{ currentUser:req.session.currentUser })
    } else if (type==="Teacher"){
        res.render('users/complete-teacher',{ currentUser:req.session.currentUser })
    } else {
        res.render('users/admin')
    }       
})

router.post('/completeteacher/:id/edit', (req, res) => {
    const { address, phoneNumber } = req.body
    Teacher.findByIdAndUpdate(req.params.id, { address, phoneNumber })
      .then((updateTeacher) => {
        res.redirect('/profile')
      })
      .catch(err => {
        console.log(err)
      })
  })

module.exports = router