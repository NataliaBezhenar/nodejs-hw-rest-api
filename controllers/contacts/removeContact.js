const { Contact } = require("../../models");
const throwNotFoundError = require("./throwNotFoundError");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: req.user._id,
  });
  if (!result) {
    throwNotFoundError();
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: { result },
  });
};

module.exports = removeContact;
