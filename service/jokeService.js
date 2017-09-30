const EventEmitter = require('events');
class JokeService extends EventEmitter {
    
}
const jokeService = new JokeService();
jokeService.on('saveJoke',function(){
    console.log(1234)
})

module.exports = jokeService