if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}


// Establish a Socket.io connection
var socket = io();
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
var app = feathers()
  .configure(feathers.socketio(socket))
  .configure(feathers.hooks())
  // Use localStorage to store our login token
  .configure(feathers.authentication({
    storage: window.localStorage
  }));


app.version = '0.0.1'

// Get the Feathers services we want to use
var userService = app.service('users');
var questionService = app.service('questions');

//authenticate the user
app.authenticate().then(function () {
  //Document ready and authenticated
  app.vm = new app.ViewModelMain()
  console.log(ko.toJS(app.vm))
  ko.applyBindings(app.vm);
  app.hidePreloader()
  $('.view-main').fadeIn()
  
  //questionService.create({ question: 'who are you?', answer1: 'me', answer2: 'you', answer1perc: 80, answer2perc: 20});

  // questionService.find({
  //   query: {
  //     $sort: { createdAt: -1 },
  //     $limit: 50,
  //     $skip: 2
  //   }
  // }).then(function (page) {
  //   return console.log(page)
  // });

})
// On unauthorized errors we just redirect back to the login page
.catch(function (error) {
  if (error.code === 401) {
    window.location.href = 'login.html';
  }
});













