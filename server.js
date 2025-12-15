const express = require('express')
const bodyParser = require('body-parser');
const passport = require('./auth');
const db = require('./db');
const personRouter = require('./routers/personRouter')
const menuRouter = require('./routers/menuRouter')
const aiRouter = require('./routers/aiRouter')
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express()

// Logger Middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
}
app.use(logger);

app.use(passport.initialize());
app.use(bodyParser.json());

const localAuth = passport.authenticate('local', { session: false });

// Home Route
app.get('/',(req, res) => {
  res.send('Welcome to the Hotel ')
})
//person Router
app.use('/person', personRouter);

//menu Router
app.use('/menu', menuRouter);

//ai Router
app.use('/ai', aiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
