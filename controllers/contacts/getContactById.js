const mongoose = require("mongoose");
const { Contact } = require("../../models");
const throwNotFoundError = require("./throwNotFoundError");

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  if (mongoose.Types.ObjectId.isValid(contactId)) {
    const result = await Contact.findOne({
      _id: contactId,
      owner: req.user._id,
    });
    if (!result) {
      throwNotFoundError();
    }
    res.json({ status: "success", code: 200, data: { result } });
  }
  throwNotFoundError();
};

module.exports = getContactById;
