import nodemailer from "nodemailer"

const mailConfiguration = ()=>{
  const transpoter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  })

  transpoter.verify().then(()=>{
    console.log("📧 mail server is ready to take our messages")
  }).catch((err)=>{
    console.log(err)
  })

  return transpoter

}


export default mailConfiguration