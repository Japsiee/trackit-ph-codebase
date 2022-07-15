const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  detail: {
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
  complaineeName: {
    type: String,
    required: true
  },
  complaineeLocation: {
    type: String,
    required: true
  },
  proofOfComplaint: {
    type: String
  },
  status: {
    type: String,
    default: 'pending'
  }
}, { timestamps: true })

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;