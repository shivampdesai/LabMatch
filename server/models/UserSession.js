const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
  id: {
    type: String,
    default: ''
  },
  isLoggedOut: {
    type: Boolean,
    default: false
  }

});

module.exports = mongoose.model('UserSession', UserSessionSchema);
