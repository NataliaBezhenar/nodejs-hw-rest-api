const { User } = require("../../models");
const { Unauthorized, BadRequest } = require("http-errors");
const { sendEmail, mailTemplate } = require("../../helpers");

const repeatVerifyEmail = async (req, res) => {
  const email = req.body;
  const user = await User.findOne(email);
  if (!user) {
    throw new Unauthorized("Wrong email");
  }
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }
  await sendEmail(mailTemplate(email, user.verificationToken));
  res.json({
    message: "Verification email sent",
  });
};

module.exports = repeatVerifyEmail;
