var eventsManage = require('./events')
var test = require('./test')
// eventsManage.on('upload',function(){
//     console.log(123)
// })

// setInterval(function(){
//     eventsManage.emit('upload');
// },2000)
var schedule = require('node-schedule');
var j = schedule.scheduleJob('50 * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});
var options = {
    a:12,
    b:234
}
Object.assign(options,{a:22,c:2223})
console.log(options)