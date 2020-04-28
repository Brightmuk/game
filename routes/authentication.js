//sql injector at pass==> xxx') OR 1 = 1 -- ]
const passport = require('passport')

//password hashing
const bcrypt = require('bcryptjs')

function hashPassword (password) {
    let hash = bcrypt.hashSync(password, 10);
    return hash
  }

module.exports={

    userLoginPage: (req, res) => {
       
        res.render('login.ejs', {
           
            message:''
     
    });
    },
    userLogin:(req, res)=>{
       
        let message='';
        let username=req.body.username;
        let enteredPassword=req.body.password;
       
        let userQuery="SELECT * FROM  users WHERE user_name= '"+ username +"'";
        db.query(userQuery, (err, result) => {
            if (err) {
                console.log("error ocurred",err);
                res.send({
                  "code":400,
                  "failed":"error ocurred"
                });
              }else{
               
                if(result.length >0){
                  
                  if(bcrypt.compareSync(enteredPassword,result[0].password) ){
                     
                      res.cookie("user",result[0])
                      console.log(req.cookies);
                    res.redirect('/')
                   console.log('Im in')
                  }
                  else{
                    res.render('login.ejs', {
                        message:'Username and password do not match'
                 
                });
                   
                        
                  }
                }
                else{
                    res.render('login.ejs', {
                        message:'Username does not exist'
                 
                });
                }}
        });


    },
    userSignupPage: (req, res) => {
       message=''
        res.render('signup.ejs', {
           
            message:''
     
    });
    },
   
    userSignup:(req, res)=>{
        let message = '';
        let email = req.body.email;
        let password = req.body.password;
        let username = req.body.username;
        let passConfirm = req.body.passconfirm;
        if(password!==passConfirm){
            message = 'Passwords do not match';
            res.render('signup.ejs', {
                message
              
            });
        }else{
       
        let usernameQuery = "SELECT * FROM `users` WHERE user_name = '" + username + "'";
        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Username already exists';
                res.render('signup.ejs', {
                    message
                  
                });
            } else {
                let hashed_pass=hashPassword (password);

                let query = "INSERT INTO `users` (email, password, user_name, is_First_Time) VALUES ('" +
                email + "', '" + hashed_pass + "',  '" + username + "',true)";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });}
        });
        
    }
  }
}