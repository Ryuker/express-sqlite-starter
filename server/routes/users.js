const express = require('express');

const {
  getUsers,
  getUserById,
  addUser,
  updateUserById,
  deleteUserById
} = require('../controllers/users.js');

const router = express.Router();

// All Users
router
  .route('/')
  .get(getUsers)
  .post(addUser)

// Single user
router
  .route('/:id')
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById)

module.exports = router;