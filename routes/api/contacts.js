const express = require("express");

const contactsController = require("../../controllers/contacts-controller");
const schemas = require("../../models/contacts");
const { validateBody } = require("../../decorators/");
const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.contactsAddSchema),
  contactsController.addContact
);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.contactsAddSchema),
  contactsController.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.contactsUpdateFavoriteSchema),
  contactsController.updateStatusContact
);

router.delete("/:contactId", contactsController.deleteContact);

module.exports = router;
