const nodemailer = require('nodemailer')
require("dotenv").config();

exports.sendConfirmationEmail = function({toUser,hash}){
    console.log(toUser)
  return new Promise((resolve,reject) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLE_USER,
            pass: process.env.GOOGLE_PASSWORD
        }
    })
    const message = {
        from: process.env.GOOGLE_USER,
        to: process.env.GOOGLE_USER,
        subject: "o2o = Activate Account",
        html: `
        <h3>Hello ${toUser.email} </h3>
        <p>To activate your acount please follow this Link: <a target="_" href="${process.env.DOMAIN}/activation/?hash=${hash}"> Activate link </a></p>
        `
    }
    transporter.sendMail(message, (err, info) => {
        if (err) {
          console.error('Error sending email:', err);
          reject(err);
        } else {
          console.log('Email sent:', info);
          resolve(info);
        }
      });
  })
}
