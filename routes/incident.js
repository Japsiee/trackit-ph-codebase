const express = require('express');
const incidentController = require('../controllers/incident');

const Route = express.Router();

// browse incident
Route.get('/', incidentController.browseIncident);

// read incident

// update incident
Route.put('/:id', incidentController.updateIncident);

// create incident

Route.post('/', incidentController.createIncident);

module.exports = Route;