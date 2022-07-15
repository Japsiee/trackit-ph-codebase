const Client = require('../models/Client');

const QRCode = require('qrcode');
const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports.browseClient = (req, res) => {
  browseClient()
    .then(data => {
      res.json({ message: 'success', data })
    })
    .catch(err => {
      res.json({ message: 'failed to browse client', err })
    })
}

module.exports.readClient = (req, res) => {
  const clientEmail = req.params.email;
  
  readClient(clientEmail)
    .then(data => {
      res.json({ message: "success", data })
    })
    .catch(err => {
      console.log(err)
      res.json({ message: "failed to read client", err })
    })
}

module.exports.createClient = (req, res) => {
  const { email: clientEmail } = req.body;
  
  readClient(clientEmail)
    .then(data => {
      if (data) {
        res.json({ message: "failed to post new client. email exist" });
      } else {
        createClient(req.body)
          .then(data => {
            res.json({ message: "success", data })
          })
          .catch(err => {
            console.log(err)
            res.json({ message: "failed to post new client" })
          })
      }
    })
}

module.exports.sendMail = (req, res) => {
  const sendTo = req.params.email;
  const { subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: process.env.CUPANGWEST_EMAIL,
        pass: process.env.CUPANGWEST_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.CUPANGWEST_EMAIL,
    to: sendTo,
    subject: "Cupang west message",
    html: `
      <h1>${ subject }</h1>
      <br>
      <p>${ message }</p>
    `
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.json({ message: 'failed, email sending failed' })
    } else {
      res.json({ message: 'success, email sent' })
    }
  })
}
  
module.exports.updateClient = async (req, res) => {
  Client.findByIdAndUpdate(req.params._id, req.body)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
}

module.exports.deleteClient = async (req, res) => {
  Client.findByIdAndDelete(req.params._id)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
}

module.exports.approveClient = (req, res) => {
  const { receiverEmail, receiverName, receiverPasscode } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: process.env.CUPANGWEST_EMAIL,
        pass: process.env.CUPANGWEST_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.CUPANGWEST_EMAIL,
    to: receiverEmail,
    subject: "Cupang west notification",
    html: `
      <h1>Hello ${receiverName}, your account has been successfully verified please use this credentials to login.</h1>      
      <p style="font-size: 16px;">Email: ${ receiverEmail }</p>
      <p style="font-size: 16px;">Passcode: ${ receiverPasscode }</p>
      <br>
      <p>This mail is auto generated please do not reply.</p>
    `
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.json({ message: err })
    } else {
      res.json({ message: 'success, email sent' })
    }
  })
}

module.exports.sendEmailNotification = (req, res) => {
  const { receiverEmail, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: process.env.CUPANGWEST_EMAIL,
        pass: process.env.CUPANGWEST_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.CUPANGWEST_EMAIL,
    to: receiverEmail,
    subject: "Cupang west notification",
    html: `
      <h1>
        Good day!
      </h1>
      <br>
      <p>
        ${ message }
      </p>
      <br>
      <p>This mail is auto generated please do not reply.</p>
    `
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.json({ message: err })
    } else {
      res.json({ message: 'success, email sent' })
    }
  })
}

// extra functions

const createClient = async client1 => {  
  const client = await Client.create(client1)

  if (client) {
    postCreateClient(client)
      .then(data => {
        return data
      })
  }

  return client;
}

const postCreateClient = async client => {
  const identityQR = `${client.attr.name}-${client._id}`;

  QRCode.toDataURL(identityQR, function (err, url) {
    if (!err) {
      const data = Client.findByIdAndUpdate(client._id, { qrCode: url })
        .then(data => data)
      if (data) {
        return data;
      }
    }
  })
}

const readClient = async clientEmail => {  
  const result = await Client.findOne({ email: clientEmail });
  return result;
}

const browseClient = async () => {
  const result = await Client.find()
  return result;
}