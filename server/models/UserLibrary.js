const mongoose = require('mongoose');

const UserLibrarySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  liked: {
    type: Array,
    default: []
  },
  recentlyPlayed: {
    type: Array,
    default: []
  },
  customPlaylists: {
    type: Array,
    default: []
  },
  following: {
    type: Array,
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('UserLibrary', UserLibrarySchema);
