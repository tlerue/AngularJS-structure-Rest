// define model =================
var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    text : String
});
