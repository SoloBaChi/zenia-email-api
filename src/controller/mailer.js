const nodemailer = require("nodemailer");
require("dotenv").config();

const controller = {};

// configure the transporter
let transportConfig = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
};

let transporter = nodemailer.createTransport(transportConfig);

const registerMail = async (req, res) => {
  const { userEmail, text, subject, title } = req.body;

  if (!userEmail || !text || !subject || !title) {
    return res.status(404).json({
      error: "error",
      statusCode: 404,
      msg: `Please Provide necessary email fields (userEmail, text, subject and title) to proceed`,
    });
  }

  // create the email message or mailOptions
  const message = {
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: subject || "Signup sucessful",
    attachments: [
      {
        filename: "logo.jpg",
        path: `${__dirname}/logo.jpg`,
        cid: "save-logo.jpg",
      },
    ],
    html: `
    <body style="padding:0.8rem">
    <div style="display:block">
     <img src="cid:save-logo.jpg" alt="Zenia logo"/>
    </div>
    <h1 style="font-family:sans-serif;font-weight:600;font-size:1.8rem">${title}</h1>
    <p style="font-size:1.2rem;line-height:1.5">
     ${text}
    </p>
    <small style="font-size:1rem;text-align:"center">if you did not initiate this action, Please ignore this email</small>
    </body>`,
  };

  transporter.sendMail(message, (err, sucess) => {
    if (err)
      res.status(500).json({ error: "Error sending Email", errorMsg: err });

    return res.status(200).json({ msg: "You should receive an email from us" });
  });
};

module.exports = registerMail;
