const express = require('express');
const UserController = require('../controllers/user');

const router = express.Router();

router.post('/', UserController.createUser);

router.get('/', UserController.getUsers);

router.get('/:userId', UserController.getUser);

router.put('/:userId', UserController.updateUser);

router.delete('/:userId', UserController.deleteUser);

module.exports = router;