const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash= require('connect-flash');
const passport = require('passport');
const exphbs = require('express-handlebars');

const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

// Initializations

require('./database');
require('./config/passport'); 


 
// Settings

app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main', 
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));



app.set('view engine', '.hbs');

// Middlewares

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'my-secret-app',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user;
    next();
})


//Routes

app.use('/',require('./routes/index'));
app.use('/notes',require('./routes/notes'));
app.use('/users',require('./routes/users'));

// Static Files

app.use(express.static(path.join(__dirname, 'public')));

// Server is Listening
app.listen(app.get('port'),()=>{
    console.log('Server on PORT', app.get('port'));
})