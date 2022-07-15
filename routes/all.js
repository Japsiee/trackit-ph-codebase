const express = require('express');
const allController = require('../controllers/all');

const Route = express.Router();

Route.get('/', allController.getAllRequests);

module.exports = Route;