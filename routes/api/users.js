const express = require("express");

const { users: ctrl } = require("../../controllers");
const { validation, controllsWrapper } = require("../../middlewares");
const { joiSignupSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validation(joiSignupSchema),
  controllsWrapper(ctrl.signup)
);

router.post("/login", validation(joiLoginSchema), controllsWrapper(ctrl.login));

module.exports = router;
