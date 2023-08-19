const session = require('express-session');
const MongoStore = require("connect-mongo");
require("dotenv").config() 
// since we are going to USE this middleware in the app.js,
// let's export it and have it receive a parameter

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/schoolapp";
module.exports = app => {

  // <== app is just a placeholder here
  // but will become a real "app" in the app.js
  // when this file gets imported/required there
 
  // use session
  app.use(
    session({
      secret: process.env.SESS_SECRET || "super hyper secret key",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: MONGO_URI,
      }),
    })
  );
};