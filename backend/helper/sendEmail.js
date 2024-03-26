const nodemailer = require("nodemailer");

async function sendEmail(email, verify, link, template) {
  const refLink = `http://localhost:5173/emailverify/${link}`;
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
    html: template(verify, refLink), // html body
  });

  console.log("Message sent");
}

module.exports = sendEmail;