const httpStatus = require('http-status');

// Add Custome HTTP Status Code
httpStatus['210'] = 'Data not found';
httpStatus.DATA_NOT_FOUND = '210';

const { appRoot } = global;
const { serviceName } = require(`${appRoot}/src/config/vars`);
const { isset } = require(`${appRoot}/src/api/helpers/app.helper`);

// test comment
class Response {
  constructor() {
    const newLocal = this;
    newLocal.sendData = {};
    newLocal.sendData.status_code = httpStatus.OK;
    newLocal.sendData.status = null;
    newLocal.sendData.success = true;
    newLocal.sendData.service_name = serviceName;
    newLocal.sendData.message = 'Request processing completed';
    this.sendData.data = null;
  }

  reset() {
    this.sendData = {};
    this.sendData.status_code = httpStatus.OK;
    this.sendData.status = null;
    this.sendData.success = true;
    this.sendData.service_name = serviceName;
    this.sendData.message = 'Request processing completed';
    this.sendData.data = null;
  }

  responseBox(data = '', message = null, success = true, http_status) {
    // Set Response data
    this.sendData.status_code = http_status || this.sendData.status_code;
    this.sendData.status = httpStatus[this.sendData.status_code.toString()];
    this.sendData.success = success;
    this.sendData.message = (message) || this.sendData.message;

    if (isset(data)) {
      this.sendData.data = data;
    } else {
      delete this.sendData.data;
    }
  }

  handler() {
    return (_, res, next) => {
      res.sendResponse = (data = '', message = 'Data Retrieve Successfully', success = true, http_status = httpStatus.OK) => {
        this.responseBox(data, message, success, http_status);

        // Set Status and send data
        res.status(this.sendData.status_code).send(this.sendData);
      };

      res.sendDetails = (data = '', message = 'Data Retrieve Successfully', success = true, http_status = httpStatus.OK) => {
        this.responseBox(data, message, success, http_status);

        // Set Status and send data
        res.status(this.sendData.status_code).send(this.sendData);
      };

      res.sendCreated = (data = '', message = 'Data Inserted Successfully', success = true, http_status = httpStatus.CREATED) => {
        this.responseBox(data, message, success, http_status);

        // Set Status and send data
        res.status(this.sendData.status_code).send(this.sendData);
      };

      res.sendDeleted = (data = '', message = 'Data Deleted Successfully', success = true, http_status = httpStatus.OK) => {
        this.responseBox(data, message, success, http_status);

        // Set Status and send data
        res.status(this.sendData.status_code).send(this.sendData);
      };

      res.sendUpdated = (data = '', message = 'Data Updated Successfully', success = true, http_status = httpStatus.OK) => {
        this.responseBox(data, message, success, http_status);

        // Set Status and send data
        res.status(this.sendData.status_code).send(this.sendData);
      };

      res.sendNotFound = (data = '', message = 'Data Not Found', success = true, http_status = httpStatus.DATA_NOT_FOUND) => {
        this.responseBox(data, message, success, http_status);

        // Set Status and send data
        res.status(this.sendData.status_code).send(this.sendData);
      };

      return next();
    };
  }
}

module.exports = Response;
