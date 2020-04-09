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
                  
                    res.redirect('/')
                   console.log('Im in')
                  }
                  else{
                    res.render('login.ejs', {
                        title: 'Welcome to Socka | Add a new player'
                        ,message:'Username and password do not match'
                 
                });
                   
                        
                  }
                }
                else{
                    res.render('login.ejs', {
                        title: 'Welcome to Socka | Add a new player'
                        ,message:'Username does not exist'
                 
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