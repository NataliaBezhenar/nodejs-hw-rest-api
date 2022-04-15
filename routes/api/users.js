const express = require("express");

const { users: ctrl } = require("../../controllers");
const { validation, controllsWrapper } = require("../../middlewares");
const { joiSignupSchema } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validation(joiSignupSchema),
  controllsWrapper(ctrl.signup)
);

module.exports = router;
