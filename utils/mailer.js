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
        to: toUser.email,
        subject: "O2O Project Activate Account",
        html: `
        <h1>Hello ${toUser.username}!</h1>
        <p>Welcome to O2O Project! Our community is filled with satisfied customers who have experienced significant success with our platform</p>
        <p>To activate your acount please follow this Link: <a target="_" href="http://localhost:5173/activation/?hash=${hash}"> Activate link </a></p>
        <p>Best regards,</p>
        <p>O2O Project</p>
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
