const express = require('express');
const complaintController = require('../controllers/complaint');

const Route = express.Router();

// browse complaint
Route.get('/', complaintController.browseComplaint);

// read complaint

// update document
Route.put('/:id', complaintController.updateComplaint);

// create complaint

Route.post('/', complaintController.createComplaint);

module.exports = Route;