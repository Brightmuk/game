const {getHomePage,layout} = require('./routes/index');
const {userLogin,userLoginPage,userSignup,userSignupPage}=require('./routes/authentication')
const {chatsPage,sendMessage,newChat,oneChat,usersPage,getMessages}=require('./routes/chat');
function isLoggedIn(req,res,next){
    if(req.cookies.user){
        next()
    }else{
        res.redirect('/login')
    }
}
module.exports =function(app,passport){

    app.get('/layout',layout);
    app.post('/logsin',userLogin);
    app.get('/login',userLoginPage);
    app.post('/signsup',userSignup);
    app.get('/signup',userSignupPage);
    app.get('/' ,isLoggedIn,getHomePage);
    app.get('/chats',isLoggedIn,chatsPage);
    app.get('/newchat/:receiver_id',isLoggedIn,newChat);
    app.get('/chat:chat_id:receiver_id',isLoggedIn,oneChat);
    app.get('/users',isLoggedIn,usersPage);
    app.post('/send',isLoggedIn,sendMessage);
    app.get('/messages:chat_id',isLoggedIn,getMessages)
}