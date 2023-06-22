const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");
const emailRegexp = require("../constants/users");

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const userRegisterSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .pattern(emailRegexp)
    .messages({ "string.pattern.base": "Incorrect email format" })
    .required(),
});

const userLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .pattern(emailRegexp)
    .messages({ "string.pattern.base": "Incorrect email format" })
    .required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const User = model("user", userSchema);

module.exports = {
  User,
  userRegisterSchema,
  userLoginSchema,
  subscriptionSchema,
};
