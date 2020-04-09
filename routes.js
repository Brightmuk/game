const {getHomePage,layout} = require('./routes/index');
const {userLogin,userLoginPage,userSignup,userSignupPage}=require('./routes/authentication')
module.exports =function(app,passport){

    app.get('/' ,getHomePage);
    app.get('/layout',layout);
    app.post('/logsin',userLogin);
    app.get('/login',userLoginPage);
    app.post('/signsup',userSignup);
    app.get('/signup',userSignupPage)
}