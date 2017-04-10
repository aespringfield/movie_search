var mongoose = require('mongoose');
var mongoURI = 'mongodb://moviesearcher:moviesearchy@ds157740.mlab.com:57740/moviesearch';
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err){
  console.log('Mongo Connection Error: ' + err);
});

MongoDB.once('open', function(){
  console.log('Connected to Mongo');
});

module.exports = MongoDB;
