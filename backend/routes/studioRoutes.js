const express = require('express');
const router = express.Router();
const studioController = require('../controllers/studioController');

// Route to get all studios
router.get('/', studioController.getAllStudios);

// Route to create a new studio
router.post('/', studioController.createStudio);

// Route to get a single studio by ID
router.get('/:id', studioController.getStudioById);

// Route to update a studio by ID
router.put('/:id', studioController.updateStudio);

// Route to delete a studio by ID
router.delete('/:id', studioController.deleteStudio);

module.exports = router;