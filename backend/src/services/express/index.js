// Konfiguracja serwera Express

const express = require('express');
const bodyParser = require('body-parser');
var Session = require('express-session');
const cors = require('cors');

const expressConfig = (apiRoot, routes) => {
  const app = express();
  app.use(Session({
      secret: 'raysources-secret-19890913007',
      resave: false,
      saveUninitialized: true,
      // secure: false,
      cookie: {
          path: '/',
          maxAge:  1800000  //30 mins
      },
      duration: 30 * 60 * 1000,
      activeDuration: 5 * 60 * 1000,


  }));

// use it before all route definitions
  app.use(cors({origin: 'http://localhost:4200'}));
  app.use(bodyParser.json())  // obsluga dekodowania JSON
  app.use(apiRoot, routes)


  return app
}

module.exports = expressConfig
