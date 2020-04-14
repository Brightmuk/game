
module.exports = {

    
    getHomePage: (req, res) => {
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
    layout: (req, res) => {
          
        res.render('partials/layout.ejs', {
         
          title: 'Welcome muk games'
        
         })
 
    },
}