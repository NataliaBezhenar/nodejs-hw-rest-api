const multer = require("multer");

const { TMP_DIR } = require("../filepath");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TMP_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileUpload = multer({ storage });

module.exports = fileUpload;
