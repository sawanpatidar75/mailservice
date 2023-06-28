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

  // const emailBody = `
  //   Service: ${service}
  //   Doctor: ${doctor}
  //   Name: ${name}
  //   Email: ${email}
  //   Appointment Date: ${appointmentDate}
  //   Appointment Time: ${appointmentTime}
  // `;
  const emailBody = `Dear ${name},\n\nWe are pleased to inform you that your appointment has been successfully booked with ${doctor} at our clinic. Here are the details of your appointment:\n\nService: ${service}\nDoctor: ${doctor}\nDate: ${appointmentDate}\nTime: ${appointmentTime}\n\nPlease arrive at least 15 minutes before your scheduled appointment time.\n\nThank you for choosing our clinic.\n\nBest regards,\nHealth Care Service\n`;
  
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
    subject: 'Thank you for your appontment',
    text: emailBody
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.error('Error sending email:', error);
      // Handle the error response
      res.status(500).json({ success: true, message: 'Appointment not booked.', data: error.message });
    } else {
      console.log('Email sent:', info.response);
      // Handle the success response
      res.status(200).json({ success: true, message: 'Appointment booked successfully', data: info.response });
    }
  });
});

app.listen(3000, function() {
  console.log('Server is running on port 3000');
});
