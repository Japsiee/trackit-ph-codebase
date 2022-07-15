const Document = require('../models/Document');
const Incident = require('../models/Incident');
const Complaint = require('../models/Complaint');
const Announcement = require('../models/Announcement');

module.exports.getAllRequests = async (req, res) => {
  try {
    const docs = await Document.find();
    const comps = await Complaint.find();
    const inci = await Incident.find();
    const ann = await Announcement.find();
  
    if (docs && comps && inci && ann) {
      res.json({ message: "success", data: {
        documents: docs,
        complaints: comps,
        incidents: inci,
        announcements: ann
      }})
    }
  } catch(err) {    
    res.json({ message: "failed" })
  }
}