/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/*
|----------------------------
| Import Base Lib
|----------------------------
|
|
*/
const httpStatus = require('http-status');

/**
 * Get demo list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    res.sendResponse(null);
  } catch (e) {
    next(e);
  }
};

/**
 * Get get channel demo details
 * @public
 */
// eslint-disable-next-line consistent-return
exports.check = async (req, res, next) => {
  try {
    res.sendResponse({ test: 'ok' });
  } catch (e) {
    next(e);
  }
};

/**
 * Create demo
 * @public
 */
exports.inputValidationDemo = (req, res) => {
  res.status(httpStatus.CREATED);
  res.json({});
};

/**
 * Update demo
 * @public
 */
exports.update = (req, res) => {
  res.status(httpStatus.CREATED);
  res.json({});
};

/**
 * Delete demo
 * @public
 */
exports.delete = (req, res) => {
  res.status(httpStatus.NO_CONTENT);
  res.json({});
};
