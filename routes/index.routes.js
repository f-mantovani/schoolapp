const express = require('express');
const router = express.Router();

/* GET home page */
// router.get('/', (req, res) => {
//   const userType = req.session.userType || 'guest';
//   console.log(req.session.userType)
//   if (userType === 'guest') {
    
//     res.render('index', { userType });
//   } else {
//     res.render('profile', { userType });
//   }
// });

// router.get('/', (req, res) => {
    
// });

router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
