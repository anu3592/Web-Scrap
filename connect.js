const mongoose = require('mongoose');

const schema = mongoose.Schema({
    img:String,
    title:String,
    date:String,
    likes:String
});

module.exports = mongoose.model('scrappings', schema);
