const express = require('express');
const announcementController = require('../controllers/announcement');

const Route = express.Router();

// browse announcement
Route.get('/', announcementController.browseAnnouncement);

// read announcement

// create announcement
Route.post('/', announcementController.createAnnouncement);

// update announcement

// delete announcement
Route.delete('/:id', announcementController.deleteAnnouncement);

module.exports = Route;