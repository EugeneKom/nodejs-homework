const { model, Schema } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");
const emailRegexp = require("../constants/users");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
      match: emailRegexp,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

const contactsAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": `missing required name field` }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missing required email field`,
    "string.pattern.base": "Incorrect email format",
  }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": `missing required phone field` }),
  favorite: Joi.boolean(),
});

const contactsUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ favorite: `missing field favorite` }),
});

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = { Contact, contactsAddSchema, contactsUpdateFavoriteSchema };
