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
  "CREATE TABLE IF NOT EXISTS `users` (`user_id` int(5) NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL,   `user_name` varchar(20) NOT NULL, `password` varchar(20) NOT NULL ,PRIMARY KEY (`user_id`)  ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;"
  , function (err, result) {
if (err) throw err;
console.log("Table user created");
});


  });