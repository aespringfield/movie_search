var myApp = angular.module('myApp', []);

myApp.controller('FormController', ['$scope', 'MovieService', function($scope, MovieService) {
  $scope.getMovieData = MovieService.getMovieData;
  $scope.searchError = MovieService.searchError;
  $scope.displaySearchError = MovieService.displaySearchError;
  $scope.movie = {};
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
    getMovieData: function(title) {
      displaySearchError(false);
      $http.get('http://www.omdbapi.com/?t=' + title + '&y=&plot=full&r=json').then(function(response) {
        console.log(response.data.Response);
        if (response.data.Response == "True") {
          movieList.push(response);
        } else {
          displaySearchError(true);
        }
        console.log(searchError.display);
      });
    },
  };
}]);
