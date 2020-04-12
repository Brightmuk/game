const passport = require('passport')

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
                // console.log('The solution is: ', results);
                if(result.length >0){
                  if(result[0].password == enteredPassword){
                      res.cookie('isLoggedin',{loggedin:true})
                      if(req.cookies){
                        console.log('cookie in')
                        console.log(req.cookies.isLoggedin.loggedin)
                      }   else{
                        console.log('no cookie')
                      }   
                    // if(req.body.remember){
                       
                    //     req.session.cookie.maxAge = 1000 * 60 *3;
                    //     console.log('Login saved in cookie')
                    // }else{
                    //     req.sesion.cookie.expires = false;
            
                    // }
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