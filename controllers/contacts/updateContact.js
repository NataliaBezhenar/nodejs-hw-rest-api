const { Contact } = require("../../models");
const throwNotFoundError = require("./throwNotFoundError");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: req.user._id,
    },
    req.body,
    {
      new: true,
    }
  );
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
