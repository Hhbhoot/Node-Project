const { token } = require('morgan');
const nodemailer = require('nodemailer');

exports.resetPasswordSendMail = async (email ,token)=>{

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: false,
    logger: true,
    debug: true,
    secureConnection: false,
    auth: {
      user: "theengineertrader4@gmail.com",
      pass: "ebnt zkqg qidm bqim",
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  async function main() {
    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Reset password Link",
      // text: "Hello world?",
      html:
        '<p> pls click on link  and<a href="http://localhost:8080/resetpassword?token=' +
        token +
        '"> reset your password</a> </p> ',
    });

    console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error)
}