const Schedule = require('../models/Schedule');

module.exports.browseSchedule = async (req, res) => { 
  try {
    const listSchedule = await Schedule.find();

    if (listSchedule) {
      res.json({ message: "success", listSchedule })
    }
  } catch(error) {
    res.json({ message: "failed", error })
  }
}

module.exports.createSchedule = async (req, res) => { 
  try {
    const createdSchedule = await Schedule.create(req.body);
  
    if (createdSchedule) {
      res.json({ message: 'success', createdSchedule })
    }
  } catch(error) {
    res.json({ message: "failed", error })
  }
}

module.exports.updateSchedule = async (req, res) => {
  try {
    const scheduleID = req.params._id;
    
    const updatedSchedule = await Schedule.findByIdAndUpdate(scheduleID, req.body)
    
    if (updatedSchedule) {
      res.json({ message: 'success', updatedSchedule })
    }
  } catch(error) {
    res.json({ message: "failed", error })
  }
}

module.exports.deleteSchedule = async (req, res) => {
  try {
    const scheduleID = req.params._id;

    const deletedSchedule = await Schedule.findByIdAndDelete(scheduleID);

    if (deletedSchedule) {
      res.json({ message: 'success', deletedSchedule })
    }
  } catch(error) {
    res.json({ message: 'success', deletedSchedule })
  }
}