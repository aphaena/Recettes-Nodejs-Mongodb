const express = require('express');
const stepController = require('../controllers/stepController');
const router = express.Router();

router.get('/:recipeId/steps', stepController.getStepsFromRecipe);
router.post('/:recipeId/steps', stepController.addStepToRecipe);
router.patch('/:recipeId/steps/:stepIndex', stepController.updateStepInRecipe);
router.delete('/:recipeId/steps/:stepIndex', stepController.deleteStepFromRecipe);

module.exports = router;
