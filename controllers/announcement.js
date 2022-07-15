const Announcement = require('../models/Announcement');

module.exports.createAnnouncement = async (req, res) => {  
  try {
    const createdAnnouncement = await Announcement.create(req.body);
    if (createdAnnouncement) {
      afterCreateAnnouncement(createdAnnouncement._id, createdAnnouncement.attachedImage);
      res.json({ message: "success", data: createdAnnouncement })
    }
  } catch(error) {
    res.json({ message: "failed", error })
  }
}

module.exports.browseAnnouncement = async (req, res) => {
  try {
    const listAnnouncement = await Announcement.find();
    
    if (listAnnouncement) {
      res.json({ message: "success", data: listAnnouncement})
    }
  } catch(error) {
    res.json({ message: "failed", error })
  }
}

module.exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcementID = req.params.id;
    const deletedAnnouncement = await Announcement.findByIdAndDelete(announcementID);

    if (deletedAnnouncement) {
      res.json({ message: "success", data: deletedAnnouncement })
    }
  } catch(error) {
    res.json({ message: "failed", error })
  }
}

// extra functions

const afterCreateAnnouncement = async (announcementID, announcementAttachedImage) => {
  await Announcement.findByIdAndUpdate(announcementID, {
    attachedImage: `ann/images/${announcementID}/${announcementAttachedImage}`
  })
}