const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Route to get all comments
router.get('/', commentController.getAllComments);

// Route to create a new comment
router.post('/', commentController.createComment);

// Route to get a single comment by ID
router.get('/:id', commentController.getCommentById);

// Route to update a comment by ID
router.put('/:id', commentController.updateComment);

// Route to delete a comment by ID
router.delete('/:id', commentController.deleteComment);

module.exports = router;