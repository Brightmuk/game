
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
          
        res.render('partials/layout.ejs', {
         
          title: 'Welcome muk games'
        
         })
 
    },
}