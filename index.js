const express = require('express'),
bodyParser = require('body-parser'),
    morgan = require('morgan');
const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
const app = express();
const passport = require('passport');
require('./passport');

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());

let auth = require('./auth')(app);

/* REQUESTS */

//Homepage
app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

//RETURN A LIST OF ALL MOVIES
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error ' + err);
      });
  });


//RETURN DATA ABOUT A SPECIFIC MOVIE BY TITLE
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//RETURN DATA ABOUT A GENRE BY NAME
app.get('/movies/genre/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Genre.Name': req.params.Name })
  .then((Movies) => {
    res.json(Movies.Genre);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//RETURN DATA ABOUT A DIRECTOR BY NAME
app.get('/movies/director/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.Name })
  .then((Movies) => {
    res.json(Movies.Director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//ALLOW NEW USERS TO REGISTER
//Doesn't need authentication as it would allow first-time users to register
app.post('/users', (req, res) => {
  Users.findOne({ username: req.body.username })
    .then((user) => {
       if (user) {
         return res.status(400).send(req.body.username + ' already exists.');
        } else {
          Users
            .create({
              username: req.body.username,
              password: req.body.password,
              email: req.body.email,
              birthday: req.body.birthday
            })
            .then((user) =>{res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

//GET ALL USERS
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//GET A USER BY USERNAME
app.get('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ username: req.params.username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//ALLOW USERS TO UPDATE THEIR USER PROFILE
app.put('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ username: req.params.username }, { $set:
    {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      birthday: req.body.birthday
    }
  },
  { new: true },
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
  });

//ALLOW USERS TO ADD A MOVIE TO THEIR LIST OF FAVORITES
app.put('/users/:username/movies/:movieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ username: req.params.username }, {
     $push: { FavoriteMovies: req.params.movieID}
   },
   { new: true }, //This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//ALLOW USERS TO REMOVE A MOVIE FROM THEIR LIST OF FAVORITES
app.put('/users/:username/movies/delete/:movieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ username: req.params.username }, {
     $pull: { FavoriteMovies: req.params.movieID }
   },
   { new: true }, //This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//ALLOW EXISTING USERS TO DEREGISTER FROM THE REGISTRY
app.delete('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ username: req.params.username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.username + ' was not found');
      } else {
        res.status(200).send(req.params.username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something isn\'t quite right with the page!');
  });

app.listen(8080, () =>{
    console.log('Your app is listening on port 8080.');
});
