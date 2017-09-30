const httpClient = require('../src/httpClient');
var cheerio = require('cheerio');
var constellationEntity = require('../models/constellationModel')
require('../api/common')
class constellationService {
  constructor() {

  }
  getNetHtml() {
    var options = {
      host: 'astro.fashion.qq.com',
      port: '80',
      path: '/06newver/horoscope.shtml'
    }
    var url = "http://astro.fashion.qq.com/06newver/horoscope.shtml";
    var self = this;
    new httpClient(url, {}, 'GB2312').get(function(html) {
      var $ = cheerio.load(html, { decodeEntities: false }); //采用cheerio模块解析html
      $("#yunshi #fod1list p span a").each(function() {
        var url = $(this).attr('href');
        if (url.indexOf('dayastro') !== -1) {
          self.getHtmlDetail(url);
        }
      })
    })
  }
  getHtmlDetail(url) {
    new httpClient(url, {}, 'GB2312').get(function(html) {
      var property = ['general', 'love', 'job', 'money']
      var property2 = ['helpMan', 'luckColor', 'luckNum', 'health']
      var $ = cheerio.load(html, { decodeEntities: false }); //采用cheerio模块解析html
      var type = $(".nav li.on span").text()
      var $detail = $(".xiangxi");
      var date = $detail.find(".main_right #Today1 span").text()
      var time = $detail.find(".main_left span").text()
      var $duanluo = $detail.find(".main_right .duanluo")
      var summary = $duanluo.find("#maintext").text();
      var zhishu = '';
      $duanluo.find(".p2").each(function(index) {
        zhishu = '';
        property2[index] = $(this).find(".span2").text()
        zhishu += $(this).find(".timu span").text();
        //property[index] = $(this).find(".timu span").text()+ getLevel($(this).find(".timu img"))
        $(this).find(".timu img").each(function() {
          if ($(this).attr('src').indexOf('xing1.jpg') != -1) {
            zhishu += '★';
          } else {
            zhishu += '☆';
          }
        })
        property[index] = zhishu;
      })
      var constellation = new constellationEntity({
        type: type,
        date: date,
        time: time,
        summary: summary,
        general: property[0],
        love: property[1],
        job: property[2],
        money: property[3],
        helpMan: property2[0],
        luckColor: property2[1],
        luckNum: property2[2],
        health: property2[3]
      })
      constellation.save(function(err, obj) {
        if (err) {
          console.log(err)
        } else {
          console.log(obj)
        }
      })
    })
  }
  getXzluck(name, callback) {
    constellationEntity.findOne({ type: name, date: new Date().format('yyyy/MM/dd') }, function(err, obj) {
      if (err) {
        console.log(err)
      } else {
        callback(obj)
      }
    })

  }
}
// new constellationService().getXzluck('狮子座', function(obj) {
//   console.log(obj)
// })
module.exports = constellationService;
