/*
|----------------------------
| Import Base Lib
|----------------------------
|
|
*/

const express = require('express');

const router = express.Router();

const validate = require(`${global.appRoot}/src/api/middlewares/validation`);

/*
|----------------------------
| Import controllers
|----------------------------
|
|
*/
const EmployeeController = require(`${global.appRoot}/src/api/controllers/v1/employee.controller`);
/*
|----------------------------
| Import validations
|----------------------------
|
|
*/
const {
    employeeListing,
    createEmployee,
    getEmployee,
    updateEmployee,
    changeEmployeeStatus,
    deleteEmployee,
} = require(`${global.appRoot}/src/api/validation/employee.validation`);

/*
|----------------------------
| Define Routes
|----------------------------
|
|
*/
// Get employee list
// METHOD : GET
// URL 	  : /v1/employee/list
router.route('/list').get(validate(employeeListing), EmployeeController.list);

// Create employee
// METHOD : POST
// URL 	  : /v1/employee
router.route('/').post(validate(createEmployee), EmployeeController.create);

// Get employee
// METHOD : Get
// URL 	  : /v1/employee/:employeeId
router.route('/:employeeId').get(validate(getEmployee), EmployeeController.get);

// Update employee
// METHOD : PUT
// URL 	  : /v1/employee/:employeeId
router.route('/:employeeId').put(validate(updateEmployee), EmployeeController.update);

// GET Employee
// METHOD : PUT
// URL 	  : /v1/employee/:employeeId/change-status
router.route('/:employeeId/change-status').put(validate(changeEmployeeStatus), EmployeeController.changeStatus);

// DELETE Employee
// METHOD : DELETE
// URL 	  : /v1/employee/:employeeId
router.route('/:employeeId').delete(validate(deleteEmployee), EmployeeController.delete);

/*
|----------------------------
| Export Module
|----------------------------
|
|
*/
module.exports = router;
