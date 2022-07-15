const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incidentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String
  },
  detail: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  emergencyNeeds: {
    type: Object
  },
  proofOfIncident: {
    type: String
  },
  status: {
    type: String,
    default: 'pending'
  }
}, { timestamps: true })

const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;