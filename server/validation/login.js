const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  let { name, email, password, password_confirm } = data;

  name = !isEmpty(name) ? name : '';
  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';
  password_confirm = !isEmpty(password_confirm) ? password_confirm : '';

  if (!Validator.isLength(name, { min: 2, max: 30 }))
    errors.name = 'Name must be between 2 and 30 chars';

  if (Validator.isEmpty(name))
    errors.name = 'Name field is required';

  if (Validator.isEmail(email))
    errors.email = 'Email is invalid';

  if (Validator.isEmpty(email))
    errors.email = 'E-mail field is required';

  if (!Validator.isLength(password, { min: 6, max: 30 }))
    errors.password = 'Password must have between 6 and 30 chars';

  if (Validator.isEmpty(password))
    errors.password = 'Password field is required';

  if (Validator.isLength(password_confirm, { min: 6, max: 30 }))
    errors.password_confirm = 'Password must have between 6 and 30 chars';

  if (!Validator.equals(password, password_confirm))
    errors.password_confirm = 'Password and Confirm Password must match';

  if (Validator.isEmpty(password_confirm))
    errors.password_confirm = 'Password is required';

  return {
    errors,
    isValid: isEmpty(errors)
  }
};