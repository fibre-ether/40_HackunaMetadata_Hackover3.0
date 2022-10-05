import nodemailer from 'nodemailer';

import dotenv from 'dotenv'
dotenv.config()

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ojas@crucibo.com',
    pass : 'rltzghbuxxkowgxz'
    // type: 'OAuth2',
    // user: process.env.MAIL_USERNAME,
    // pass: process.env.MAIL_PASSWORD,
    // clientId: process.env.OAUTH_CLIENTID,
    // clientSecret: process.env.OAUTH_CLIENT_SECRET,
    // refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
});

const sendWelcomeEmail = (email, name) => transporter.sendMail({
  from: 'developer.ojask@gmail.com',
  to: 'ojask2002@gmail.com',
  subject: "Welcome!",
  text: `Thanks for joining us, ${name}.

  Regards.`
}, (err, info) => {
  if(err){
    return console.log(err)
  }
  console.log("Message sent: %s", info.messageId);
})

export {
  sendWelcomeEmail,
}