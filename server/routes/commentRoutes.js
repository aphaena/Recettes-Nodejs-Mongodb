// routes/commentRoutes.js

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/:recipeId/comments', commentController.listComments);
router.post('/:recipeId/comments', commentController.addComment);
router.put('/:recipeId/comments/:commentId', commentController.updateComment);
router.delete('/:recipeId/comments/:commentId', commentController.deleteComment);

module.exports = router;
