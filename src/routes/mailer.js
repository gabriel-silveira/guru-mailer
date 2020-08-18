const express     = require('express');
const routes      = express.Router();
const nodemailer  = require('nodemailer');

routes.get('/', async (req, res) => {
  try {
    const options = {
      host: 'smtp.hostinger.com.br',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
      }
    }
  
    console.log(options)
  
    const transporter = nodemailer.createTransport(options)
  
    const info = await transporter.sendMail({
      from: `"Gabriel Silveira" <${process.env.MAILER_USER}>`, // sender address
      to: `gabrielsilveira.web@gmail.com, ${process.env.MAILER_USER}`, // list of receivers
      subject: 'Hello', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>' // html body
    })
  
    console.log(info);
    res.status(200).json(info)
  } catch (error) {
    res.status(500).json(error);
  }
});

routes.all('/', (req, res, next) => {
  res.status(405).send({ error: 'Método não permitido' });
});

module.exports = routes;
