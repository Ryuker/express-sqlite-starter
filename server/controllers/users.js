const {
  getAllRows,
  getRowById,
  addRow,
  updateUserById,
  deleteUserById
} = require('../services/dbService');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');


const table = "users";

// @desc    Get all users
// @route   GET /
// @access  Public
exports.getUsers = asyncHandler( async (req, res, next) => {
  let data = await getAllRows(table);

  console.log(data);

  res.status(200).json({
    success: true,
    data: data
  });
});

// @desc    Get single user by id
// @route   GET /:id
// @access  Public
exports.getUserById = asyncHandler( async (req, res, next) => {

  let data = await getRowById(table,req.params.id);

  if (data.length === 0) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  console.log(data);
  
  res.status(200).json({
    success: true,
    data: data
  });
});

// @desc    Create new user
// @route   POST /
// @access  Private
exports.addUser = asyncHandler( async (req, res, next) => {

  const data = await addRow(table, req.body);
  
  // check if there was an error adding to the database
  if (data.code) {
    console.error(data.message.red);
    return next(new ErrorResponse('Error adding user to the database', 404));
  }
  
  const newUser = {data, ...req.body};

  console.log(newUser);
  
  res.status(200).json({
    success: true,
    data: newUser
  });
});

// @desc    Update user by id
// @route   PUT /:id
// @access  Private
exports.updateUserById = asyncHandler( async (req, res, next) => {
  
  const data = await updateRowById(table, req.params.id, req.body);
  
  // check if there was an error adding to the database
  if (data.code) {
    console.error(data.message.red);
    return next(new ErrorResponse('Error updating user in the database', 404));
  }

  const updatedUser = await getUserById(data.id);

  console.log(updatedUser);
  
  res.status(200).json({
    success: true,
    data: updatedUser
  });
});

// @desc    Delete user by id
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteUserById = asyncHandler( async (req, res, next) => {
  const user = await getRowById(table, req.params.id);

  const data = await deleteRowById(table, req.params.id);
  
  // check if there was an error adding to the database
  if (data.code) {
    console.error(data.message.red);
    return next(new ErrorResponse('Error deleting user from the database', 404));
  }

  console.log(user);
  
  res.status(200).json({
    success: true,
    message: `Deleted user ${user.username} with id ${data.id}`
  });
});

