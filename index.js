const express = require('express'),
bodyParser = require('body-parser'),
    morgan = require('morgan');

const app = express();

let topMovies = [
    {
        'title': 'Parasite',
        'year': '2019'
    },
    {
        'title': 'The Princess Bride',
        'year': '1987'
    },
    {
        'title': 'Jurassic Park',
        'year': '1993'
    },
    {
        'title': 'The Dark Knight',
        'year': '2008'
    },
    {
        'title': 'Legally Blonde',
        'year': '2011'
    },
    {
        'title': 'Lady Bird',
        'year': '2017'
    },
    {
        'title': 'Get Out',
        'year': '2017'
    },
    {
        'title': 'The Matrix',
        'year': '1999'
    },
    {
        'title': 'Toy Story',
        'year': '1995'
    },
    {
        'title': 'The Breakfast Club',
        'year': '1985'
    },

];

// GET Requests
app.use(morgan('common'));

app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
  });

app.get('/movies', (req, res) => {
    res.json(topMovies);
    //res.send('Successful GET request returning data on all movies.')
  });

app.get('/movies/:title', (req, res) => {
    res.send('Successful GET request returning data on ' + req.params.title)
  });

app.get('/movies/genre/:name', (req, res) => {
    res.send('Successful GET request returning data on ' + req.params.name + ' movies')
  });

app.get('/movies/director/:name', (req, res) => {
    res.send('Successful GET request returning data on ' + req.params.name)
  });

app.post('/users', (req, res) => {
    res.send('Successful POST request registering new user.')
  });

app.put('/users/:username/', (req, res) => {
    res.send('Successful PUT request updating profile information for ' + req.params.username)
  });

app.put('/users/:username/movies/:_id', (req, res) => {
    res.send('Successful PUT request modifying movie list ' + ' for ' + req.params.username)
  });

app.delete('/users/:username/:id', (req, res) => {
    res.send('Successful DELETE request deleting user ' + req.params.username + ' from the registry.')
  });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something isn\'t quite right with the page!');
  });

app.listen(8080, () =>{
    console.log('Your app is listening on port 8080.');
});
