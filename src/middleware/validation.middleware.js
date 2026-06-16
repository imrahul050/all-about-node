const response = require('../utils/response');

const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return response(
        res,
        422,
        false,
        'Validation failed',
        result.error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message,
        }))
      );
    }

    req.body = result.data;

    next();
  };
};

module.exports = validate;