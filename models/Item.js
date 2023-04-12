const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  price: {
    type: String
  },
  condition: {
    type: String
  }
});

module.exports = mongoose.model('Item', ItemSchema);
