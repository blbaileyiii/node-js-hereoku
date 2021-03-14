const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var dbRouter = require('./routes/db');
var eowDBRouter = require('./routes/eowDb');
var personRouter = require('./routes/getPerson');
var getRateRouter = require('./routes/getRate');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .use('/db', dbRouter) //Homework
  .use('/getPerson', personRouter) //Homework
  .use('/postalrate', getRateRouter) //Homework
  .use('/eowdb', eowDBRouter) // Project 2
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
