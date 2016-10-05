'use strict';

const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const service = require('feathers-mongodb');
const hooks = require('./hooks');
const url = require('../../../config/db.conf');

module.exports = function(){
  const app = this;

  MongoClient.connect(url).then(function(db){
  // Connect to the db, create and register a Feathers service.
  app.use('/leaderboards', service({
    Model: db.collection('leaderboards'),
    paginate: {
      default: 30,
      max: 30
    }
  }));

  // Get our initialize service to that we can bind hooks
  const leaderboardService = app.service('/leaderboards');

  // Set up our before hooks
  leaderboardService.before(hooks.before);

  // Set up our after hooks
  leaderboardService.after(hooks.after);
  });
};