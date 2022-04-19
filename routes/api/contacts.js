const express = require("express");
const router = express.Router();

const { contacts: controlls } = require("../../controllers");
const { validation, controllsWrapper, auth } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");

router.get(
  "/",
  controllsWrapper(auth),
  controllsWrapper(controlls.listContacts)
);

router.get(
  "/:contactId",
  controllsWrapper(auth),
  controllsWrapper(controlls.getContactById)
);

router.post(
  "/",
  controllsWrapper(auth),
  validation(joiSchema),
  controllsWrapper(controlls.addContact)
);

router.delete(
  "/:contactId",
  controllsWrapper(auth),
  controllsWrapper(controlls.removeContact)
);

router.put(
  "/:contactId",
  validation(joiSchema),
  controllsWrapper(auth),
  controllsWrapper(controlls.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  controllsWrapper(auth),
  controllsWrapper(controlls.updateFavoriteField)
);

module.exports = router;
