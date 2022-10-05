import nodemailer from 'nodemailer';
import QRCode from 'qrcode';
import dotenv from 'dotenv'
dotenv.config()

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass : process.env.PASS
    // type: 'OAuth2',
    // user: process.env.MAIL_USERNAME,
    // pass: process.env.MAIL_PASSWORD,
    // clientId: process.env.OAUTH_CLIENTID,
    // clientSecret: process.env.OAUTH_CLIENT_SECRET,
    // refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
});

const sendWelcomeEmail = (email , id , name) =>{
  let img64;
  QRCode.toDataURL(id)
  .then(url => {
    img64 = url;

    transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Booking Confirmation !",
      text: `We are glad to inform you that , we have recieved your confirmation for the event ${name}.

      Regards.
      Team Hackuna-MetaData`,
      attachments: [
        {   // encoded string as an attachment
          filename: 'confirmation.png',
          content: img64.split("base64,")[1],
          encoding: 'base64'
        }
      ]
    }, (err, info) => {
      if(err){
        return console.log(err)
      }
      console.log("Message sent: %s", info.messageId);
    })

  })
  .catch(err => {
    console.error(err)
  })

 }

export {
  sendWelcomeEmail,
}