const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// mongodb connection

const mongoConnect = require('./config/mongodb');

mongoConnect()
  .then(() => {
    console.log('connected to the db');    
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  })
  .catch(err => {
    console.log(err);
  })

// for production

// app.use(express.static(path.join(__dirname, "client", "build")))

// for development

// app.use(express.static(path.resolve('./client/public')))

// apis

const clientAPI = require('./routes/client');
const complaintAPI = require('./routes/complaint');
const documentAPI = require('./routes/document');
const incidentAPI = require('./routes/incident');
const announcementAPI = require('./routes/announcement');
const scheduleAPI = require('./routes/schedule');
const allAPI = require('./routes/all');

app.use('/all', allAPI);
app.use('/client', clientAPI);
app.use('/complaint', complaintAPI);
app.use('/document', documentAPI);
app.use('/incident', incidentAPI);
app.use('/announcement', announcementAPI);
app.use('/schedule', scheduleAPI);


// for production

// app.get("*", (req,res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  // for development
  app.use(express.static('client/public'));
  
  app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname, "./client/public", "index.html"));
  });
}