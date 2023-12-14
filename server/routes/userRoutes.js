const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users/:userId', userController.getUser);
router.patch('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);

// Add more routes as needed

module.exports = router;
