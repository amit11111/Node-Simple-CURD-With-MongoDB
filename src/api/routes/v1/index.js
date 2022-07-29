/*
|----------------------------
| Import Base Lib
|----------------------------
|
|
*/

const express = require('express');

const router = express.Router();

/*
|----------------------------
| Import Route Modules
|----------------------------
|
|
*/
const demoRoute = require('./demo.route');
const department = require('./department.route');
const employee = require('./employee.route');

/*
|----------------------------
| Import Route Here
|----------------------------
|
|
*/

// Bind Restaurant Module End Points
// URL : /v1/restaurant
router.use('/demo', demoRoute);

// Bind department Module End Points
// URL : /v1/department
router.use('/department', department);

// Bind employee Module End Points
// URL : /v1/employee
router.use('/employee', employee);

/**
 * GET v1/status
 */
router.get('/', (req, res) => res.send('OK'));

/*
|----------------------------
| Export Module
|----------------------------
|
|
*/
module.exports = router;
