const response = require('../utils/response');

const errorMiddleware = (
  err,
  req,
  res,
  next
) => {

  const statusCode =
    err.statusCode || 500;

  return response(
    res,
    statusCode,
    false,
    err.message || 'Server Error',
    process.env.NODE_ENV === 'development'
      ? {
          stack: err.stack,
        }
      : null
  );
};

module.exports = errorMiddleware;