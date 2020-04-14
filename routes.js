const {getHomePage,layout} = require('./routes/index');
const {userLogin,userLoginPage,userSignup,userSignupPage}=require('./routes/authentication')
const {chatsPage,sendMessage,newChat,oneChat,usersPage}=require('./routes/chat');
module.exports =function(app,passport){

    app.get('/' ,getHomePage);
    app.get('/layout',layout);
    app.post('/logsin',userLogin);
    app.get('/login',userLoginPage);
    app.post('/signsup',userSignup);
    app.get('/signup',userSignupPage);
    app.get('/chats',chatsPage);
    app.get('/newchat',newChat);
    app.get('/chats:chat_id',oneChat);
    app.get('/users',usersPage);

    app.post('/send/message',sendMessage);
}