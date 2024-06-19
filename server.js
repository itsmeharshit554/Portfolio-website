require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const { name, email, sub, msg } = req.body;

  // Create the email transporter
  const transporter = nodemailer.createTransport({  
    service: 'gmail',
    auth: {
      user: 'sainiharshit554', // Replace with your Gmail email
      pass:  process.env.EMAIL_PASS, // Replace with your Gmail password
    },
  });

  // Create the email message
  const mailOptions = {
    from: email,  
    to: 'sainiharshit1212@gmail.com', // Replace with your Gmail email
    subject: sub,
    text: `From: ${name}\n${email}\n\n${msg}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Error sending email' });
    } else {
      console.log(`Email sent: ${info.response}`);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
  