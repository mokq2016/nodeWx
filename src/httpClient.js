var http = require('http');
var iconv = require('../node_modules/iconv-lite');

class httpClient {
  constructor(url,options,encoding) {
    this.url = url;
    this.encoding = encoding;
    this.options = {
      host: 'www.jokeji.cn',
      port: '80',
      path: '/jokehtml/ym/2017092623154972.htm'
    };
    Object.assign(this.options,options)
  }
  request(callback) {
    let self = this;
    var req = http.request(this.options,function(response){
        // 不断更新数据
    var body = '';
    response.on('data', function(data) {
      
      if(self.encoding){
        body += iconv.decode(data, self.encoding);
      }else{
        body += data;
      }
    });

    response.on('end', function() {
        console.log(body)
      // 数据接收完成
      callback(body)
    });
    })
    req.end();
  }
  get(callback){
    let self = this;
    var req = http.get(this.url,function(response){
        // 不断更新数据
    var body = '';
    response.on('data', function(data) {
      
      if(self.encoding){
        body += iconv.decode(data, self.encoding);
      }else{
        body += data;
      }
    });

    response.on('end', function() {
      // 数据接收完成
      callback(body)
    });
    })
  }
}
module.exports = httpClient;
