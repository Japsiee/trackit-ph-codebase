const Complaint = require('../models/Complaint');

module.exports.createComplaint = async (req, res) => {  
  try {
    const complaint = await Complaint.create(req.body)

    if (complaint) {
      afterCreateComplaint(complaint._id, complaint.proofOfComplaint)
      res.json({ message: "success", complaint })
    }
  } catch(error) {
    res.json({ message: "failed", error })
  }
}

module.exports.browseComplaint = async (req, res) => {
  try {
    const listComplaint = await Complaint.find();
    
    if (listComplaint) {
      res.json({ message: "success", data: listComplaint})
    }
  } catch(error) {
    res.json({ message: "failed", error })
  }
}

module.exports.updateComplaint = async (req, res) => {
  try {
    const id = req.params.id;
    const updateComplaint = await Complaint.findByIdAndUpdate(id, {
      status: req.body.status
    });

    if (updateComplaint) {
      res.json({ message: "success", complaint: updateComplaint });
    }
  } catch (error) {
    res.json({ message: 'failed', error })
  }
}

// extra functions

const afterCreateComplaint = async (complaintID, complaintProof) => {
  await Complaint.findByIdAndUpdate(complaintID, {
    proofOfComplaint: `poc/images/${complaintID}/${complaintProof}`
  })
}