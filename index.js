//utility lib
var util = require('util');
//express lib
var express = require('express');
//connect DB
var pg = require('pg');
//general lib
var app = express();
//manage session & cookies
var session = require('express-session')
var cookieParser = require('cookie-parser');
//my modules
var rendering = require('./modules/rendering.js');
//required to parse request bodies - POST and JSON
var bodyParser = require('body-parser');
//string that allows connection to DB
var connectionString = process.env.DATABASE_URL || "postgres://mario:calculator@localhost:5432/discoverdb";
var User = require('./models/user');

//defining some static content
app.use("/img", express.static(__dirname + '/img'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/modules", express.static(__dirname + '/modules'));
app.use("/galleria", express.static(__dirname + '/galleria'));
app.use("/photo_swipe", express.static(__dirname + '/photo_swipe'));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());
//use sessions
app.use(session({ 
    key: 'user_sid',
	//required, used to prevent tampering
	secret: 'vYsC3EeZZ5_fido_EIVOufB3Lb', 
	//set time of validity of cookies
	cookie: { maxAge: 600000 },
    resave: false,
    saveUninitialized: false
}));

// set the view engine to ejs
app.set('view engine', 'ejs');
//seting server port 
app.set('port', (process.env.PORT || 5000));
//parsers for body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set host for views
app.locals.host = "http://localhost:5000";

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};


app.get('/', function(req, res) {  
    res.set('Content-Type', 'text/html');
    res.status(200).render('index.ejs');
});

app.get('/get_in_touch', function(req, res){
    res.set('Content-Type', 'text/html');
    res.status(200).render('get_in_touch.ejs');
});

app.get('/gallery', function(req, res){
    res.set('Content-Type', 'text/html');
    res.status(200).render('gallery.ejs');
});

// route for user Login
app.route('/login')
    .get(sessionChecker, (req, res) => {
        res.set('Content-Type', 'text/html');
        res.status(200).render('login.ejs');
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;

        User.findOne({ where: { username: username } }).then(function (user) {
            if (!user) {
                res.redirect('/login');
            } else if (!user.validPassword(password)) {
                res.redirect('/login');
            } else {
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            }
        });
    });

// route for user's dashboard
app.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.set('Content-Type', 'text/html');
        res.status(200).render('dashboard.ejs');
    } else {
        res.redirect('/login');
    }
});

/*
 * logs out an admin and destrois the session
 * after logged out redirect to the home page
 */
 app.get('/logout',function(req,res){
    res.set('Content-Type', 'text/html');
    req.session.destroy(function(err) {
      if(err) {
        console.log("SessionERR " + err);
        res.status(500).render('error.ejs',{
            message: "We have some problems with the server! Turn Back later to see if problems will be fixed!"
        });
      }else{
        res.clearCookie('user_sid');
        res.status(200).render('home.ejs');
      }
    });
 });

// route for user signup
app.route('/signup')
    .get(sessionChecker, (req, res) => {
        res.set('Content-Type', 'text/html');
        res.status(200).render('signup.ejs');
    })
    .post((req, res) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            req.session.user = user.dataValues;
            res.redirect('/dashboard');
        })
        .catch(error => {
            res.redirect('/signup');
        });
    });
    

//start server
app.listen(app.get('port'), function() {
  console.log('fido app is running on port', app.get('port'));
});
