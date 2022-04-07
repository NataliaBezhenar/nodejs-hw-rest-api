const contactOperations = require("../../models/contacts");
const throwNotFoundError = require("./throwNotFoundError");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactOperations.getContactById(contactId);
  if (!result) {
    throwNotFoundError();
  }
  res.json({ status: "success", code: 200, data: { result } });
};

module.exports = getContactById;
