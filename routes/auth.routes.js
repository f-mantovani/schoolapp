const express = require('express');
const router = express.Router();
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

router.get("/signup", (req, res) => {
    res.render('auth/signup')
})

router.post("/signup", (req, res) => {
    const { name, email, password, type } = req.body
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
                   res.render(name)
                })

        })


        .catch((err) => {
            console.log(err)
        })

})

module.exports = router