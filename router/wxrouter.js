var router = require('express').Router();
var crypto = require('crypto');
var wxService = require('../api/wxapi');
function sha1(str) {  
    var md5sum = crypto.createHash("sha1");  
    md5sum.update(str);  
    str = md5sum.digest("hex");  
    return str;  
}  
router.get('/validateToken', function(req, res, next) {
  var signature = req.query.signature;
  var timestamp = req.query.timestamp;
  var nonce = req.query.nonce;
  var echostr = req.query.echostr;
  var oriArray = [];
  oriArray[0] = nonce;  
    oriArray[1] = timestamp;  
    oriArray[2] = "SDS232JK32KLDSscx";  
    oriArray.sort();  
    console.log(req.query)
    
  if(signature == sha1(oriArray.join(''))){
      console.log(echostr)
      res.send(echostr); 
  }else{
      res.send("false");  
        console.log("validateToken failed!");  
  }
  next();
});

router.post('/validateToken',function(req, res,next){
    wxService.parseMsg(req,res);
    next();
})
module.exports = router;
