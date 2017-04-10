var myApp = angular.module('myApp', []);

myApp.controller('FormController', ['$scope', 'MovieService', function($scope, MovieService) {
  $scope.getMovieData = MovieService.getMovieData;
  $scope.searchError = MovieService.searchError;
  $scope.displaySearchError = MovieService.displaySearchError;
  $scope.addToFavorites = MovieService.addToFavorites;
  $scope.getFavorites = MovieService.getFavorites;
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
  $scope.movieObj = MovieService.movieObj;
  $scope.movieList = MovieService.movieObj.movieList;
  $scope.deleteFromFavorites = MovieService.deleteFromFavorites;
  $scope.getFavorites = MovieService.getFavorites;
  $scope.getFavorites();
  $scope.printIndex = function() {
    console.log($index);
  };

  // $scope.plotShrinker = function(plot) {
  //   var firstPeriod = plotString.indexOf('.');
  //   var firstSent = plotString.substring(0, firstPeriod);
  //   var restOfPlot = plotString.substring(firstPeriod, plotString.length);
  //   return {firstSent: firstSent, restOfPlot: restOfPlot, shrunk: true};
  // };


}]);

myApp.factory('MovieService', ['$http', function($http) {
  var movieObj = {
    movieList: []
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
    movieObj: movieObj,
    searchError: searchError,
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
    addToFavorites: function(currentMovie, getFavorites) {
      $http.post('/movie', currentMovie.data).then(function(response) {
        console.log(response);
        getFavorites();
      });
      currentMovie.reset();
    },
    getFavorites: function() {
      $http.get('/movie').then(function(response){
        movieObj.movieList = response.data;
      });
    },
    deleteFromFavorites: function(index, getFavorites) {
      var _id = movieObj.movieList[index]._id;
      $http.delete('/movie/' + _id).then(function(response) {
        console.log(response);
        getFavorites();
      });
    }
  };
}]);
