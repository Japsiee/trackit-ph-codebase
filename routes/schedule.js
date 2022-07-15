const express = require('express');
const sheduleController = require('../controllers/schedule');

const Route = express.Router();

// browse schedule
Route.get('/', sheduleController.browseSchedule);

// read schedule

// create schedule
Route.post('/', sheduleController.createSchedule);

// update schedule
Route.put('/:_id', sheduleController.updateSchedule);

// delete schedule
Route.delete('/:_id', sheduleController.deleteSchedule);

module.exports = Route;