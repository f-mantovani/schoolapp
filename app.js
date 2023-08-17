// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

//session added
require('./config/session.config')(app);

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "schoolapp";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

app.use((req,res,next)=>{
    app.locals.currentUser=req.session.currentUser

    app.locals.isTeacher=false
    app.locals.isStudent=false
    app.locals.isAdmin=false
    if (req.session.currentUser?.type==="Teacher"){
        app.locals.isTeacher=true    
    } else if (req.session.currentUser?.type==="Student"){
        app.locals.isStudent=true    
    } else if (req.session.currentUser?.type==="Admin"){ 
        app.locals.isAdmin=true
    }
    
    next()
})

app.locals.defaultProfileImage = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const books = require('./routes/books.routes')
app.use('/book',books)

const subjects = require('./routes/subjects.routes')
app.use('/subject',subjects)

const students = require('./routes/students.routes')
app.use('/student',students)

const teachers = require('./routes/teachers.routes')
app.use('/teacher',teachers)

app.use('/',require('./routes/auth.routes'))

app.use('/',require('./routes/gallery.routes'))

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
