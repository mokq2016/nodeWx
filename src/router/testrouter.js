var router  = require('express').Router();
var wx = require('../../api/testapi.js')
var count = 0;
router.get('/test1',function(req,res){
    count ++;
    wx.calcate(req,res,count)
})

module.exports = router;