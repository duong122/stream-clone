const express = require('express');
const router = express.Router();
const directorController = require('../controllers/directorController');

// Route to get all directors
router.get('/', directorController.getAllDirectors);

// Route to create a new director
router.post('/', directorController.createDirector);

// Route to get a single director by ID
router.get('/:id', directorController.getDirectorById);

// Route to update a director by ID
router.put('/:id', directorController.updateDirector);

// Route to delete a director by ID
router.delete('/:id', directorController.deleteDirector);

module.exports = router;