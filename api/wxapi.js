var xml2js = require('xml2js');
var Wx = {
  data: '',
  msgType: 'text',
  fromUserName: '',
  toUserName: '',
  content:'暂不支持处理该类型消息',
  parseMsg(req, res) {
    var buf = '';
    req.on('data', function(chunk) {
      buf += chunk;
    })
    req.on('end', () => {
      xml2js.parseString(buf, function(err, result) {
        if (err) {
          err.status = 400;
        } else {
          req.body = result;
        }
      });
      this.data = req.body.xml;
      this.fromUserName = this.data.FromUserName[0];
      this.toUserName = this.data.ToUserName[0];
      switch (this.data.MsgType[0]) {
        case 'text':
        this.content = this.data.Content[0];
          this.handleTextMsg();
          break;
        default:
          // statements_def
          break;
      }
      var responseTxt = this.getXmlMsg();
      console.log(responseTxt)
      res.type('xml');
      res.send(responseTxt)
    })
  },
  handleTextMsg() {

  },
  getXmlMsg() {
    return `<xml><ToUserName><![CDATA[${this.fromUserName}]]></ToUserName>
    <FromUserName><![CDATA[${this.toUserName}]]></FromUserName>
    <CreateTime>${new Date().getTime()}</CreateTime>
    <MsgType><![CDATA[${this.msgType}]]></MsgType>
    <Content><![CDATA[${this.content}]]></Content>
    </xml>`;
  }
}
module.exports = Wx;
