const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  
  error.message = err.message;

  // Log to console for dev
  console.log(err.stack.red);
};

module.exports = errorHandler;
