const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    maxlength: 50,
    unique: true
  },
  creationDate: {
    type: Date
  }
});

module.exports = mongoose.model('Session', SessionSchema);
