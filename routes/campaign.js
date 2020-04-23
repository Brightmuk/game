
module.exports = {

    
    startPage: (req, res) => {
        
        //  user=req.session.user.user_id
        user=req.cookies.user.user_id
        message=""
        res.render('start.ejs', {
            user_id:user,
           message:message
           }) 
 
    }
}