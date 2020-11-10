const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');
const fetch = require('superagent');

const { mungeLocation, mungeWeather, mungeReviews, mungeTrails } = require('./utils.js');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const locationid_key = process.env.locationid_key;
const weatherbit_key = process.env.weatherbit_key;
const yelp_key = process.env.yelp_key;
const hiking_key = process.env.hiking_key;

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
    res.status(500).json({ status: 500, responseText: 'Sorry, something went wrong' });
  }
});

app.get('/weather', async (req, res) => {
  try {
    const userInput = req.query;

    const weather_url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${userInput.latitude}&lon=${userInput.longitude}&key=${weatherbit_key}`;


    const returnedObject = await fetch.get(weather_url);

    const arrayOfForecasts = mungeWeather(returnedObject.body);

    res.json(arrayOfForecasts);

  } catch (e) {

    res.status(500).json({ status: 500, responseText: 'Sorry, something went wrong' });
  }
})

app.get('/reviews', async (req, res) => {
  try {
    const userInput = req.query;
    const header = { 'Authorization': `Bearer ${yelp_key}` };
    const yelp_url = `https://api.yelp.com/v3/businesses/search?latitude=${userInput.latitude}&longitude=${userInput.longitude}`;

    const returnedObject = await fetch.get(yelp_url).set(header);

    const objectToReturn = mungeReviews(returnedObject.body.businesses);

    res.json(objectToReturn);

  } catch (e) {
    res.status(500).json({ status: 500, responseText: 'Sorry, something went wrong' });
  }

});

app.get('/trails', async (req, res) => {
  try {
    const userInput = req.query;
    const hiking_url = `https://www.hikingproject.com/data/get-trails?lat=${userInput.latitude}&lon=${userInput.longitude}&maxDistance=200&key=${hiking_key}`;

    const returnedObject = await fetch.get(hiking_url);
    // console.log(returnedObject.body)
    const mungedTrails = mungeTrails(returnedObject.body);
    res.json(mungedTrails);
  } catch (e) {
    res.status(500).json({ status: 500, responseText: 'Sorry, something went wrong' });
  }
})

app.use(require('./middleware/error'));

module.exports = app;
