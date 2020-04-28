const {getHomePage,setupProfilePage,setupProfile,logout} = require('./routes/index');
const {userLogin,userLoginPage,userSignup,userSignupPage}=require('./routes/authentication')
const {sendMessage,newChat,oneChat,usersPage,getMessages}=require('./routes/chat');
const {startPage} = require('./routes/campaign')
function isLoggedIn(req,res,next){
    if(req.cookies.user){
        next()
    }else{
        res.redirect('/login')
    }
}
module.exports =function(app,passport){
    //basic routes
    app.get('/logout',logout)
    app.post('/logsin',userLogin);
    app.get('/login',userLoginPage);
    app.post('/signsup',userSignup);
    app.get('/signup',userSignupPage);
    app.get('/setup_profile:user_id',isLoggedIn ,setupProfilePage)
    app.post('/setup',isLoggedIn,setupProfile)
    app.get('/' ,isLoggedIn,getHomePage);
    //chat routes
    app.get('/newchat/:receiver_id',isLoggedIn,newChat);
    app.get('/chat:chat_id:receiver_id',isLoggedIn,oneChat);
    app.get('/users',isLoggedIn,usersPage);
    app.post('/send',isLoggedIn,sendMessage);
    //campaign routes
    app.get('/start',isLoggedIn,startPage)
}