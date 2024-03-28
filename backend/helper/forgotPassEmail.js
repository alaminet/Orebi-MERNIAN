require("dotenv").config();
const nodemailer = require("nodemailer");

async function forgotPassEmail(email, link, template) {
  const httpLink = process.env.HTTPS;

  const refLink = `${httpLink}updatepass/${link}`;
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
    subject: "Password Reset - Orebi E-commerce", // Subject line
    html: template(refLink), // html body
  });

  console.log("Message sent");
}

module.exports = forgotPassEmail;
