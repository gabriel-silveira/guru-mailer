const express     = require('express');
const routes      = express.Router();
const nodemailer  = require('nodemailer');

routes.post('/', async (req, res) => {
  try {
    const { to, subject, html } = req.body;

    const options = {
      host: process.env.MAILER_SMTP,
      port: process.env.MAILER_PORT,
      secure: false,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
      },
      sendmail: true
    }
  
    const transporter = nodemailer.createTransport(options);
  
    const info = await transporter.sendMail({
      from: process.env.MAILER_USER, // sender address
      to: to ? to : 'gabrielsilveira.web@gmail.com', // list of receivers
      subject, // Subject line
      // text: 'Hello world?', // plain text body
      html // html body
    });
    
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
});

routes.all('/', (req, res, next) => {
  res.status(405).send({ error: 'Método não permitido' });
});

module.exports = routes;
