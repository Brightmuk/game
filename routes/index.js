
module.exports = {

    
    getHomePage: (req, res) => {
        
        //  user=req.session.user.user_id
        user=req.cookies.user.user_id
       
         message=""
          res.render('index.ejs', {
            user_id:user,
            title: 'Welcome muk games',
           message:message
           })
        
       
 
    },
    layout: (req, res) => {
      let loggedIn=''
        if (req.cookies){
          if(req.cookies.user){
            loggedIn=true
          }else{
            loggedIn=false
          }
        }
        res.render('partials/layout.ejs', {
          loggedIn:loggedIn,
          title: 'Welcome muk games'
        
         })
 
    },
  logout:(req,res)=>{
    req.cookies.user.delete()
    res.redirect('/login')
  }
}