const express = require('express');
const documentController = require('../controllers/document');

const Route = express.Router();

// browse document
Route.get('/', documentController.browseDocument);

// read document

// update document
Route.put('/:id', documentController.updateDocument);

// create document

Route.post('/', documentController.createDocument);

module.exports = Route;