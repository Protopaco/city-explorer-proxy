require('dotenv').config();

const { mungeLocation, mungeReviews, mungeWeather } = require('../lib/utils');

describe('app routes', () => {
  describe('routes', () => {


    test('test mungeLocation, returns object', () => {

      const expectation = {
        formatted_query: 'Portland, OR',
        latitude: 55,
        longitude: -122,
      }

      const data = [{
        display_name: 'Portland, OR',
        lat: 55,
        lon: -122
      },
      {
        display_name: 'Seattle, WA',
        lat: 45,
        lon: -121
      }];

      expect(mungeLocation(data)).toEqual(expectation);

    });

    test('test mungeReviews, returns array of objects', () => {

      const expectation = [{
        name: 'Night Light Lounge',
        image_url: 'www.nightlightlounge.net',
        price: '$',
        rating: 5,
        url: 'www.nightlightlounge.net/review'
      }, {
        name: 'Pablito\'s Taqueria',
        image_url: 'www.pablitostaqueria.com',
        price: '$',
        rating: 5,
        url: 'www.pablitostaqueria.com/review'
      }, {
        name: 'Portland Drag Queen Brunch',
        image_url: 'www.portlanddragqueenbrunch.com',
        price: '$',
        rating: 5,
        url: 'www.portlanddragqueenbrunch.com/review',
      }];

      const data = [{
        name: 'Night Light Lounge',
        image_url: 'www.nightlightlounge.net',
        price: '$',
        rating: 5,
        url: 'www.nightlightlounge.net/review',
        owner: 'Paul Stevens'
      }, {
        name: 'Pablito\'s Taqueria',
        image_url: 'www.pablitostaqueria.com',
        price: '$',
        rating: 5,
        url: 'www.pablitostaqueria.com/review',
        owner: 'Paul Stevens'
      }, {
        name: 'Portland Drag Queen Brunch',
        image_url: 'www.portlanddragqueenbrunch.com',
        price: '$',
        rating: 5,
        url: 'www.portlanddragqueenbrunch.com/review',
        owner: 'Paul Stevens'

      }];
      expect(mungeReviews(data)).toEqual(expectation);

    });


    test('test mungeWeather, returns array of objects', () => {

      const expectation = [{
        forecast: 'cloudy with a chance of meatballs',
        time: '11-10-2020'
      }, {
        forecast: 'red rain will come falling down',
        time: '11-11-2020'
      }, {
        forecast: 'ain\'t no sunshine when she\'s gone',
        time: '11-12-2020'
      }];

      const weatherObj = {
        data:
          [{
            weather: {
              description: 'cloudy with a chance of meatballs'
            },
            datetime: '11-10-2020'
          }, {
            weather: {
              description: 'red rain will come falling down'
            },
            datetime: '11-11-2020'
          }, {
            weather: {
              description: 'ain\'t no sunshine when she\'s gone'
            },
            datetime: '11-12-2020'
          }]
      };

      expect(mungeWeather(weatherObj)).toEqual(expectation);

    });

  });
});

