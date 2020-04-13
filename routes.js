const {getHomePage,layout} = require('./routes/index');
const {userLogin,userLoginPage,userSignup,userSignupPage}=require('./routes/authentication')
const {chatsPage,sendMessage,newChat,oneChat}=require('./routes/chat');
module.exports =function(app,passport){

    app.get('/' ,getHomePage);
    app.get('/layout',layout);
    app.post('/logsin',userLogin);
    app.get('/login',userLoginPage);
    app.post('/signsup',userSignup);
    app.get('/signup',userSignupPage);
    app.get('/chat:user_id',chatsPage);
    app.get('/chat/new',newChat);
    app.get('/chats:chat_id',oneChat);
    app.post('/send/message',sendMessage);
}