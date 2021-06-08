const nodemailer = require("nodemailer");

exports.send_email = async (to, subject, html) => {
  try {
    let transporter = nodemailer.createTransport({
       host: process.env.SMTP_HOST,
       port: process.env.SMTP_PORT,
       auth: {
         user: process.env.SMTP_USERNAME,
         pass: process.env.SMTP_PASSWORD,
       },
     });
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: to,
      subject: subject,
      html: html,
    });
  } catch (e) {
    console.log(e)
  }
}
