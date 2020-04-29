var express = require('express');
var app = express();

var server = require('http').createServer(app)
var io = require('socket.io').listen(server);
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const path = require('path');
const passport = require('passport')
const session = require('express-session');
const ejs = require('ejs');
const expressSession = require('express-session');
const morgan=require('morgan');
const LocalStrategy=require('passport-local').strategy;

const FileStore = require('session-file-store')(session)
chats=[]

io.on('connection',function(socket){
    console.log('New user at socket ',socket.id);
    //user joining chat withtheir socket id
    socket.on("join-chat", function (chat_id,) {
       let chat={
            chat_id:chat_id,
           socket_id:socket.id
       } 
       chats.push(chat)
       console.log(chats)
    });
   
    //message beign broadcasted to specific socket
    socket.on("new_message", function (message,chat_id) {
        console.log(chat_id)
        for(i=0;i<chats.length;i++){
            if(chats[i].chat_id==chat_id&&chats[i].socket_id!=socket.id){
                console.log("Client "+ chat_id +" says", message);
                socket.broadcast.to(chats[i].socket_id).emit("new_message",message)
            }
        }
       
    });
    //remove chat items when user disconnects
    socket.on('disconnect', function(socket) {
        console.log("user at socket "+socket+" disconected")
       for(i=0;i<chats.length;i++){
           if(chats[i].socket_id==socket.id){
              chats.pop(chats[i]) 
           }
       }
    });
})

app.use(function (request, result, next) {
	result.setHeader("Access-Control-Allow-Origin", "*");
	next();
});

module.exports={io:"io"}
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
//secret cookie signing
app.use(cookieParser('dkjml-9i6j-2738'))

// app.use(session({
//     name:'session-id',
//     secret:'38cjkn20kmksalcnln23',
//     saveUninitialized:false,
//     resave:false,
   
// }));
// routes for the app

require('./routes.js')(app,passport);


// set the app to listen on the port
 server.listen(8000, () => {
    console.log('server is running on port', server.address().port);
  });

//static files
app.use(express.static(path.join(__dirname, '/public/assets')));