const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  attr: {
    type: Object,
    required: true
  },
  categ: {
    type: Object,
    required: true
  },
  proofOfResidency: {
    type: Object,
    required: false
  },
  qrCode: {
    type: String,
    default: ''
  },
  pets: {
    type: Object,
    default: []
  },
  approved: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;