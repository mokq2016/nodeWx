var http = require('http');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var jokeEntity = require('./models/jokeModel')
// 用于请求的选项
var options = {
  host: 'www.jokeji.cn',
  port: '80',
  path: '/jokehtml/ym/2017092623154972.htm'
};

// 处理响应的回调函数
var callback = function(response) {
    // 不断更新数据
    var body = '';
    response.on('data', function(data) {
      body += iconv.decode(data, 'GB2312');
    });

    response.on('end', function() {
      // 数据接收完成
      //console.log(body);
      var $ = cheerio.load(body,{decodeEntities: false}); //采用cheerio模块解析html
      $('#text110 p').each(function(){
        //console.log($(this).html())
        var joke = new jokeEntity({
          type:'ym',
          content:$(this).html()
        })
        joke.save(function(err,joke){
          if(err){
            console.log(err);
            return;
          }else{
            console.log(joke)
          }
        })
      })
    });
  }
  // 向服务端发送请求
/*for (var i = 10; i >= 0; i--) {*/
  //setInterval(function() {
    var req = http.request(options, callback);
    req.end();
 // }, 1000)

/*}*/
