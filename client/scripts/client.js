var myApp = angular.module('myApp', []);

myApp.controller('FormController', ['$scope', 'MovieService', function($scope, MovieService) {
  $scope.getMovieData = MovieService.getMovieData;
  $scope.searchError = MovieService.searchError;
  $scope.displaySearchError = MovieService.displaySearchError;
  $scope.addToFavorites = MovieService.addToFavorites;
  $scope.getFavorites = MovieService.getFavorites;
  $scope.movies = MovieService.movies;
  // $scope.currentMovie = {
  //   display: false,
  //   titleInput: '',
  //   reset: function() {
  //     this.display = false;
  //     delete this.data;
  //   }
  // };
}]);

myApp.controller('DisplayController', ['$scope', 'MovieService', function($scope, MovieService) {
  $scope.movies = MovieService.movies;
  $scope.favoritesList = MovieService.movies.favoritesList;
  $scope.deleteFromFavorites = MovieService.deleteFromFavorites;
  $scope.getFavorites = MovieService.getFavorites;
  $scope.getFavorites();
}]);

myApp.factory('MovieService', ['$http', function($http) {
  var movies = {
    resultsList = [],
    favoritesList: []
  };
  var searchError = {
    display: false,
    msg: "No movie found"
  };
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
    getMovieData: function(currentMovie) {
      displaySearchError(false);
      $http.get('http://www.omdbapi.com/?t=' + currentMovie.titleInput + '&type=movie&y=&plot=short&r=json').then(function(response) {
        console.log(response.data);
        if (response.data.Response == "True") {
          // currentMovie.titleInput = '';
          // currentMovie.data = response.data;
          // currentMovie.display = true;
          movies.resultsList.push(response.data);
        } else {
          // currentMovie.reset();
          displaySearchError(true);
        }
      });
    },
    addToFavorites: function(index, getFavorites) {
      var movie = movies.resultsList[index];
      $http.post('/movie', movie).then(function(response) {
        console.log(response);
        getFavorites();
      });
      currentMovie.reset();
    },
    getFavorites: function() {
      $http.get('/movie').then(function(response){
        movies.favoritesList = response.data;
      });
    },
    deleteFromFavorites: function(index, getFavorites) {
      var _id = movies.favoritesList[index]._id;
      $http.delete('/movie/' + _id).then(function(response) {
        console.log(response);
        getFavorites();
      });
    }
  };
}]);
