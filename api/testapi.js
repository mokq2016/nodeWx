var wx = {
  count: 0,
  calcate(req, res, num) {
    this.count++;
    var time = req.query.curTime;
    if (num == 5) {
      setTimeout(() =>{
        res.send({ time: time, count: this.count, num: num });
      }, 5000)
      return
    }
    res.send({ time: time, count: this.count, num: num });
  }
}
module.exports = wx;
