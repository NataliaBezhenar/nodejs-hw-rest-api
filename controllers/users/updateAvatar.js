const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Jimp = require("jimp");
const { User } = require("../../models");

const { AVATAR_DIR } = require("../../filepath");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const [, extention] = originalname.split(".");
  const newFileName = `${uuidv4()}.${extention}`;
  const resultUpload = path.join(AVATAR_DIR, "avatars", newFileName);
  const avatarURL = path.join("public", "avatars", newFileName);
  const { _id } = req.user;

  try {
    await fs.rename(tempUpload, resultUpload);
    Jimp.read(resultUpload, (error, resizedAvatar) => {
      if (error) {
        throw error;
      }
      resizedAvatar.resize(250, 250).write(resultUpload);
    });
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
