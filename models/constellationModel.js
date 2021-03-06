var mongoose = require('../db/mongodb');

var constellationScema = mongoose.Schema({
    type:String,
    date:String,
    time:String,
    summary:String,
    general:String,
    love:String,
    job:String,
    money:String,
    helpMan:String,
    luckColor:String,
    luckNum:String,
    health:String
})

var constellationEntity = mongoose.model('constellationEntity',constellationScema,'constellation')
module.exports = constellationEntity;