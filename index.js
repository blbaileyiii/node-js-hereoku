const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var dbRouter = require('./routes/db');
var eowCharsRouter = require('./routes/eowChars');
var eowCharRouter = require('./routes/eowChar');
var eowHubRouter = require('./routes/eowHub');
var personRouter = require('./routes/getPerson');
var getRateRouter = require('./routes/getRate');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use('/', eowCharsRouter) // Project 2
  .use('/explore', eowCharRouter) // Project 2  
  .use('/eowHub', eowHubRouter) // Project 2
  .use('/db', dbRouter) //Homework
  .use('/getPerson', personRouter) //Homework
  .use('/postalrate', getRateRouter) //Homework
  .get('/heroku', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
