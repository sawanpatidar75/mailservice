// Install the necessary dependencies by running `npm install nodemailer` in your project directory

const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send-email', function(req, res) {
  console.log("req body: ",req.body);
  const service = req.body.service;
  const doctor = req.body.doctor;
  const name = req.body.name;
  const email = req.body.email;
  const appointmentDate = req.body.appointmentDate;
  const appointmentTime = req.body.appointmentTime;

  const emailBody = `
    Service: ${service}
    Doctor: ${doctor}
    Name: ${name}
    Email: ${email}
    Appointment Date: ${appointmentDate}
    Appointment Time: ${appointmentTime}
  `;

  console.log("email body: ",emailBody);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
     user: 'sa1pati75@gmail.com',
     pass: 'tnosqvmfuwvelfqa',
    },
   });

  const mailOptions = {
    from: 'sa1pati75@gmail.com',
    to: email,
    subject: 'Your appoinment done.',
    text: emailBody
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.error('Error sending email:', error);
      // Handle the error response
      res.status(500).json({ error: 'An error occurred while sending the email' });
    } else {
      console.log('Email sent:', info.response);
      // Handle the success response
      res.status(200).json({ success: 'Email sent successfully' });
    }
  });
});

app.listen(3000, function() {
  console.log('Server is running on port 3000');
});
