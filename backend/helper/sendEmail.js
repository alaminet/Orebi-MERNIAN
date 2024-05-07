require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendEmail(email, verify, template) {
  // const httpLink = process.env.HTTPS;

  // const refLink = `${httpLink}linkverification/${link}`;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "addme4et@gmail.com",
      pass: "nbcpbgotfbzjjarw",
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Orebi"`, // sender address
    to: email, // list of receivers
    subject: "OTP Verification-Orebi E-commerce", // Subject line
    html: template(verify), // html body
  });

  console.log("Message sent");
}

module.exports = sendEmail;
