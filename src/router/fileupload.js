var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');


var Storage  = multer.diskStorage({
  destination: function (req, file, cb) {//计算图片存放地址
    cb(null, './imgs')
  },
  filename: function (req, file, cb) {//图片文件名
    console.log(file);
    cb(null, file.originalname)
  }
})
var upload = multer({storage:Storage}).single('file2');//file2表示图片上传文件的key

router.post('/uploadFile',function(req, res, next){
    upload(req, res, function (err) {
        console.log(err)
        if (err) {
            return res.end(err);
        }
        return res.end("File uploaded sucessfully!.");
    });
})
module.exports = router;