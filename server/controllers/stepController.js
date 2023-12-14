const Recipe = require('../models/recipeModel');

exports.getStepsFromRecipe = async (req, res) => {
    try {
        const { recipeId } = req.params;

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }

        res.status(200).json({
            status: 'success',
            data: {
                steps: recipe.steps
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.addStepToRecipe = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const { step } = req.body;

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }

        recipe.steps.push(step);
        await recipe.save();

        res.status(200).json({
            status: 'success',
            data: {
                recipe
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateStepInRecipe = async (req, res) => {
    try {
        const { recipeId, stepIndex } = req.params;
        const { step } = req.body;

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }

        if (stepIndex >= recipe.steps.length) {
            return res.status(400).send('Invalid step index');
        }

        recipe.steps[stepIndex] = step;
        await recipe.save();

        res.status(200).json({
            status: 'success',
            data: {
                recipe
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteStepFromRecipe = async (req, res) => {
    try {
        const { recipeId, stepIndex } = req.params;

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }

        if (stepIndex >= recipe.steps.length) {
            return res.status(400).send('Invalid step index');
        }

        recipe.steps.splice(stepIndex, 1);
        await recipe.save();

        res.status(200).json({
            status: 'success',
            data: {
                recipe
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
