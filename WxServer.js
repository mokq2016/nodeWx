var express = require('express');
var app = express();
var wechat = require('wechat');
var session = require('express-session')
var jokeModel = require('./models/jokeModel')

var config = {
  token: 'SDS232JK32KLDSscx',
  appid: 'wx1943a58f1e53ba85',
  encodingAESKey: 'ME48CDvwhjyMV8djW00Hk4tHP7irktxaPNOlPZ3lA3m',
  checkSignature: false // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
};


var List = require('wechat').List;
List.add('about', [
  ['回复{a}查看我的性别', function (info, req, res) {
    res.reply('我是个妹纸哟');
  }],
  ['回复{b}查看我的年龄', function (info, req, res) {
    res.reply('我今年18岁');
  }],
  ['回复{c}查看我的性取向', '这样的事情怎么好意思告诉你啦- -']
]);
List.add('help', [
  ['回复{1}查看公众号信息', function (info, req, res) {
    res.wait('about');
  }],
  ['回复{2}查看天气', function (info, req, res) {
    res.reply('今天天气很好，哈哈');
  }],
  ['回复{3}讲笑话', function(info, req, res){
    jokeModel.find().exec(function(err,result){
    var index = parseInt(Math.random()*result.length);
    
    if(err){
      res.reply('系统出错了哦，请联系管理员！');
    }else{
      res.reply(result[index]['content']);
    }
})
  }]
]);
/*app.use('/wechat',wechat(config,function(req,res,next){
    var message = req.weixin;
    console.log(message);
    res.reply('hehe');
}))*/
app.use(session({secret: 'keyboard cat', cookie: {maxAge: 60000}}))
app.use('/wechat', wechat(config, wechat.text(function (info, req, res, next) {
  if (info.Content === 'list') {
    res.wait('view');
  } else if(info.Content === 'help'){
    res.wait('help');
  }else {
    res.reply('输入help获取功能清单');
    // 或者中断等待回复事务
    // res.nowait('hehe');
  }
})));
app.listen(5050,function(){
    console.log('server start')
})