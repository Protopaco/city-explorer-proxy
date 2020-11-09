const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');
const fetch = require('superagent');

const { mungeLocation } = require('./utils.js');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const locationid_key = process.env.locationid_key;
const weatherbit_key = process.env.weatherbit_key;

const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password
app.use('/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
app.get('/api/test', (req, res) => {

  res.json({
    message: `in this proctected route, we get the user's id like so: ${req.userId}`
  });
});

app.get('/location', async (req, res) => {
  try {
    const userInput = req.query.search;

    const returnedObject = await fetch.get(`https://us1.locationiq.com/v1/search.php?key=${locationid_key}&q=${userInput}&format=json`);

    const mungedLocation = mungeLocation(JSON.parse(returnedObject.text));

    res.json(mungedLocation);
  }

  catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/weather', async (req, res) => {
  try {
    const userInput = req.query.search;
    console.log(userInput);

    // const weather_url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=38.123&lon=-78.543&key=${weatherbit_key}`;

    // const returnedObject = await fetch.get(weather_url);

    // console.log

  } catch (e) {

    res.json(500).json({ error: e.message });
  }



})

app.use(require('./middleware/error'));

module.exports = app;
