const mongoose = require('mongoose');
const express = require('express');
const https = require('https');
const fs = require('fs');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
var {Users} = require('./Data');
var {Properties} = require('./Data');
var jwt = 1;

const API_PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  'mongodb://capedigital:zaioproperty24@ds335648.mlab.com:35648/heroku_c7zhk9p8';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database
router.get('/getUserData', (req, res) => {
  Users.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/getSingleUserData/:email/:password', (req, res) => {
  Users.findOne({'email': `${req.params.email}`, 'password': `${req.params.password}`}, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    else if (data==null) return res.json({success: true, data: null});
    jwt+=1;
    return res.json({ success: true, data: jwt});
  });
});

router.get('/getPropertyData', (req, res) => {
  Properties.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/getSinglePropertyData/:id', (req, res) => {
  Properties.findOne({'id': req.params.id}, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/getPropertyData/area/:payload', (req, res) => {
  if(req.params.payload==null) {
    Properties.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  }
  else {
    Properties.find({'area': req.params.payload}, (err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  }
});

router.get('/getPropertyData/address/:payload', (req, res) => {
  if(req.params.payload==null) {
    Properties.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  }
  else {
    Properties.find({'address': req.params.payload}, (err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  }
});


router.get('/getPropertyData/agency/:payload', (req, res) => {
  if(req.params.payload==null) {
    Properties.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  }
  else {
    Properties.find({'agency': req.params.payload}, (err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  }
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.message = message;
  data.id = id;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

//add registered users to the database
router.post('/putUserData', (req, res) => {
  let data = new Users();

  const { email, password, firstname, lastname } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }

  data.email = email;
  data.password = password;
  data.firstname = firstname;
  data.lastname = lastname;

  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
/*https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'zaioproperty24'
}, app)
.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));*/
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
