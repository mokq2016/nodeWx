var express = require('express');
var app = express();
var wechat = require('wechat');
var session = require('express-session')
var constellationService = require('./service/constellationService.js')

var schedule = require('node-schedule');
var j = schedule.scheduleJob('0 0 0 * * *', function(){
  new constellationService().getNetHtml();
});
var config = {
  token: 'SDS232JK32KLDSscx',
  appid: 'wx1943a58f1e53ba85',
  encodingAESKey: 'ME48CDvwhjyMV8djW00Hk4tHP7irktxaPNOlPZ3lA3m',
  checkSignature: false // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
};

function getReplyInf(name,callback){
  new constellationService().getXzluck(name,function(obj){
    var reply = '';
    if(obj){
      reply = `${obj.time}\n今日概述：\n${obj.summary}\n${obj.general}\n${obj.love}\n${obj.job}\n${obj.money}\n${obj.helpMan}\n${obj.luckColor}\n${obj.luckNum}\n${obj.health}`;
      callback(reply)
    }else{
      callback('今日运势暂未算出，请稍后再试！')
    }
  })
}
var List = require('wechat').List;
List.add('about', [
  ['回复{a}查看我的性别', function(info, req, res) {
    res.reply('我是个妹纸哟');
  }],
  ['回复{b}查看我的年龄', function(info, req, res) {
    res.reply('我今年18岁');
  }],
  ['回复{c}查看我的性取向', '这样的事情怎么好意思告诉你啦- -']
]);
List.add('help', [
  ['回复{1}查看公众号信息', function(info, req, res) {
    res.wait('about');
  }],
  ['回复{2}查看天气', function(info, req, res) {
    res.reply('今天天气很好，哈哈');
  }],
  ['回复{3}讲笑话', function(info, req, res) {
    jokeModel.find().exec(function(err, result) {
      var index = parseInt(Math.random() * result.length);

      if (err) {
        res.reply('系统出错了哦，请联系管理员！');
      } else {
        res.reply(result[index]['content']);
      }
    })
  }],
  ['回复{4}查看星座运势', function(info, req, res) {
    res.wait('xzluck');
  }]

]);
List.add('xzluck',[
  ['请输入星座，例如：{白羊座}',function(info, req, res){
    if(info.Content.trim() == '白羊座'){
      getReplyInf(info.Content.trim(),function(content){
        res.reply(content);
      })
    }else{
      res.reply('请输入正确的星座名称');
    }
  }],['{金牛座}',function(info, req, res){
    if(info.Content.trim() == '金牛座'){
      getReplyInf(info.Content.trim(),function(content){
        res.reply(content);
      })
    }else{
      res.reply('请输入正确的星座名称');
    }
  }],['{双子座}',function(info, req, res){
    if(info.Content.trim() == '双子座'){
      getReplyInf(info.Content.trim(),function(content){
        res.reply(content);
      })
    }else{
      res.reply('请输入正确的星座名称');
    }
  }],['{巨蟹座}',function(info, req, res){
    if(info.Content.trim() == '巨蟹座'){
      getReplyInf(info.Content.trim(),function(content){
        res.reply(content);
      })
    }else{
      res.reply('请输入正确的星座名称');
    }
  }],['{狮子座}',function(info, req, res){
    if(info.Content.trim() == '狮子座'){
      getReplyInf(info.Content.trim(),function(content){
        res.reply(content);
      })
    }else{
      res.reply('请输入正确的星座名称');
    }
  }],['{处女座}',function(info, req, res){
    if(info.Content.trim() == '处女座'){
      getReplyInf(info.Content.trim(),function(content){
        res.reply(content);
      })
    }else{
      res.reply('请输入正确的星座名称');
    }
  }],['{天枰座}',function(info, req, res){
    if(info.Content.trim() == '天枰座'){
      getReplyInf(info.Content.trim(),function(content){
        res.reply(content);
      })
    }else{
      res.reply('请输入正确的星座名称');
    }
  }],['{天蝎座}',function(info, req, res){
    if(info.Content.trim() == '天蝎座'){
      getReplyInf(info.Content.trim(),function(content){
        res.reply(content);
      })
    }else{
      res.reply('请输入正确的星座名称');
    }
  }],['{射手座}',function(info, req, res){
    if(info.Content.trim() == '射手座'){
      getReplyInf(info.Content.trim(),function(content){
        res.reply(content);
      })
    }else{
      res.reply('请输入正确的星座名称');
    }
  }],['{摩羯座}',function(info, req, res){
    if(info.Content.trim() == '摩羯座'){
      getReplyInf(info.Content.trim(),function(content){
        res.reply(content);
      })
    }else{
      res.reply('请输入正确的星座名称');
    }
  }],['{水瓶座}',function(info, req, res){
    if(info.Content.trim() == '水瓶座'){
      getReplyInf(info.Content.trim(),function(content){
        res.reply(content);
      })
    }else{
      res.reply('请输入正确的星座名称');
    }
  }],['{双鱼座}',function(info, req, res){
    if(info.Content.trim() == '双鱼座'){
      getReplyInf(info.Content.trim(),function(content){
        res.reply(content);
      })
    }else{
      res.reply('请输入正确的星座名称');
    }
  }]
  ])
/*app.use('/wechat',wechat(config,function(req,res,next){
    var message = req.weixin;
    console.log(message);
    res.reply('hehe');
}))*/
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }))
app.use('/wechat', wechat(config, wechat.text(function(info, req, res, next) {
  if (info.Content === 'list') {
    res.wait('view');
  } else if (info.Content === 'help') {
    res.wait('help');
  } else {
    res.reply('输入help获取功能清单');
    // 或者中断等待回复事务
    // res.nowait('hehe');
  }
})));
app.listen(5050, function() {
  console.log('server start')
})
