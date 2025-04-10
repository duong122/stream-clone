const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actorController');

// Route to get all actors
router.get('/', actorController.getAllActors);

// Route to create a new actor
router.post('/', actorController.createActor);

// Route to get a single actor by ID
router.get('/:id', actorController.getActorById);

// Route to update an actor by ID
router.put('/:id', actorController.updateActor);

// Route to delete an actor by ID
router.delete('/:id', actorController.deleteActor);

module.exports = router;