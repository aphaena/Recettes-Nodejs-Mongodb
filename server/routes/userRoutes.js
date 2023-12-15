const express = require('express');
const userController = require('../controllers/userController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const { allowedRoles } = require('../config/roleConfig');
const { allowedRolesUser } = require('../config/roleConfig');

const router = express.Router();

router.get('/', protect, restrictTo(...allowedRolesUser), userController.getAllUsers);
router.post('/',protect, restrictTo(...allowedRoles), userController.createUser);
router.get('/:userId',protect, restrictTo(...allowedRoles), userController.getUser);
router.patch('/:userId',protect, restrictTo(...allowedRolesUser), userController.updateUser);
router.delete('/:userId',protect, restrictTo(...allowedRolesUser), userController.deleteUser);

// Add more routes as needed

module.exports = router;
