const express = require('express');
const router = express.Router();
const bcryptjs = require("bcryptjs");
const mongoose = require('mongoose')
const saltRounds = 10;

router.get('/profile',(req,res)=>{
    res.render('users/profile')
})

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

                    let myModel;

                    if (type === "Teacher") {
                        myModel = require('../models/Teacher.model');
                    } else {
                        myModel = require('../models/Student.model');
                    }

                    return myModel.create({ name, email, password: hashedPassword, type })
                })
                .then(() => {
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

    if ( !name || !email || !password ) {
        res.render('auth/signin',{errorMessage: "All the fields are mandatory. Please, fill it in."})
        return
    }

    let myModel;

    if (type==="Teacher") {
        myModel = require('../models/Teacher.model');
    } else {
        myModel = require('../models/Student.model');
    }

    myModel.findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/signin', { errorMessage: 'Email is not registered. Try with other email.' });
        return;
      } else if (bcryptjs.compareSync(password, user.password)) {
        res.render('users/profile', { user });
      } else {
        res.render('auth/signin', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
});


module.exports = router