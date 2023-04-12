const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  itemId: {
    type: String
  },
  userId: {
    type: String
  }
});

module.exports = mongoose.model('Item', ItemSchema);
