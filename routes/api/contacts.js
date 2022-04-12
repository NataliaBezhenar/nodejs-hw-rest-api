const express = require("express");
const router = express.Router();

const { contacts: controlls } = require("../../controllers");
const { validation, controllsWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/contact");

router.get("/", controllsWrapper(controlls.listContacts));

router.get("/:contactId", controllsWrapper(controlls.getContactById));

router.post("/", validation(joiSchema), controllsWrapper(controlls.addContact));

router.delete("/:contactId", controllsWrapper(controlls.removeContact));

router.put(
  "/:contactId",
  validation(joiSchema),
  controllsWrapper(controlls.updateContact)
);

module.exports = router;
