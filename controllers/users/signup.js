const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models");
const { v4 } = require("uuid");
const { sendEmail, mailTemplate } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const verificationToken = v4();
  const avatarURL = gravatar.url(email, { protocol: "http", s: "250" });
  const newUser = new User({
    email,
    subscription,
    avatarURL,
    verificationToken,
  });
  newUser.setPassword(password);
  newUser.save();
  await sendEmail(mailTemplate(email, verificationToken));
  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      email,
      subscription,
      avatarURL,
      verificationToken,
    },
  });
};

module.exports = signup;
