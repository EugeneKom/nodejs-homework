const { HttpError } = require("../helpers/index");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (!Object.keys(req.body).length) {
      throw HttpError(400, "missing fields");
    }
    if (error) {
      console.log(error.message);
      next(HttpError(400, `${error.message}`));
    }
    next(error);
  };
  return func;
};

module.exports = validateBody;
