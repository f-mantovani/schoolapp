const express = require('express');
const router = express.Router();
const bcryptjs = require("bcryptjs");
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
                .then(() => {
                    res.redirect('/profile')
                })

        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router