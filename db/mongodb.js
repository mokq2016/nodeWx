var mongoose = require('mongoose'),
DB_URL = 'mongodb://39.108.130.190:27017/weixin';

mongoose.connect(DB_URL,{useMongoClient:true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log(callback)
});

module.exports = mongoose;