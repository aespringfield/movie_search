var myApp = angular.module('myApp', []);

// controls input from search form and display of search result
myApp.controller('FormController', ['$scope', 'MovieService', function($scope, MovieService) {
  $scope.getMovieData = MovieService.getMovieData;
  $scope.searchError = MovieService.searchError;
  $scope.displaySearchError = MovieService.displaySearchError;
  $scope.addToFavorites = MovieService.addToFavorites;
  $scope.getFavorites = MovieService.getFavorites;

  // represents the search object. Data property will take results of search.
  $scope.currentMovie = {
    display: false,
    titleInput: '',
    data: undefined,
    reset: function() {
      this.display = false;
      delete this.data;
    }
  };
}]);

// controls display of movies in favorites list
myApp.controller('DisplayController', ['$scope', 'MovieService', function($scope, MovieService) {
  $scope.movies = MovieService.movies;
  $scope.deleteFromFavorites = MovieService.deleteFromFavorites;
  $scope.getFavorites = MovieService.getFavorites;

  // call of getFavorites function to pull any existing info off the database
  $scope.getFavorites();
}]);

// stores objects and methods to be accessed by controllers
myApp.factory('MovieService', ['$http', function($http) {
  // object that will contain an array of stored favorites
  var movies = {
    favoritesList: []
  };

  // object containing a message that will diplay on an invalid search
  var searchError = {
    display: false,
    msg: "No movie found"
  };

// takes a boolean value and displays or doesn't display the error message
  displaySearchError = function(value) {
    if (value) {
      searchError.display = true;
    } else {
      searchError.display = false;
    }
  };

  return {
    movies: movies,
    searchError: searchError,

    // makes a GET request to OMDB API for info matching the title of a given movie
    // if the search is valid, puts the results of the search in the data property of currentMovie
    // if the search is invalid, displays search error
    getMovieData: function(currentMovie) {
      displaySearchError(false);
      $http.get('http://www.omdbapi.com/?t=' + currentMovie.titleInput + '&type=movie&y=&plot=short&r=json').then(function(response) {
        console.log(response.data);
        if (response.data.Response == "True") {
          currentMovie.titleInput = '';
          currentMovie.data = response.data;
          currentMovie.display = true;
        } else {
          currentMovie.reset();
          displaySearchError(true);
        }
      });
    },

    // makes a POST request to the database to store data for a given movie.
    // uses a callback function to fetch all data from database
    addToFavorites: function(currentMovie, getFavorites) {
      $http.post('/movie', currentMovie.data).then(function(response) {
        console.log(response);
        getFavorites();
      });
      currentMovie.reset();
    },

    // makes a GET request to the database to retrieve data for all favorite movies
    getFavorites: function() {
      $http.get('/movie').then(function(response){
        movies.favoritesList = response.data;
      });
    },

    // makes a DELETE requst to the database
    // uses the _id property of a movie referenced by its index in the favoritesList
    // sends the _id of the movie to delete as a URL parameter
    // uses a callback function to fetch all current data from database
    deleteFromFavorites: function(index, getFavorites) {
      var _id = movies.favoritesList[index]._id;
      $http.delete('/movie/' + _id).then(function(response) {
        console.log(response);
        getFavorites();
      });
    }
  };
}]);
