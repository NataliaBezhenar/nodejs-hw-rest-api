const express = require("express");

const { users: ctrl } = require("../../controllers");
const {
  validation,
  controllsWrapper,
  auth,
  fileUpload,
} = require("../../middlewares");
const { joiSignupSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validation(joiSignupSchema),
  controllsWrapper(ctrl.signup)
);

router.post("/login", validation(joiLoginSchema), controllsWrapper(ctrl.login));

router.get(
  "/current",
  controllsWrapper(auth),
  controllsWrapper(ctrl.getCurrent)
);

router.get("/logout", controllsWrapper(auth), controllsWrapper(ctrl.logout));

router.patch(
  "/avatars",
  controllsWrapper(auth),
  fileUpload.single("avatar"),
  controllsWrapper(ctrl.updateAvatar)
);

module.exports = router;
