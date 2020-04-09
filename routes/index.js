module.exports = {

    
    getHomePage: (req, res) => {
                
        res.render('index.ejs', {
          title: 'Welcome muk games'
        
         })
 
    },
    layout: (req, res) => {
                
        res.render('partials/layout.ejs', {
          title: 'Welcome muk games'
        
         })
 
    },
}