var myApp = angular.module('myApp', []);

myApp.controller('FormController', ['$scope', 'MovieService', function($scope, MovieService) {
  $scope.getMovieData = MovieService.getMovieData;
}]);

myApp.controller('DisplayController', ['$scope', 'MovieService', function($scope, MovieService) {
  $scope.dataFromServer = MovieService.dataFromServer;
}]);

myApp.factory('MovieService', ['$http', function($http) {
  var dataFromServer = {};
  return {
    dataFromServer: dataFromServer,
    getMovieData: function() {
      $http.get('/movieData').then(function(response) {
        dataFromServer.response = response;
      });
    }
  };
}]);
