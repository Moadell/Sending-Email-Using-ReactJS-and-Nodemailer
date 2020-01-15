const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/form',(req, res) => {
  nodemailer.createTestAccount((err, account) => {
	 const htmlEmail =`
    <p>${req.body.message}</p>'
    `
    let transporter = nodemailer.createTransport({
    host: "smtp.googlemail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: '  ', // generated ethereal user
      pass: '  ' // generated ethereal password
    }
  })
  let mailOptions = {
    from: 'Intern@Intern.com',
    to: req.body.To,
    replyTo: 'mohamedzoma2008@gmail.com',
    subject: req.body.Subject,
    text: req.body.message,
    html:htmlEmail
  }
  transporter.sendMail(mailOptions, (err, info) =>{
    if (err){
      return console.log(err)
    }
    console.log('Message Sent %s', info.message)
    console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))
  })
})})
const PORT = process.env.PORT || 3001

app.listen(PORT, () =>{
  console.log('Server listening on port ${PORT}')
})
