const { Contact } = require("../../models");
const throwNotFoundError = require("./throwNotFoundError");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
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
