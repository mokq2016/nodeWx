const httpClient = require('../src/httpClient');
var cheerio = require('cheerio');
class constellationService{
    constructor(){

    }
    getNetHtml(){
        var options = {
            host:'astro.fashion.qq.com',
            port:'80',
            path:'/06newver/horoscope.shtml'
        }
        var url = "http://astro.fashion.qq.com/06newver/horoscope.shtml";
        var self = this;
        new httpClient(url,{},'GB2312').get(function(html){
            var $ = cheerio.load(html,{decodeEntities: false}); //采用cheerio模块解析html
            $("#yunshi #fod1list p span a").each(function(){
                var url = $(this).attr('href');
                if(url.indexOf('dayastro') !== -1){
                    self.getHtmlDetail(url);
                }
            })  
        })
    },
    getHtmlDetail(url){

    }
}
new constellationService().getNetHtml()