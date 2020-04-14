const dateTime = require('node-datetime');
const url = require('url'); 

module.exports = {
    chatsPage: (req, res) => {
       
        message=''
        user_id=req.params.user_id;
        let getChatsQuery = "SELECT * FROM `chats` WHERE user_Id= '"+ user_id +"' AND receiver_id='"+ user_id+"'";
       
                    db.query(getChatsQuery , (err, result_2) => {
                        if (err) {
                            console.log("error ocurred",err);
                        }else {
                            if(result_2.length<0){
                                message='No chats yet'
                                res.render('chats.ejs', {
                                    message:message,
                                    chats:result_2
                                    
                                });
                            }else{
                            res.render('chats.ejs', {
                                message:message,
                                chats:result_2
                            });}
                        }
                    })
           
        
       
  
     },
     usersPage: (req, res) => {
       
        message=''
        user_id=req.params.user_id;
        let usersQuery = "SELECT * FROM `users`";
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
                        users:result_1
                        
                    });
            }
            }
        })
       
 
     },
newChat:(req, res) => {
   
    let user_id=req.session.user.user_id
    console.log(user_id)
    let receiver_id=req.params.receiver_id
    console.log(receiver_id)
    let dt = dateTime.create().format('y-m-d H:M:S');
    console.log(dt)
    let ifChatExistQuery="SELECT * FROM `chats` WHERE user_Id='"+user_id+"' AND receiver_id='"+receiver_id+"' ";
    let newChatQuery="INSERT INTO `chats` (user_Id, receiver_id, dateTime) VALUES ('"+user_id +"','"+receiver_id +"', '"+ dt+"') ";
    db.query(ifChatExistQuery, (err, result) => {
        if (err) throw err;
       console.log(result.length)
        if (result.length==0){
            db.query(newChatQuery, (err, result) => {
                if (err) {
                   console.log('Eror occured as:'+err);
                }
               
                res.redirect('/');
              
            }) 
        }else{
           

            res.redirect('/signup');
        }
        
    })
   

},

oneChat: (req, res) => {
   
    user=req.session.user.user_id
    message=""
     res.render('index.ejs', {
       user_id:user,
       title: 'Welcome muk games',
      message:message
      })
   
  

},
    
     sendMessage:(req, res,chat_id)=>{
         let message = '';
         let sent_message = req.body.message;
         let time = date.now();
         let sendMessageQuery = "SELECT * FROM `chats` WHERE chat_id = '" + chat_id + "'";
         db.query(sendMessageQuery, (err, result) => {
             if (err) {
                 return res.status(500).send(err);
             }
             if (result.length > 0) {
                 message = 'Username already exists';
                 res.render('signup.ejs', {
                     message
                   
                 });
             } else {
                 let query = "INSERT INTO `users` (email, password, user_name) VALUES ('" +
                 email + "', '" + password + "',  '" + username + "')";
             db.query(query, (err, result) => {
                 if (err) {
                     return res.status(500).send(err);
                 }
                 res.redirect('/');
             });}
         });
         
     }
}