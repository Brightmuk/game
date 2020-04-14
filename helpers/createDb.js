var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "bright",
  password: "beatsbydre",
  database:"game"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS game", function (err, result) {
    if (err) throw err;
    console.log("Database created");
    
});
con.query(
  "CREATE TABLE IF NOT EXISTS `users` (`user_id` int(5) NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL,   `user_name` varchar(20) NOT NULL, `password` varchar(20) NOT NULL , `avatar` varchar(255) ,PRIMARY KEY (`user_id`)  ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;"
  , function (err, result) {
if (err) throw err;
console.log("Table user created");
});
con.query(
  "CREATE TABLE IF NOT EXISTS `chats` (`chat_id` int(5) NOT NULL AUTO_INCREMENT, `user_Id` INT , CONSTRAINT fk_chat_owner FOREIGN KEY (user_Id) REFERENCES users(user_Id),`receiver_id` INT , CONSTRAINT fk_chat_receiver FOREIGN KEY (user_Id) REFERENCES users(user_Id), `dateTime` TIMESTAMP NOT NULL ,PRIMARY KEY (`chat_id`)  ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;"
  , function (err, result) {
if (err) throw err;
console.log("Table chats created");
});
con.query(
  "CREATE TABLE IF NOT EXISTS `messages` (`message_id` int(5) NOT NULL AUTO_INCREMENT,   `text` varchar(255) NOT NULL, `user_Id` INT , CONSTRAINT fk_message_user FOREIGN KEY (user_Id) REFERENCES users(user_Id), `chat_Id` INT , CONSTRAINT fk_chat FOREIGN KEY (chat_Id) REFERENCES chats(chat_Id),`dateTime` TIMESTAMP NOT NULL ,PRIMARY KEY (`message_id`)  ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;"
  , function (err, result) {
if (err) throw err;
console.log("Table messages created");
});
const dateTime = require('node-datetime');
let dt = dateTime.create().format('y-m-d H:M:S');
let user_id=2;

let receiver_id=1;
con.query(
  "INSERT INTO `chats` (user_Id, receiver_id, dateTime) VALUES ('"+user_id +"','"+receiver_id +"', '"+ dt+"') "
  , function (err, result) {
if (err) throw err;
console.log(result[0]);
});


  });