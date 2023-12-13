// controllers/commentController.js

const Recipe = require('../models/recipeModel');

// List all comments for a specific recipe
exports.listComments = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const recipe = await Recipe.findById(recipeId).populate('comments.user');
        res.status(200).json(recipe.comments);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Add a comment to a recipe
exports.addComment = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const newComment = { ...req.body, createdAt: new Date() };
        const recipe = await Recipe.findById(recipeId);
        recipe.comments.push(newComment);
        await recipe.save();
        res.status(201).send('Comment added successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Update a comment
exports.updateComment = async (req, res) => {
    try {
        const { recipeId, commentId } = req.params;
        const recipe = await Recipe.findById(recipeId);
        const commentIndex = recipe.comments.findIndex(c => c._id.toString() === commentId);
        if (commentIndex === -1) {
            return res.status(404).send('Comment not found');
        }
        recipe.comments[commentIndex] = { ...recipe.comments[commentIndex].toObject(), ...req.body };
        await recipe.save();
        res.status(200).send('Comment updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    try {
        const { recipeId, commentId } = req.params;
        const recipe = await Recipe.findById(recipeId);
        recipe.comments = recipe.comments.filter(c => c._id.toString() !== commentId);
        await recipe.save();
        res.status(200).send('Comment deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

