var myApp = angular.module('myApp', []);

myApp.controller('FormController', ['$scope', 'MovieService', function($scope, MovieService) {
  $scope.getMovieData = MovieService.getMovieData;
  $scope.searchError = MovieService.searchError;
  $scope.displaySearchError = MovieService.displaySearchError;
  $scope.addToFavorites = MovieService.addToFavorites;
  $scope.currentMovie = {
    display: false,
    titleInput: '',
    reset: function() {
      this.display = false;
      delete this.data;
    }
  };
}]);

myApp.controller('DisplayController', ['$scope', 'MovieService', function($scope, MovieService) {
  $scope.movieList = MovieService.movieList;
}]);

myApp.factory('MovieService', ['$http', function($http) {
  var movieList = [];
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
    movieList: movieList,
    searchError: searchError,
    getMovieData: function(currentMovie) {
      displaySearchError(false);
      $http.get('http://www.omdbapi.com/?t=' + currentMovie.titleInput + '&type=movie&y=&plot=full&r=json').then(function(response) {
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
    addToFavorites: function(currentMovie) {
      movieList.push(currentMovie.data);
      $http.post('/movie', currentMovie.data).then(function(response) {
        console.log(response);
      });
      currentMovie.reset();
    }
  };
}]);
