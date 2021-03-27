const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var session = require('express-session');

var dbRouter = require('./routes/db');
var eowCharsRouter = require('./routes/eowChars');
var eowCharRouter = require('./routes/eowChar');
var eowHubRouter = require('./routes/eowHub');
var eowTravelRouter = require('./routes/eowTravel');
var personRouter = require('./routes/getPerson');
var getRateRouter = require('./routes/getRate');
const { nextTick } = require('process');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(express.urlencoded({ extended: true })) // NEEDED FOR POST
  .use(session({
    secret: 'my-super-secret-secret!',
    resave: false,
    saveUninitialized: true
  }))
  .use('/', eowCharsRouter) // Project 2
  .use('/explore', eowCharRouter) // Project 2  
  .use('/eowHub', eowHubRouter) // Project 2
  .use('/eowTravel', eowTravelRouter) // Project 2
  .use('/db', dbRouter) //Homework
  .use('/getPerson', personRouter) //Homework
  .use('/postalrate', getRateRouter) //Homework
  .use(logRequest) //Homework
  .get('/heroku', (req, res) => res.render('pages/index')) //Homework
  .post('/login', async (req,res) => { doLogin(req, res) }) //Homework
  .post('/logout', async (req,res) => { doLogout(req, res) }) //Homework
  .get('/getServerTime', verifyLogin, async (req,res)=> { getServerTime(req,res) }) //Homework
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  function doLogin(req, res) {
    let user = req.body.username;
    let pass = req.body.password;

    console.log(user);
    console.log(pass);
    let obj;
    if (user == "admin" && pass == "password") {
      obj = {success: true};
      req.session.username = user;
      req.session.password = pass;
    } else {
      obj = {success: false};
    }
    res.end(JSON.stringify(obj));
  }

  function doLogout(req, res) {
    let user = req.session.username;
    if (user != null) {
      obj = {success: true};
      req.session.username = null;
      req.session.password = null;
      req.session.destroy();
    } else {
      obj = {success: false};
    }
    res.end(JSON.stringify(obj));
  }

  function getServerTime(req, res) {

    let time = new Date();
    obj = {success: true, time: time};


    res.end(JSON.stringify(obj));

  }

  function logRequest(req, res, next){
    console.log("Received a request for: " + req.url);
    next();
  }

  function verifyLogin(req, res, next){
    let user = req.session.username;
    let obj;
    if(user != null) {
      next();
    } else {
      obj = {success: false, message: "Access Denied"};
    }    
    res.status(401).json(obj);
    //res.end(JSON.stringify(obj));
  }