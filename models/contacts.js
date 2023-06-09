const { model, Schema } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../middlewares");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const contactsAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": `missing required name field` }),
  email: Joi.string()
    .required()
    .messages({ "any.required": `missing required email field` }),
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
