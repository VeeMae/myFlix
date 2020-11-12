const express = require('express'),
    morgan = require('morgan');

const app = express();

let topMovies = [
    {
        title: 'Parasite',
        year: '2019'
    },
    {
        title: 'The Princess Bride',
        year: '1987'
    },
    {
        title: 'Jurassic Park',
        year: '1993'
    },
    {
        title: 'The Dark Knight',
        year: '2008'
    },
    {
        title: 'Legally Blonde',
        year: '2011'
    },
    {
        title: 'Lady Bird',
        year: '2017'
    },
    {
        title: 'Get Out',
        year: '2017'
    },
    {
        title: 'The Matrix',
        year: '1999'
    },
    {
        title: 'Toy Story',
        year: '1995'
    },
    {
        title: 'The Breakfast Club',
        year: '1985'
    },

];

// GET Requests
app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
  });

app.get('/movies', (req, res) => {
    res.json(topMovies);
  });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something isn\'t quite right with the page!');
  });

app.listen(8080, () =>{
    console.log('Your app is listening on port 8080.');
});

