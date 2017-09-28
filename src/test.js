var jokeService = require('../service/jokeService')
var jokeModel = require('../models/jokeModel')
jokeModel.find().exec(function(err,result){
    var index = parseInt(Math.random()*result.length);
    console.log(index)
})
