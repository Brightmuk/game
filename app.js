const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const bcrypt = require('bcryptjs')
const passport = require('passport')
const session = require('express-session');
const createPwa = require('create-pwa')



const {getHomePage,layout} = require('./routes/index');

const port = 8000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'bright',  
    password: 'beatsbydre',
    database: 'game'
});


// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())


// routes for the app
app.get('/' ,getHomePage);
app.get('/layout',layout);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
//static files
app.use(express.static(path.join(__dirname, '/public/assets')));