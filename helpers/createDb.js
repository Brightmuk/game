const pg = require('pg');

const con = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'game',
  password: 'beatsbydre',
  port: '5432'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

con.query(
  "CREATE TABLE IF NOT EXISTS users (user_id integer generated always as identity PRIMARY KEY , email varchar(255) NOT NULL, user_name varchar(20) NOT NULL, password varchar(255) NOT NULL , avatar varchar(255), is_First_Time BOOLEAN) ;"
  , function (err, result) {
if (err) throw err;
console.log("Table users created");
});
con.query(
  "CREATE TABLE IF NOT EXISTS chats (chat_id integer generated always as identity PRIMARY KEY, user_Id INT , CONSTRAINT fk_chat_owner FOREIGN KEY (user_Id) REFERENCES users(user_Id), receiver_id INT , CONSTRAINT fk_chat_receiver FOREIGN KEY (user_Id) REFERENCES users(user_Id), dateTime TIMESTAMP NOT NULL );"
  , function (err, result) {
if (err) throw err;
console.log("Table chats created");
});
con.query(
  "CREATE TABLE IF NOT EXISTS messages (message_id integer generated always as identity PRIMARY KEY,   text varchar(255) NOT NULL, user_Id INT , CONSTRAINT fk_message_user FOREIGN KEY (user_Id) REFERENCES users(user_Id), chat_Id INT , CONSTRAINT fk_chat FOREIGN KEY (chat_Id) REFERENCES chats(chat_Id),dateTime TIMESTAMP NOT NULL );"
  , function (err, result) {
if (err) throw err;
console.log("Table messages created");
});
// // const dateTime = require('node-datetime');
// // let dt = dateTime.create().format('y-m-d H:M:S');
// // let user_id=2;

// // let receiver_id=1;
// // con.query(
// //   "INSERT INTO `chats` (user_Id, receiver_id, dateTime) VALUES ('"+user_id +"','"+receiver_id +"', '"+ dt+"') "
// //   , function (err, result) {
// // if (err) throw err;
// // console.log(result[0]);
// // });


  });