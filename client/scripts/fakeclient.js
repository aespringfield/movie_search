// var myApp = angular.module('myApp', []);
//
// // controller to grab data from form
// myApp.controller('FormController', ['$scope', 'MovieService', function($scope, MovieService) {
//   $scope.movies = MovieService.movies;
// }]);
// 
// // controller to display data on DOM
// myApp.controller('DisplayController', ['$scope', 'MovieService', function($scope, MovieService) {
//   $scope.movies = MovieService.movies;
// }]);
//
// // factory to store array of movies
// myApp.factory('MovieService', [function() {
//   var movies = {
//     movieArray: [],
//     movieData: {
//         title: '',
//         desc: '',
//         dir: '',
//         time: '',
//     },
//     createMovie: function() {
//       // var movie = {
//       //   title: this.movieData.title,
//       //   desc: this.movieData.desc,
//       //   dir: this.movieData.dir,
//       //   time: this.movieData.time
//       // };
//       console.log(this.movieData);
//       // this.movieArray.push(movie);
//       this.movieArray.push(this.movieData);
//       console.log(this.movieArray);
//       for (var key in this.movieData) {
//         this.movieData[key] = '';
//       }
//     }
//   };
//
//   return {
//     movies: movies,
//   };
// }]);
