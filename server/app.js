const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const { DB } = require('./config/db');

mongoose.connect(DB, { useNewUrlParser: true })
  .then(
    () => { console.log('Database is connected') }
  )
  .catch(
    err => { console.log('Can not connect to the database' + err) }
  )

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('hello');
});

const PORT = process.env.port || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
});