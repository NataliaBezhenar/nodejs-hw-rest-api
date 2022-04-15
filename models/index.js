const { Contact, joiSchema, favoriteJoiSchema } = require("./contact");
const { User, joiUserSchema, joiSignupSchema } = require("./user");

module.exports = {
  Contact,
  joiSchema,
  favoriteJoiSchema,
  User,
  joiUserSchema,
  joiSignupSchema,
};
