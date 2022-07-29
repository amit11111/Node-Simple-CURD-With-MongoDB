/* eslint-disable no-unused-vars */
const { appRoot } = global;
const httpStatus = require('http-status');
const expressValidation = require('express-validation');
const APIError = require('../errors/api-error');

const { env, serviceName } = require(`${appRoot}/src/config/vars`);

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = async (err, req, res, next) => {
  const response = {
    status_code: err.status,
    status: httpStatus[err.status],
    success: false,
    service_name: serviceName,
    message: err.message || '',
    errors: err.errors,
    stack: err.stack,
  };

  if (env !== 'development') {
    delete response.stack;
  }

  res.status(err.status);
  res.json(response);
};
exports.handler = handler;

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
exports.converter = (err, req, res, next) => {
  let convertedError = err;

  if (err instanceof expressValidation.ValidationError) {
    convertedError = new APIError({
      message: 'Validation Error',
      errors: err.errors,
      status: err.status,
      stack: err.stack,
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }

  return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res, next) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};
