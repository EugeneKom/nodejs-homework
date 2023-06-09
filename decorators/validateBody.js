const { HttpError } = require("../helpers/index");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    const splittedPath = req.path.split("/");

    if (!Object.keys(req.body).length) {
      if (splittedPath[splittedPath.length - 1] === "favorite") {
        throw HttpError(400, "missing field favorite");
      }
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
