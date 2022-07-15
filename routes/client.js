const express = require('express');
const clientController = require('../controllers/client');

const Route = express.Router();

// browse client
Route.get('/', clientController.browseClient);

// read client
Route.get('/:email', clientController.readClient);

// create client
Route.post('/', clientController.createClient);

Route.post('/sendMail/:email', clientController.sendMail);

// update client
Route.put('/:_id', clientController.updateClient);

// delete client
Route.delete('/:_id', clientController.deleteClient);

// approve client
Route.put('/', clientController.approveClient)

Route.post('/emailNotification', clientController.sendEmailNotification)

module.exports = Route;