
module.exports = {

    
    getHomePage: (req, res) => {
         if(req.session.user){
         

          socket.on('chat-message',data=>{
              console.log(data)
          })
          res.render('index.ejs', {
        
            title: 'Welcome muk games'
          
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