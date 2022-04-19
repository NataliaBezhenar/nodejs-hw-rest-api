const express = require("express");

const { users: ctrl } = require("../../controllers");
const { validation, controllsWrapper, auth } = require("../../middlewares");
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

module.exports = router;
