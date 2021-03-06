const dateTime = require('node-datetime');
const url = require('url'); 
var express = require('express');
var app = express();


module.exports = {
 
usersPage: (req, res) => {
       
        message=''
        user=req.cookies.user;
        let usersQuery = "SELECT * FROM `users` WHERE `user_id` NOT IN('"+user.user_id+"')";
        db.query(usersQuery , (err, result_1) => {
            if (err) {
                console.log("error ocurred",err);
            }else {
                if(result_1.length<0){
                    message='No users yet'
                    res.render('users.ejs', {
                        message:message
                        
                    });
                }else{
                    
                    res.render('users.ejs', {
                        message:message,
                        users:result_1,
                        user:user
                        
                    });
            }
            }
        })
       
 
     },
    

newChat:(req, res,next) => {
   
    let user_id=req.cookies.user.user_id
    console.log(user_id)
    let receiver_id=req.params.receiver_id
    console.log(receiver_id)
    let dt = dateTime.create().format('y-m-d H:M:S');
    console.log(dt)
    let ifChatExistQuery_a="SELECT * FROM `chats` WHERE user_Id='"+user_id+"' AND receiver_id='"+receiver_id+"' ";
    let ifChatExistQuery_b="SELECT * FROM `chats` WHERE user_Id='"+receiver_id+"' AND receiver_id='"+user_id+"' ";
    let newChatQuery="INSERT INTO `chats` (user_Id, receiver_id, dateTime) VALUES ('"+user_id +"','"+receiver_id +"', '"+ dt+"') ";
   
    db.query(ifChatExistQuery_a, (err, result_1) => {
        if (err) throw err;
       console.log(result_1.length)
        if (result_1.length==0){
            db.query(ifChatExistQuery_b, (err, result_b) => {
                if (err) throw err;
               console.log(result_b.length)
               if(result_b.length==0){
                db.query(newChatQuery, (err, result_2) => {
                    if (err) {
                       console.log('Eror occured as:'+err);
                    }
                    db.query(ifChatExistQuery_a, (err, result_3) => {
                        if (err) {
                           console.log('Eror occured as:'+err);
                        }
                        chat_id=result_3[0].chat_id;
                        console.log('New chat is '+chat_id)
                        res.redirect('/chat'+chat_id+receiver_id)
                      
                    }) 
               
                }) 
               }else{
                chat_id=result_b[0].chat_id;
                console.log('Chat at '+chat_id)
                res.redirect('/chat'+chat_id+receiver_id)
            }
               
            }) 
        
            
        }else{
            chat_id=result_1[0].chat_id;
            console.log('Chat at '+chat_id)
            res.redirect('/chat'+chat_id+receiver_id)
        }
        
    })
   

},

oneChat: (req, res) => {
    let message='';
    let chat_id=req.params.chat_id;
    let receiver_id=req.params.receiver_id;
    let chatQuery="SELECT * FROM `chats` WHERE chat_Id='"+chat_id+"'";
    let getMessagesQuery="SELECT * FROM `messages` WHERE chat_Id='"+chat_id+"'";
    let user=req.cookies.user
    db.query(chatQuery, (err, result_1) => {
        if (err) {
           console.log('Eror occured as:'+err);
        }
        let userQuery="SELECT * FROM `users` WHERE user_id='"+receiver_id+"'";
        db.query(userQuery, (err, result_2) => {
            if (err) {
               console.log('Eror occured as:'+err);
            }
            db.query(getMessagesQuery, (err, result_3) => {
                if (err) {
                   console.log('Eror occured as:'+err);
                }
               
        
            res.render('singlechat.ejs', {
                receiver:result_2[0],
                user:user,
                chat:result_1[0],
                messages:result_3,
                chat_id:chat_id,
               message:message
               })
            })
        })
       
      
    }) 
     

},
    
sendMessage:(req, res)=>{
         let message = '';
         let sent_message = req.body.sent_message;
         let chat_id=req.body.chat_id;
         let user_id=req.cookies.user.user_id
         let dt = dateTime.create().format('y-m-d H:M:S');
        let sendMessageQuery="INSERT INTO `messages` (text, user_Id, chat_Id, dateTime) VALUES ('"+sent_message +"','"+user_id +"','"+chat_id +"', '"+ dt+"') "
         db.query(sendMessageQuery, (err, result) => {
             if (err) {
                 return res.status(500).send(err);
             }
            console.log(result)
            
         });
         
},


}