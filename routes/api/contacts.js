const express = require("express");
const router = express.Router();

const { contacts: controlls } = require("../../controllers");
const { validation, controllsWrapper } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");

router.get("/", controllsWrapper(controlls.listContacts));

router.get("/:contactId", controllsWrapper(controlls.getContactById));

router.post("/", validation(joiSchema), controllsWrapper(controlls.addContact));

router.delete("/:contactId", controllsWrapper(controlls.removeContact));

router.put(
  "/:contactId",
  validation(joiSchema),
  controllsWrapper(controlls.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  controllsWrapper(controlls.updateFavoriteField)
);

module.exports = router;
