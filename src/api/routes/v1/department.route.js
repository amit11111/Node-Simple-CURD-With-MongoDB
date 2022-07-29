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
const DepartmentController = require(`${global.appRoot}/src/api/controllers/v1/department.controller`);
/*
|----------------------------
| Import validations
|----------------------------
|
|
*/
const {
    departmentListing,
    createDepartment,
    updateDepartment,
    changeDepartmentStatus,
    deleteDepartment,
} = require(`${global.appRoot}/src/api/validation/department.validation`);

/*
|----------------------------
| Define Routes
|----------------------------
|
|
*/
// Get department list
// METHOD : GET
// URL 	  : /v1/department/list
router.route('/list').get(validate(departmentListing), DepartmentController.list);

// Create department
// METHOD : POST
// URL 	  : /v1/department
router.route('/').post(validate(createDepartment), DepartmentController.create);

// Update department
// METHOD : PUT
// URL 	  : /v1/department/:departmentId
router.route('/:departmentId').put(validate(updateDepartment), DepartmentController.update);

// GET Department
// METHOD : PUT
// URL 	  : /v1/department/:departmentId/change-status
router.route('/:departmentId/change-status').put(validate(changeDepartmentStatus), DepartmentController.changeStatus);

// DELETE Department
// METHOD : DELETE
// URL 	  : /v1/department/:departmentId
router.route('/:departmentId').delete(validate(deleteDepartment), DepartmentController.delete);

/*
|----------------------------
| Export Module
|----------------------------
|
|
*/
module.exports = router;
