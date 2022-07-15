const Incident = require('../models/Incident');

module.exports.createIncident = async (req, res) => {  
  try {
    const incident = await Incident.create(req.body)
    
    if (incident) {
      afterCreateIncident(incident._id, incident.proofOfIncident)
      res.json({ message: "success", incident })
    }
  } catch(error) {
    res.json({ message: "failed", error })
  }
}

module.exports.browseIncident = async (req, res) => {
  try {
    const listIncident = await Incident.find();

    if (listIncident) {
      res.json({ message: "success", data: listIncident })
    }
  } catch(error) {
    res.json({ message: "failed", error })
  }
}

module.exports.updateIncident = async (req, res) => {
  try {
    const id = req.params.id;
    const updateIncident = await Incident.findByIdAndUpdate(id, {
      status: req.body.status
    });

    if (updateIncident) {
      res.json({ message: "success", incident: updateIncident });
    }
  } catch (error) {
    res.json({ message: 'failed', error })
  }
}

// extra functions

const afterCreateIncident = async (incidentID, proofOfIncident) => {
  await Incident.findByIdAndUpdate(incidentID, {
    proofOfIncident: `poi/images/${incidentID}/${proofOfIncident}`
  })
}