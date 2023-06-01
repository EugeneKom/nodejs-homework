const express = require("express");

const contactsController = require("../../controllers/contacts-controller");

const router = express.Router();

router.get("/", contactsController.getContact);

router.get("/:contactId", contactsController.getContactById);

router.post("/", contactsController.addContact);

router.delete("/:contactId", contactsController.deleteContact);

router.put("/:contactId", contactsController.updateContactById);

module.exports = router;
