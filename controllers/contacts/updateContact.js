const contactOperations = require("../../models/contacts");
const throwNotFoundError = require("./throwNotFoundError");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactOperations.updateContact(contactId, req.body);
  if (!result) {
    throwNotFoundError();
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = updateContact;
