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

router.get('/', function(req, res) {
  Movie.find(function(err, allMovies) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.send(allMovies);
  });
});

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
