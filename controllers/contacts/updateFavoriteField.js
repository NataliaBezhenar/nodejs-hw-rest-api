const { Contact } = require("../../models");
const throwNotFoundError = require("./throwNotFoundError");

const updateFavoriteField = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: req.user._id,
    },
    { favorite },
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

module.exports = updateFavoriteField;
