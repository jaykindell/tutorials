const express = require('express');

const app = express();

const port = process.env.PORT || 8080;

// sample route with a route the way we're used to seeing it
app.get('/sample', (req, res) => {
  res.send('this is a sample!');
});

// we'll create our routes here

// make an instance of router
const router = express.Router();

// gonna make some middleware
router.use((req, res, next) => {
  // logs some info about the req
  console.log(req.method, req.url);
  // moves on to the next thing down the page
  next();
});

// this middleware will validate a parameter, name
router.param('name', (req, res, next, name) => {
  // some validation logic
  console.log(`the name (${name}) is valid`);

  // put the name in the request so it'll fall through
  req.name = name;

  // and move on to the next thing
  next();
});


// make a homepage route
router.get('/', (req, res) => {
  res.send('you\'ve hit the home page');
});

// and an about page route
router.get('/about', (req, res) => {
  res.send('about this page');
});

// here's how to handle params
router.get('/hello/:name', (req, res) => {
  res.send(`hullo ${req.name}`);
});

// and check this shit out
// we can make routes directly on the app

app.route('/login')
  .get((req, res) => {
    res.send('this is a login form');
  })
  .post((req, res) => {
    res.send('you\'re trying to log in');
  });


// give app the routes
app.use('/', router);

// START THE SERVER
// ==============================================
app.listen(port);
console.log(`Magic happens on port ${port}`);
