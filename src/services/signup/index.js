'use strict';

const MongoClient = require('mongodb').MongoClient;
const service = require('feathers-mongodb');
const hooks = require('./hooks');


module.exports = function(){
  const app = this;
  const url = app.get('mongodb');
   MongoClient.connect(url).then(function(db){
    // Connect to the db, create and register a Feathers service.
    app.use('/signups', service({
      Model: db.collection('users'),
      paginate: {
        default: 500,
        max: 1000
      }
    }));


    // Get our initialize service to that we can bind hooks
    const signupService = app.service('/signups');

    // Set up our before hooks
    signupService.before(hooks.before);

    // Set up our after hooks
    signupService.after(hooks.after);
  });
};


