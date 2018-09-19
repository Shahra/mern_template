const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};
  let { email, password } = data;

  name = !isEmpty(name) ? name : '';
  password = !isEmpty(password) ? password : '';

  if (Validator.isEmail(email))
    errors.email = 'Email is invalid';

  if (Validator.isEmpty(email))
    errors.email = 'E-mail field is required';

  if (!Validator.isLength(password, { min: 6, max: 30 }))
    errors.password = 'Password must have between 6 and 30 chars';

  if (Validator.isEmpty(password))
    errors.password = 'Password field is required';

  return {
    errors,
    isValid: isEmpty(errors)
  }
};