const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  typeOfDocument: {
    type: String,
    required: true
  },
  typeOfID: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true  
  },
  email: {
    type: String,
    required: true
  },
  proofOfID: {
    type: Object
  },
  status: {
    type: String,
    default: 'pending'
  }
}, { timestamps: true })

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;