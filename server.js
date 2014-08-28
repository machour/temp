var express = require('express');
var faker = require('faker');
var cors = require('cors');
var bodyParser = require('body-parser');

var user = {
  username: 'kentcdodds',
  password: 'p'
};

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/login', authenticate, function(req, res) {
  res.json(user);
});

app.get('/random-user', function(req, res) {
  var user = faker.Helpers.userCard();
  user.avatar = faker.Image.avatar();
  res.json(user);
});

app.listen(3000, function() {
  console.log('App listening on localhost:3000');
});

// UTIL FUNCTIONS

function authenticate(req, res, next) {
  var body = req.body;
  if (!body.username || !body.password) {
    return res.status(400).end('Must provide username and password');
  }
  if (body.username !== user.username || body.password !== user.password) {
    return res.status(401).end('Username or password incorrect');
  }
  next();
}