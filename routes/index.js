
module.exports = {

    getHomePage: (req, res) => {
        
        //  user=req.session.user.user_id
        user=req.cookies.user
        console.log(user)
        let userQuery="SELECT * FROM  users WHERE user_id= '"+ user.user_id +"'";
        let chatsQuery="SELECT * FROM chats WHERE user_Id='"+user.user_id+"' OR receiver_id='"+user.user_id+"'";
        db.query(userQuery, (err, result) => {
            if (err) {
                console.log("error ocurred",err);
                res.send({
                  "code":400,
                  "failed":"error ocurred"
                });
              }else{
                 console.log(result.rows)
                if(result.rows[0].is_First_Time==true){
                  res.redirect('/setup_profile')
                }else{
                  db.query(chatsQuery, (err, result_2) => {
                    if (err) {
                        console.log("error ocurred",err);
                        res.send({
                          "code":400,
                          "failed":"error ocurred"
                        });
                      }
                  message=""
                  res.render('index.ejs', {
                  user:user,
                  chats:result_2.rows,
                  title: 'Welcome muk games',
                  message:message
                })
           })
          }
        }
      })     
    },
setupProfilePage: (req, res) => {
    
        res.render('setupProfile.ejs', {
         
          message:''
         })
 
    },
setupProfile:(req,res)=>{
  message=''
  let  user=req.cookies.user
  let uploadedFile = req.files.image;
  let image_name = uploadedFile.name;
  let fileExtension = uploadedFile.mimetype.split('/')[1];
  image_name = user.user_name + '.' + fileExtension;

  let setAvatarQuery="UPDATE users SET avatar='"+ image_name +"',`is_First_Time`=false WHERE user_name='"+ user.user_name +"'";

  if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
      uploadedFile.mv(`public/assets/images/${image_name}`, (err ) => {
        if (err) {
          return res.status(500).send(err);
          }
        db.query(setAvatarQuery, (err, result) => {
          if (err) {
              return res.status(500).send(err);
          }
          res.redirect('/');
      });
    })
  } else {
    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
    res.render('setupProfile.ejs', {
        message,
    });
}
},
brightDesigns:(req,res)=>{
  res.render('bd.ejs',{
    message:''
  })
},

logout:(req,res)=>{
    res.cookie("user",'')
    res.redirect('/login')
  }
}