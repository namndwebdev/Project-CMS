let router = require('express').Router();
require('dotenv').config()
let nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:"voicoiloichoi@gmail.com",
        pass: "0979581350"
    }
})
let mailOptions = {
    from:"voicoiloichoi@gmail.com",
    to:"tuananh.pta19@gmail.com",
    subject:"Test",
    text: 'IT'
}
transporter.sendMail(mailOptions, function(err,data) {
    if(err){
        console.log("err",err);
        console.log(data)
    }else{
        console.log("Email send")
    }
})

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//       host: "localhost",
//       service:"gmail",
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: process.env.EMAIL, // generated ethereal user
//         pass: process.env.PASSWORD // generated ethereal password
//       }
//     });
  
//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: '"Fred Foo 👻" <voicoichoi@gmail.com>', // sender address
//       to: "tuananh.pta19@gmail.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>" // html body
//     });
//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//     // Preview only available when sending through an Ethereal account
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//   }
  
//   main().catch(console.error);