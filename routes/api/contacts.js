const express = require("express");
const router = express.Router();

const { contacts: controlls } = require("../../controllers");
const { validation, controllsWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

router.get("/", controllsWrapper(controlls.listContacts));

router.get("/:contactId", controllsWrapper(controlls.getContactById));

router.post(
  "/",
  validation(contactSchema),
  controllsWrapper(controlls.addContact)
);

router.delete("/:contactId", controllsWrapper(controlls.removeContact));

router.put(
  "/:contactId",
  validation(contactSchema),
  controllsWrapper(controlls.updateContact)
);

module.exports = router;
