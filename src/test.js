// var jokeService = require('../service/jokeService')
// var jokeModel = require('../models/jokeModel')
// jokeModel.find().exec(function(err,result){
//     var index = parseInt(Math.random()*result.length);
//     console.log(index)
// })
var eventsManage = require('./events')
class Joke {
    constructor(){
        eventsManage.on('upload',function(){
            console.log(124)
        })
    }
}
module.exports = new Joke()
