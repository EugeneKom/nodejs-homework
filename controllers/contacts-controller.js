const Joi = require("joi");

const contactsService = require("../models/contacts");
const { HttpError } = require("../helpers");

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const getContact = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);

    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);

    if (error) {
      throw HttpError(400);
    }

    const result = await contactsService.addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contactsService.removeContact(contactId);

    if (!result) {
      throw HttpError(404);
    }

    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields");
    }

    const { contactId } = req.params;

    const result = await contactsService.updateContactById(contactId, req.body);
    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContact,
  getContactById,
  addContact,
  deleteContact,
  updateContactById,
};
