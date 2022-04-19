const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "Joi error or another validation error";
      next(error);
    }
    next();
  };
};

module.exports = validation;
