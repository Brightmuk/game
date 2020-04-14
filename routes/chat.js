
module.exports = {
    chatsPage: (req, res) => {
        if(req.session.user){
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
           
        
       
    }else{
        res.redirect('/login')
      }
     },
     usersPage: (req, res) => {
        if(req.session.user){
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
       
    }else{
        res.redirect('/login')
      }
     },
newChat:(req, res) => {
    let user=req.session.user
    console.log(user)
    let dt='1/2/2018'
    console.log(dt)
    let newChatQuery="INSERT INTO `chats` SET `user_Id`= '"+user +"', `dateTime`= '"+ dt+"' ";
    db.query(newChatQuery, (err, result) => {
        if (err) {
           console.log('Eror occured as:'+err);
        }
            console.log('chat created')
            res.redirect('/')
        
    })

},

oneChat: (req, res) => {
    if(req.session.user){
    user=req.session.user.user_id
    message=""
     res.render('index.ejs', {
       user_id:user,
       title: 'Welcome muk games',
      message:message
      })
    }else{
      res.redirect('/login')
    }
  

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