const { Contact } = require("../../models");
const throwNotFoundError = require("./throwNotFoundError");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
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
