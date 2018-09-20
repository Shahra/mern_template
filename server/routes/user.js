const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');

const saveUser = (req, res) => {
  const { name, email, password } = req.body;
  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm'
  });

  const newUser = new User({ name, email, avatar });

  bcrypt.genSalt(10, (err, salt) => {
    if (err)
      console.error('There was an error', err);
    else {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err)
          console.log('There was an error', err);
        else {
          newUser.password = hash;
          newUser
            .save()
            .then(user => { res.json(user) })
        }
      });
    }
  });
}

const loginUser = (user, res) => {
  const payload = createPayloadFromUser(user);

  jwt.sign(payload, 'secret', { expiresIn: 3600 },
    (err, token) => {
      if (err)
        console.error('There is some error in token', err);
      else {
        res.json({
          success: true,
          token: `Bearer ${token}`
        });
      }
    });
}

function createPayloadFromUser(user) {
  const { id, name, avatar } = user;
  const payload = { id, name, avatar };

  return payload;
}

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid)
    return res.status(400).json(errors);

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user)
        return res.status(400).json({ email: 'E-mail already exists' });
      else
        saveUser(req, res);
    })
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid)
    return res.status(400).json(errors);

  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch)
            loginUser(user, res);
          else {
            errors.password = 'Incorrect Password';
            return res.status(400).json(errors);
          }
        });
    });
});

router.get('/me', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.user);
    const { id, name, email } = req.user;
    return res.json({ id, name, email });
  }
);

module.exports = router;