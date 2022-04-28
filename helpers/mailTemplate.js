const { PORT } = process.env;
const host = "http://localhost";

const mailTemplate = (email, verificationToken) => {
  return {
    to: email,
    subject: "Letter from NodeJS crush course",
    html: `<a target="_blank" href="${host}:${PORT}/api/users/verify/${verificationToken}"> Follow this link to confirm email address </a>`,
  };
};

module.exports = mailTemplate;
