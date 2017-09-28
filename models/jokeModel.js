var mongoose = require('../db/mongodb');

var jokeScema = mongoose.Schema({
    type:String,
    content:String
})

var jokeEntity = mongoose.model('jokeEntity',jokeScema,'joke')
module.exports = jokeEntity;