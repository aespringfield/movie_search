var myApp = angular.module('myApp', []);

// controller to grab data from form
myApp.controller('FormController', ['$scope', 'MovieService', function($scope, MovieService) {
  $scope.movies = MovieService.movies;
  $scope.movie = {};
  $scope.pushAndClear = function(movie) {
    var movieCopy = angular.copy(movie);
    $scope.movies.pushMovie(movieCopy);
    for (var key in movie) {
      movie[key] = '';
    }
  };
}]);

// controller to display data on DOM
myApp.controller('DisplayController', ['$scope', 'MovieService', function($scope, MovieService) {
  $scope.movies = MovieService.movies;
}]);

// factory to store array of movies
myApp.factory('MovieService', [function() {
  var movies = {
    movieArray: [],
    pushMovie: function(movie) {
      this.movieArray.push(movie);
    }
  };

  return {
    movies: movies,
  };
}]);
