const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var session = require('express-session');

var eowCharsRouter = require('./routes/eowChars');
var eowCharRouter = require('./routes/eowChar');
var eowHubRouter = require('./routes/eowHub');
var eowTravelRouter = require('./routes/eowTravel');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(session({
    secret: 'my-super-secret-secret!',
    resave: false,
    saveUninitialized: true
  }))
  .use('/', eowCharsRouter) // Project 2
  .use('/explore', eowCharRouter) // Project 2  
  .use('/eowHub', eowHubRouter) // Project 2
  .use('/eowTravel', eowTravelRouter) // Project 2
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
