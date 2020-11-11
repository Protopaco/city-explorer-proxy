require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');
const { mungeLocation } = require('../lib/utils');

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
  });
});

