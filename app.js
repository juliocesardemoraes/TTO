const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const indexRoutes = require('./routes/index-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const db = require('./config/database');

var bodyParser = require('body-parser')




const app = express();
// Parse application/json
app.use(bodyParser.urlencoded({
    extended: true
  }));
// Set view engine
app.set('view engine', 'ejs');
app.set("views", "./views")

// Set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());


// Connect to mongodb
mongoose.connect(db.mongoURI, {useNewUrlParser:true}, { useFindAndModify: false }).then(()=>{
    console.log("Conectado ao mongo")
}).catch((err)=>{
    console.log("Erro ao se conectar: " + err)
})

// Setting Up Css
app.use(express.static(__dirname + '/public'));

// Set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/',indexRoutes);

// Listening at port 3000 http://localhost:3000
app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});
