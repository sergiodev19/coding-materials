const nodemailer = require("nodemailer");

const generateSMTPOptions = options => ({
    host: options.smtpHost,
    port: options.smtpPort,
    secure: true,
    tls: {
      rejectUnauthorized: true
    },
    auth: {
      user: options.smtpUser,
      pass: options.smtpPass
    }
  });

const generateSMTPParams = params => ({
  from: params.senderEmail,
  to: params.receiverUser,
  subject: "Sample email",
  text: "Please do not reply to this message. This is an automatically generated notification."
});


// Example of 'data' parameter

// {
//     smtpOptions: {
//         smtpHost: "Host of SMTP server",
//         smtpPort: "Port of SMTP server",
//         smtpUser: "User of SMTP server",
//         smtpPass: "Password of SMTP server"
//     },
//     receiverUser: "Email of receiver user",
//     senderEmail: "Email of sender"
// }

module.exports = async data => {
    try {
        let transporter = nodemailer.createTransport(generateSMTPOptions(data.smtpOptions));
        let { receiverUser, senderEmail } = data;

        return await transporter.sendMail(generateSMTPParams({ receiverUser, senderEmail }));
    } catch (error) {
        throw new Error(error.message);
    }
};