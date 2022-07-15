const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true  
  },
  attachedImage: {
    type: String,
    required: false
  },
  photoBy: {
    type: String,
    required: false
  }
}, { timestamps: true })

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;