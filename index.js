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
    host: "smtp.mailgun.org",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'postmaster@sandboxdb57d9f76b834aa7b8e500e4ad987a1f.mailgun.org', // generated ethereal user
      pass: '2942c890644a585f61a52e6ad75a6147-a9919d1f-e703316e' // generated ethereal password
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
