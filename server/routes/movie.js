var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var MovieSchema = mongoose.Schema({
  title: String,
  actors: String,
  director: String,
  plot: String,
  poster: String,
});

var Movie = mongoose.model('movies', MovieSchema);

// GET route to retrieve all movies from movies collection
router.get('/', function(req, res) {
  Movie.find(function(err, allMovies) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.send(allMovies);
  });
});

// POST route to store a movie in movies collection
router.post('/', function(req, res) {
  var movie = new Movie();
  movie.title = req.body.Title;
  movie.actors = req.body.Actors;
  movie.director = req.body.Director;
  movie.plot = req.body.Plot;
  movie.poster = req.body.Poster;
  movie.save(function (err, savedMovie) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.send(savedMovie);
  });
});

// DELETE route to delete a movie from movies collection, based on ID passed as URL parameter
router.delete('/:id', function(req, res) {
  var _id = req.params.id;
  var query = {_id: _id};
  Movie.remove(query, function(err, movieToDelete) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.send(movieToDelete);
  });
});

module.exports = router;
