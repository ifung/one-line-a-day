var mongoose = require('mongoose');

var journalSchema = new mongoose.Schema({
  user_id: String,
  0101: Array,
  0102: Array,
  0102: Array,
  0103: Array,
  0104: Array,
  0105: Array
});

module.exports = mongoose.model('Journal', journalSchema);